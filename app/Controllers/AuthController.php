<?php

namespace App\Controllers;

use App\Entities\User;
use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;
use Firebase\JWT\JWT;
use Config\Auth;

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
      $accessToken = JWT::encode(['id' => $user->id], $this->authConfig->jwtKey, $this->authConfig->jwtAlgorithm);
      cache()->save($user->id,$accessToken, DAY_7);

      return $this->respond([
        'accessToken' => $accessToken,
      ]);
    }

    // /**
    //  * @var Credentials $credentials
    //  */
    // $credentials = $this->request->getJSON();
    // /** @var User $user */
    // $user = $this->userModel->findByEmail($credentials->email);
    // $is_valid = password_verify($credentials->password, $user->password);
    
    // if ($is_valid) {
    //   $accessToken = JWT::encode(['id' => $user->id], $this->authConfig->jwtKey, $this->authConfig->jwtAlgorithm);

    //   return $this->respond([
    //     'accessToken' => $accessToken,
    //   ]);
    // }

    // return $this->failValidationError();
  }

  public function revokeToken() {
  }

  public function forgotPassword() {
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
  }
}
