<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Users extends Migration {
  public function up() {
    $this->forge->addField('id');
    $this->forge->addField([
      'name' => [
        'type' => 'VARCHAR',
        'constraint' => 255,
        'null' => true,
      ],
      'email' => [
        'type' => 'VARCHAR',
        'constraint' => 255,
        'unique' => true,
      ],
      'username' => [
        'type' => 'VARCHAR',
        'constraint' => 255,
        'unique' => true,
      ],
      'password' => [
        'type' => 'VARCHAR',
        'constraint' => 255,
      ],
      'avatar' => [
        'type' => 'VARCHAR',
        'constraint' => 255,
        'null' => true,
      ],
      'verified' => [
        'type' => 'BOOLEAN',
        'default' => false
      ],
      'created_at' => [
        'type' => 'DATETIME',
      ],
      'updated_at' => [
        'type' => 'DATETIME',
      ],
    ]);
    $this->forge->addKey('created_at');
    $this->forge->createTable('users');
  }

  public function down() {
    $this->forge->dropTable('users');
  }
}
