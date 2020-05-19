<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Post extends Migration {
  public function up() {
    $this->forge->addField('id');
    $this->forge->addField([
      'user_id' => [
        'type' => 'INT',
        'constraint' => 9,
      ],
      'image' => [
        'type' => 'VARCHAR',
        'constraint' => 255,
      ],
      'title' => [
        'type' => 'VARCHAR',
        'constraint' => 255,
      ],
      'description' => [
        'type' => 'VARCHAR',
        'constraint' => 255,
        'null' => true,
      ],
      'likes' => [
        'type' => 'INT',
        'constraint' => 9,
        'default' => 0,
      ],
      'tag_id' => [
        'type' => 'INT',
        'constraint' => 9,
      ],
      'created_at' => [
        'type' => 'DATETIME'
      ],
      'updated_at' => [
        'type' => 'DATETIME'
      ],
		
    ]);
    $this->forge->addKey('created_at');
    $this->forge->addForeignKey('user_id','users','id');
    $this->forge->addForeignKey('tag_id', 'tags', 'id');
    $this->forge->createTable('posts');
  }

  public function down() {
    $this->forge->dropTable('posts');
  }
}
