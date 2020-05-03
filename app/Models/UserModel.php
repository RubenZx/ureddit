<?php

namespace App\Models;

use App\Entities\User;
use CodeIgniter\Model;

class UserModel extends Model {
  protected $DBGroup = 'default';

  protected $table = 'users';

  protected $returnType = User::class;

  protected $useTimestamps = true;

  protected $allowedFields = [
    'name',
    'email',
    'username',
    'password',
    'avatar',
  ];

  protected $validationRules = [
    'email' => 'required|valid_email|is_unique[users.email]',
    'username' => 'required|is_unique[users.username]',
    'password' => 'required',
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
  
  public function findByEmail(string $email) {
    return $this->builder($this->table)->where('email',$email)->get(1)->getFirstRow($this->returnType);
  }
}
