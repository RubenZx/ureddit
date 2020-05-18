<?php

namespace App\Entities;

/**
 * @property int $id
 * @property string $author
 * @property string $image
 * @property string $title
 * @property string $description
 * @property ?int $likes
 * @property int $id_tag
 * @property Time $created_at
 * @property Time $updated_at
 */
class Post extends SerializableEntity {
}
