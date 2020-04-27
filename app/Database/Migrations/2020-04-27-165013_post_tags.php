<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class PostTags extends Migration {
  public function up() {
    $this->forge->addField([
      'id_post' => [
        'type' => 'INT',
        'constraint' => 9,
      ],
      'id_tag' => [
        'type' => 'INT',
        'constraint' => 9,
      ]
    ]);
    $this->forge->addForeignKey('id_post','posts','id');
    $this->forge->addForeignKey('id_tag','tags','id');
    $this->forge->createTable('post_tags');
  }

  //--------------------------------------------------------------------

  public function down() {
    $this->forge->dropTable('post_tags');
  }
}
