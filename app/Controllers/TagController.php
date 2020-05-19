<?php

namespace App\Controllers;

use App\Entities\Tag;
use App\Models\TagsModel;
use CodeIgniter\RESTful\ResourceController;

/**
 * @property TagsModel $model
 */
class TagController extends ResourceController {
  protected $modelName = TagsModel::class;

  protected $format = 'json';

  public function index() {
    $tags = $this->model->reindex(false)->with(false)->findAll();

    return $this->respond($tags);
  }

  public function show($id = null) {
    $tag = $this->model->find($id);

    return (is_null($tag) ? $this->failNotFound() : $this->respond($tag));
  }
}
