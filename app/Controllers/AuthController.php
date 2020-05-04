<?php

namespace App\Controllers;

use App\Entities\User;
use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;
use Firebase\JWT\JWT;
use Config\Auth;
use stdClass;

/**
 * @property string $email
 * @property string $password
 */
class Credentials {
}

class AuthController extends Controller {
  use ResponseTrait;

  /**
   *
   * @var Auth
   */
  protected $authConfig;

  public function __construct() {
    $this->userModel = new UserModel();
    $this->authConfig = new Auth();
  }

  public function login() {
    /**
     * @var Credentials $credentials
     */
    $credentials = $this->request->getJSON();
    $user = $this->userModel->findByEmail($credentials->email);

    if (!$user->verified) {
      return $this->failForbidden(lang('Auth.verifiedAccountError'));
    }

    $is_valid = password_verify($credentials->password, $user->password);
    if ($is_valid) {
      $tokens = $this->generateTokens($user->id);
      
      $this->response->setCookie('Refresh-Token', $tokens->refresh, MONTH);

      return $this->respond([
        'accessToken' => $tokens->access,
      ]);
    }

    return $this->failValidationError();
  }

  public function refreshToken() {
    $token = $this->request->getCookie('Refresh-Token');
    if (!$token) {
      return $this->failNotFound(lang('Auth.refreshTokenNotFound'));
    }

    try {
      $payload = JWT::decode($token, $this->authConfig->jwtRefreshKey, [$this->authConfig->jwtAlgorithm]);
      $refreshTokens = cache($payload->id);
      if ($refreshTokens) {
        if (array_search($token, $refreshTokens) !== false) {
          throw new \Exception();
        }
        cache()->save($payload->id, [...$refreshTokens, $token], MONTH);
      } else {
        cache()->save($payload->id, [$token], MONTH);
      }
    } catch (\Exception $e) {
      return $this->failForbidden(lang('Auth.invalidToken'));
    }

    $refresh = cache($payload->id);
    $tokens = $this->generateTokens($payload->id);
    $this->response->setCookie('Refresh-Token', $tokens->refresh, MONTH);

    return $this->respond([
      'accessToken' => $tokens->access,
    ]);
  }

  public function forgotPassword() {
    $email = $this->request->getJSON()->email;
    $user = $this->userModel->findByEmail($email);
    if ($user && $user->verified) {
      helper("email");
      recover_password($email);
    }

    return $this->respondNoContent();
  }

  public function resetPassword($token) {
    $data = $this->request->getJSON();

    $email = cache($token);
    if (!$email) {
      return $this->failNotFound(lang("Auth.activationErrorInvalidToken"));
    }

    $user = $this->userModel->findByEmail($email);
    $user->password = $data->password;
    $this->userModel->save($user);

    return $this->respond(lang("Auth.resetPassword"));
  }

  public function activateAccount($token) {
    $email = cache($token);
    if (!$email) {
      return $this->failNotFound(lang("Auth.activationErrorInvalidToken"));
    }

    $user = $this->userModel->findByEmail($email);
    if (!$user->verified) {
      $user->verified = true;
      $this->userModel->save($user);
      cache()->delete($token);
    }

    return $this->respond(lang("Auth.activationSuccess"));
  }

  public function resendActivateAccount() {
    $email = $this->request->getJSON()->email;
    $user = $this->userModel->findByEmail($email);
    if ($user && !$user->verified) {
      helper("email");
      verify_by_email($email, "Please verified your email");
    }

    return $this->respondNoContent();
  }

  private function generateTokens(string $id) {
    $tokens = new stdClass();

    $tokens->access = JWT::encode(
      [
        'id' => $id,
        'iat' => time(),
        'exp' => time() + 15 * MINUTE,
        'iss' => base_url()
      ], 
      $this->authConfig->jwtKey, 
      $this->authConfig->jwtAlgorithm);

    $tokens->refresh = JWT::encode(
        [
          'id' => $id,
          'iat' => time(),
          'exp' => time() + MONTH,
          'iss' => base_url()
        ], 
        $this->authConfig->jwtRefreshKey, 
        $this->authConfig->jwtAlgorithm);
  
    return $tokens;
  }
}
