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
            0 => ['nome' => 'Branco'],
            1 => ['nome' => 'Cinza'],
            2 => ['nome' => 'Preto'],
            3 => ['nome' => 'Azul'],
            4 => ['nome' => 'Vermelho'],
            5 => ['nome' => 'Marrom'],
            6 => ['nome' => 'Verde'],
            7 => ['nome' => 'Amarelo'],
            8 => ['nome' => 'Prata']
        ];
        DB::table('cores')->insert($init);
    }
}
