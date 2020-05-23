<?php

namespace App\Entities;

/**
 * @property int $id
 * @property string $content
 * @property bool $is_reply
 * @property int $user_id
 * @property int $reply_id
 * @property Time $created_at
 * @property Time $updated_at
 */
class Comments extends SerializableEntity {
  protected $table = 'comments';
}
