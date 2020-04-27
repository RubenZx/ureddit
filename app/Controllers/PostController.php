<?php

namespace App\Controllers;

use App\Entities\Post;
use App\Models\PostModel;
use CodeIgniter\RESTful\ResourceController;

/**
 * @property PostModel $model
 */
class PostController extends ResourceController {
  protected $modelName = PostModel::class;

  protected $format = 'json';

  public function index() {
    $posts = $this->model->findAll();

    return $this->respond($posts);
  }

  public function show($id = null) {
    $post = $this->model->find($id);

    return (is_null($post) ? $this->failNotFound() : $this->respond($post));
  }

  public function create() {
    $data = $this->request->getJSON(true);
    $id = $this->model->insert(new Post($data));

    if ($this->model->errors()) {
      return $this->fail(
        ['errors' => $this->model->errors()],
        $this->codes['invalid_data'],
        null,
        'Bad Request'
      );
    }

    if ($id === false) {
      return $this->failServerError();
    }

    return $this->respondCreated(['post' => $id]);
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
