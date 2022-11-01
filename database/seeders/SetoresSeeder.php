<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SetoresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $init = [
            0 => ['nome' => 'Sargenteação', 'subunidade_id' => 1, 'escala' => 1], 
            1 => ['nome' => 'Transporte', 'subunidade_id' => 1, 'escala' => 1],                    
            2 => ['nome' => 'Logística', 'subunidade_id' => 1, 'escala' => 1], 
            3 => ['nome' => 'Cerimonial', 'subunidade_id' => 1, 'escala' => 1], 
            4 => ['nome' => 'Consultorio Odontológico', 'subunidade_id' => 1, 'escala' => 1], 
            5 => ['nome' => 'Estratégico', 'subunidade_id' => 1, 'escala' => 0], 
            6 => ['nome' => 'Segurança', 'subunidade_id' => 1, 'escala' => 0],
            7 => ['nome' => 'PGJ', 'subunidade_id' => 1, 'escala' => 0],
            8 => ['nome' => 'Prefeitura', 'subunidade_id' => 1, 'escala' => 0],
            9 => ['nome' => 'COAF', 'subunidade_id' => 1, 'escala' => 1],
            10 => ['nome' => 'Disposição', 'subunidade_id' => 1, 'escala' => 0],
            11 => ['nome' => 'Guarda', 'subunidade_id' => 1, 'escala' => 0],
            12 => ['nome' => 'Comandante', 'subunidade_id' => 1, 'escala' => 0],
            13 => ['nome' => 'SubComando', 'subunidade_id' => 1, 'escala' => 0],
            14 => ['nome' => 'Vice-Governadoria', 'subunidade_id' => 1, 'escala' => 0],
            15 => ['nome' => 'Chefia', 'subunidade_id' => 1, 'escala' => 0],
            16 => ['nome' => 'Armeiro', 'subunidade_id' => 1, 'escala' => 0],
            17 => ['nome' => 'BSP', 'subunidade_id' => 1, 'escala' => 0],
            18 => ['nome' => 'Emprestado', 'subunidade_id' => 1, 'escala' => 0]
        ];
        DB::table('setores')->insert($init);
    }
}