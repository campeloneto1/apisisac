<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubunidadesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $init = [
            0 => ['unidade_id' => 1, 'nome' => '1ª Companhia de Policiamento de Guarda', 'abreviatura' => '1ª CPG'],
            1 => ['unidade_id' => 1, 'nome' => '2ª Companhia de Policiamento de Guarda', 'abreviatura' => '2ª CPG'],
            2 => ['unidade_id' => 1, 'nome' => '3ª Companhia de Policiamento de Guarda', 'abreviatura' => '3ª CPG']
           
        ];
        DB::table('subunidades')->insert($init);
    }
}
