<?php

namespace App\Entities;

use CodeIgniter\Entity;
use JsonSerializable;

/**
 * @property int $id
 * @property ?string $name
 * @property string $email
 * @property string $username
 * @property string $password
 * @property ?string $avatar
 * @property Time $created_at
 * @property Time $updated_at
 */

class User extends Entity {
  protected int $id;

  public string $name;

  public string $email;

  public string $username;  
  
  public function setPassword(string $password) {
    $this->attributes['password'] = password_hash($password, PASSWORD_BCRYPT, ['cost' => 11]);

    return $this;
  }
}