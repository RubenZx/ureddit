<?php

namespace App\Models;

use App\Entities\Post;
use CodeIgniter\Model;
use Tatter\Relations\Traits\ModelTrait;

class PostModel extends Model {
  use ModelTrait;

  protected $DBGroup = 'default';

  protected $table = 'posts';

  protected $returnType = Post::class;

  protected $useTimestamps = true;

  protected $allowedFields = [
    'user_id',
    'title',
    'description',
    'image',
    'likes',
    'tag_id'
  ];

  protected $validationRules = [
    'user_id' => 'required',
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
