<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CoresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $init = [
            0 => ['nome' => 'Azul'],
            1 => ['nome' => 'Preto'],
            2 => ['nome' => 'Vermelho']
        ];
        DB::table('cores')->insert($init);
    }
}
