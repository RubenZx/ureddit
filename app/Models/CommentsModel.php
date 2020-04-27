<?php

namespace App\Models;

use App\Entities\Comments;
use CodeIgniter\Model;

class CommentsModel extends Model {
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