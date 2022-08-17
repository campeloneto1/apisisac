<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PaisesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $init = [
            0 => ['nome' => 'Brasil', 'uf' => 'BR']
        ];
        DB::table('paises')->insert($init);
    }
}
