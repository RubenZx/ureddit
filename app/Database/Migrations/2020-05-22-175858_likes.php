<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Likes extends Migration {
  public function up() {
    $this->forge->addField('id');
    $this->forge->addField([
      'post_id' => [
        'type' => 'INT',
        'constraint' => 9,
      ],
      'user_id' => [
        'type' => 'INT',
        'constraint' => 9,
      ],
    ]);
    $this->forge->addUniqueKey(['user_id','post_id']);
    $this->forge->addUniqueKey(['post_id','user_id']);
    $this->forge->addForeignKey('user_id', 'users', 'id');
    $this->forge->addForeignKey('post_id', 'posts', 'id');
    $this->forge->createTable('likes');
  }

  public function down() {
    $this->forge->dropTable('likes');
  }
}