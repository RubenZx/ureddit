<?php

namespace App\Entities;

use CodeIgniter\Entity;
use JsonSerializable;
use Tatter\Relations\Traits\EntityTrait;

class SerializableEntity extends Entity implements JsonSerializable {
  use EntityTrait;

  protected $primaryKey = 'id';

  protected $protected = [];

  public function jsonSerialize() {
    $properties = array_diff(array_keys($this->attributes), $this->protected);
    $serialized = [];
    foreach ($properties as $property) {
      $serialized[$property] = in_array($property, $this->dates)?$this->{$property}->__toString():$this->{$property};
    }

    return $serialized;
  }
}