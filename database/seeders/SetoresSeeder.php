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
            0 => ['nome' => 'Sargenteação'], 
            1 => ['nome' => 'Transporte'],                    
            2 => ['nome' => 'Logística'], 
            3 => ['nome' => 'Cerimonial'], 
            4 => ['nome' => 'Consultorio Odontológico'], 
            5 => ['nome' => 'Estratégico'], 
            6 => ['nome' => 'Segurança']
        ];
        DB::table('setores')->insert($init);
    }
}
