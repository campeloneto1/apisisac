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
            1 => ['nome' => 'Transporte', 'subunidade_id' => 1, 'escala' => 0],                    
            2 => ['nome' => 'Logística', 'subunidade_id' => 1, 'escala' => 0], 
            3 => ['nome' => 'Cerimonial', 'subunidade_id' => 1, 'escala' => 0], 
            4 => ['nome' => 'Consultorio Odontológico', 'subunidade_id' => 1, 'escala' => 0], 
            5 => ['nome' => 'Estratégico', 'subunidade_id' => 1, 'escala' => 0], 
            6 => ['nome' => 'Segurança', 'subunidade_id' => 1, 'escala' => 0]
        ];
        DB::table('setores')->insert($init);
    }
}
