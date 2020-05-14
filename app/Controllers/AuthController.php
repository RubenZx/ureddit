<?php

namespace App\Controllers;

use App\Entities\User;
use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;
use Firebase\JWT\JWT;
use Config\Auth;
use Exception;
use stdClass;

/**
 * @property string $email
 * @property string $password
 */
class Credentials {
}

class AuthController extends Controller {
  use ResponseTrait;

  protected UserModel $userModel;

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
    
    if ($user == null) {
      return $this->failForbidden(lang('Auth.userNotFoundError'));
    }

    if (!$user->verified) {
      return $this->failForbidden(lang('Auth.verifiedAccountError'));
    }

    $is_valid = password_verify($credentials->password, $user->password);
    if ($is_valid) {
      return $this->respond($this->generateTokens($user));
    }

    return $this->failForbidden(lang('Auth.userNotFoundError'));
  }

  public function revokeToken() {
    /** @var User */
    $user = $this->request->user;
    $user->token_version += 1;
    $this->userModel->save($user);

    return $this->respondNoContent();
  }

  public function refreshToken() {
    $data = $this->request->getJSON();

    if ($data && !$data->refreshToken) {
      return $this->failNotFound(lang("Auth.refreshTokenNotFound"));
    }

    try {
      $payload = JWT::decode($data->refreshToken, $this->authConfig->jwtRefreshKey, [$this->authConfig->jwtAlgorithm]);
      $user = $this->userModel->find($payload->id);
      if (is_null($user) || $payload->version !== $user->token_version) {
        throw new Exception();
      }
    } catch (\Exception $e) {
      return $this->failUnauthorized(lang('Auth.invalidToken'));
    }

    return $this->respond($this->generateTokens($user), false);
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
    $user->token_version += 1;
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

  private function generateTokens(User $user) {
    $tokens = new stdClass();
    $iat = time();
    $iss = base_url();

    $user->token_version += 1;
    $this->userModel->save($user);
    
    $tokens->accessToken = JWT::encode([
      'id' => $user->id,
      'iat' => $iat,
      'exp' => $iat + MINUTE * 15,
      'iss' => $iss,
    ], $this->authConfig->jwtKey, $this->authConfig->jwtAlgorithm);

    $tokens->refreshToken = JWT::encode([
      'id' => $user->id,
      'iat' => $iat,
      'exp' => $iat + MONTH,
      'iss' => $iss,
      'version' => $user->token_version,
    ], $this->authConfig->jwtRefreshKey, $this->authConfig->jwtAlgorithm);

    return $tokens;
  }
}
