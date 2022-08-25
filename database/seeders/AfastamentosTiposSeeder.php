<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AfastamentosTiposSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $init = [
            0 => ['nome' => 'Atestado Médico'],
            1 => ['nome' => 'Maternidade'],
            2 => ['nome' => 'Paternidade']
        ];
        DB::table('afastamentos_tipos')->insert($init);
    }
}
