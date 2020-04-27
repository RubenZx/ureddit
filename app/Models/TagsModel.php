<?php

namespace App\Models;

use App\Entities\Tags;
use CodeIgniter\Model;

class TagsModel extends Model {
  protected $DBGroup = 'default';

  protected $table = 'tags';
  
  protected $returnType = Tags::class;

  protected $allowedFields = ['name'];

  protected $validationRules = ['name' => 'required|is_unique[tags.name]'];
}