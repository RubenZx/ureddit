<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class PostsComments extends Migration {
  public function up() {
    $this->forge->addField('id');
    $this->forge->addField([
      'post_id' => [
        'type' => 'INT',
        'constraint' => 9,
      ],
      'comment_id' => [
        'type' => 'INT',
        'constraint' => 9,
      ],
    ]);
    $this->forge->addUniqueKey(['comment_id','post_id']);
    $this->forge->addUniqueKey(['post_id','comment_id']);
    $this->forge->addForeignKey('comment_id', 'comments', 'id');
    $this->forge->addForeignKey('post_id', 'posts', 'id');
    $this->forge->createTable('posts_comments');
  }

  public function down() {
    $this->forge->dropTable('posts_comments');
  }
}