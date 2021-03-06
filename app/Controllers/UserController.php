<?php

namespace App\Controllers;

use App\Entities\User;
use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;

/**
 * @property UserModel $model
 */
class UserController extends ResourceController {
  protected $modelName = UserModel::class;

  protected $format = 'json';

  public function index() {
    $users = $this->model->findAll();

    return $this->respond($users);
  }

  public function show($id = null) {
    $user = $this->model->findByIdOrUsername($id);

    return (is_null($user) ? $this->failNotFound() : $this->respond($user));
  }

  public function create() {
    $user = new User($this->request->getJSON(true));
    $id = $this->model->insert($user);

    if ($this->model->errors()) {
      return $this->fail(
        ['errors' => $this->model->errors()],
        $this->codes['invalid_data'],
        null,
        'Bad Request'
      );
    } 

    if ($id === false) {
      $this->failServerError();
    } 
    
    helper("email");
    verify_by_email($user->email);

    return $this->respondCreated(['user' => $id]);
  }

  public function update($id = null) {
    $data = $this->request->getJSON(true);
    $updated = $this->model->setUpdateRules($data)->update($id, $data);

    if ($this->model->errors()) {
      return $this->fail(
        ['errors' => $this->model->errors()],
        $this->codes['invalid_data'],
        null,
        'Bad Request'
      );
    }

    return ($id === false ? $this->failServerError() : $this->respond($this->model->find($id)));
  }

  public function delete($id = null) {
    if (is_null($this->model->find($id))) {
      return $this->failNotFound();
    }
    $this->model->delete($id);
  
    return $this->respondDeleted(['deleted' => $id]);
  }
}
