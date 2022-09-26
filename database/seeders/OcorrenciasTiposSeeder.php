<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OcorrenciasTiposSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $init = [
            0 => ['nome' => 'Furto'],
            1 => ['nome' => 'Roubo'],
            2 => ['nome' => 'Acidente de trânsito']
        ];
        DB::table('ocorrencias')->insert($init);
    }
}
