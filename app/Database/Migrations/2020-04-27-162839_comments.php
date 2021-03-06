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
      'user_id' => [
        'type' => 'INT',
        'constraint' => 9,
      ],
      'is_reply' => [
        'type' => 'BOOLEAN',
        'default' => false
      ],
      'comment_id' => [
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
    $this->forge->addForeignKey('user_id','users','id');
    $this->forge->addForeignKey('comment_id','comments','id');
    $this->forge->createTable('comments');
  }

  public function down() {
    $this->forge->dropTable('comments');
  }
}
