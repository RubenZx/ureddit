<?php

namespace App\Models;

use App\Entities\Post;
use CodeIgniter\Model;

class PostModel extends Model {
  protected $DBGroup = 'default';

  protected $table = 'posts';

  protected $returnType = Post::class;

  protected $useTimestamps = true;

  protected $allowedFields = [
    'author',
    'title',
    'description',
    'image',
    'likes',
  ];

  protected $validationRules = [
    'author' => 'required',
    'title' => 'required',
    'image' => 'required',
  ];

  public function setUpdateRules($data) {
    $rules = [];
    foreach ($this->validationRules as $field => $rule) {
      if (isset($data[$field])) {
        $rules[$field] = $rule;
      }
    }
    $this->validationRules = $rules;

    return $this;
  }
}
