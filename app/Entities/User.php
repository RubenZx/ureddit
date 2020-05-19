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
 * @property int $token_version
 * @property int $id_tag
 * @property Time $created_at
 * @property Time $updated_at
 */
class User extends SerializableEntity {
  protected $table = 'users';

  protected $protected = ['password'];

  protected $casts = [
    'id' => 'int',
    'status' => 'boolean',
    'verified' => 'boolean',
    'token_version' => 'int',
  ];

  public function setPassword(string $password) {
    $this->attributes['password'] = password_hash($password, PASSWORD_BCRYPT, ['cost' => 11]);

    return $this;
  }
}