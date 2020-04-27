<?php

namespace App\Entities;

/**
 * @property int $id
 * @property string $content
 * @property int $author
 * @property int $id_post
 * @property ?int $likes
 * @property int $id_reply
 * @property Time $created_at
 * @property Time $updated_at
 */
class Comments extends SerializableEntity {
}
