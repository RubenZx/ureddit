<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Comments extends Migration {
  public function up() {
    $this->forge->addField('id');
    $this->forge->addField([
      'content' => [
        'type' => 'TEXT',
      ],
      'author' => [
        'type' => 'INT',
        'constraint' => 9,
      ],
      'id_post' => [
        'type' => 'INT',
        'constraint' => 9,
      ],
      'likes' => [
        'type' => 'INT',
        'constraint' => 9,
      ],
      'id_reply' => [
        'type' => 'INT',
        'constraint' => 9,
        'null' => true,
      ],
      'created_at' => [
        'type' => 'DATETIME'
      ],
      'updated_at' => [
        'type' => 'DATETIME'
      ],
    ]);
    $this->forge->addKey('created_at');
    $this->forge->addForeignKey('author','users','id');
    $this->forge->addForeignKey('id_post','posts','id');
    $this->forge->addForeignKey('id_reply','comments','id');
    $this->forge->createTable('comments');
  }

  public function down() {
    $this->forge->dropTable('comments');
  }
}
