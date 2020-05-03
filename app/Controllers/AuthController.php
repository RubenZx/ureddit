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
    /** @var User $user */
    $user = $this->userModel->findByEmail($credentials->email);
    $is_valid = password_verify($credentials->password, $user->password);
    
    if ($is_valid) {
      $accessToken = JWT::encode(['id' => $user->id], $this->authConfig->jwtKey, $this->authConfig->jwtAlgorithm);

      return $this->respond([
        'accessToken' => $accessToken,
      ]);
    }

    return $this->failValidationError();
  }

  public function revokeToken() {
  }

  public function register() {
  }

  public function forgotPassword() {
  }

  public function activateAccount() {
  }

  public function resendActivateAccount() {
  }
}
