<?php

namespace App\Models;

use App\Entities\Tags;
use CodeIgniter\Model;
use Tatter\Relations\Traits\ModelTrait;

class TagsModel extends Model {
  use ModelTrait;

  protected $DBGroup = 'default';

  protected $table = 'tags';
  
  protected $returnType = Tags::class;

  protected $allowedFields = ['name'];

  protected $validationRules = ['name' => 'required|is_unique[tags.name]'];
}