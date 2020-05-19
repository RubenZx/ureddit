<?php

namespace App\Models;

use App\Entities\Comments;
use CodeIgniter\Model;
use Tatter\Relations\Traits\ModelTrait;

class CommentsModel extends Model {
  use ModelTrait;

  protected $DBGroup = 'default';

  protected $table = 'comments';

  protected $returnType = Comments::class;

  protected $useTimestamps = true;

  protected $allowedFields = [
    'content',
    'likes'
  ];

  protected $validationRules = [
    'content' => 'required'
  ];
}