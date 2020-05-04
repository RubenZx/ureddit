<?php

namespace App\Entities;

/**
 * @property int $id
 * @property ?string $name
 * @property string $email
 * @property string $username
 * @property string $password
 * @property ?string $avatar
 * @property bool $verified
 * @property Time $created_at
 * @property Time $updated_at
 */
class User extends SerializableEntity {
  protected $protected = ['password'];

  public function setPassword(string $password) {
    $this->attributes['password'] = password_hash($password, PASSWORD_BCRYPT, ['cost' => 11]);

    return $this;
  }
}