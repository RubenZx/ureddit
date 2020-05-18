<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class TagSeeder extends Seeder {
  public function run() {
    $data = [
      ['name' => 'Sports'], 
      ['name' => 'News'] , 
      ['name' => 'Gaming'], 
      ['name' => 'Tech'], 
      ['name' => 'Memes'], 
      ['name' => 'Tv'], 
      ['name' => 'Music'] 
    ];

    $this->db->table('tags')->insertBatch($data);
  }
}