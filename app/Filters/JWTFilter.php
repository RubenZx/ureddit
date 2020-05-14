<?php

namespace App\Filters;

use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\HTTP\IncomingRequest;
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
      $authConfig = new Auth();
      $userModel = new UserModel();
      $bearer = explode(" ", $request->getHeader('Authorization')->getValue());

      try {
        if (sizeof($bearer) !== 2) {
          throw new \Exception();
        }

        $payload = JWT::decode($bearer[1], $authConfig->jwtKey, [$authConfig->jwtAlgorithm]);
        $user = $userModel->find($payload->id);

        if (is_null($user)) {
          throw new \Exception();
        }
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