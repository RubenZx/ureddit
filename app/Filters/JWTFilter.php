<?php

namespace App\Filters;

use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\HTTP\IncomingRequest;
use CodeIgniter\Security\Exceptions\SecurityException;
use Config\Auth;
use Config\Services;
use Firebase\JWT\JWT;

class JWTFilter implements FilterInterface {
  use ResponseTrait;

  protected $response;

  protected $request;

  /**
   *
   * @param IncomingRequest $request
   * @return mixed
   */
  public function before(RequestInterface $request) {
    $this->response = Services::response();
    $this->request = $request;
    if ($request->hasHeader('Authorization')) {
      /** @var Auth $authConfig */
      $authConfig = new Auth();
      $userModel = new UserModel();
      $authorization = $request->getHeader('Authorization');

      try {
        $payload = JWT::decode($authorization->getValueLine(), $authConfig->jwtKey, [$authConfig->jwtAlgorithm]);
        $user = $userModel->find($payload->id);
        $request->user = $user;

        return $request;
      } catch (\Exception $th) {
      }
    }
    $this->failUnauthorized();
    $this->response->send();

    exit();
  }

  public function after(RequestInterface $request, ResponseInterface $response) {
  }
}