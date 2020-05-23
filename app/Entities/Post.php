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
  protected $table = 'posts';
  
  public function updateLikes($user_id) {
    $builder = db_connect()->table("likes");
    $user_like_post = ['user_id' => $user_id, 'post_id' => $this->id];

    $result = $builder->select()->where($user_like_post)->get()->getResultArray();
    if (empty($result)) {
      $builder->insert($user_like_post);
      $this->likes += 1;
    } else {
      $builder->delete($user_like_post);
      $this->likes -= 1;
    }
  }
}
