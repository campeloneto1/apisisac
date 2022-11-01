<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PatrimoniosTiposSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $init = [
            0 => ['nome' => 'Mesa'],
            1 => ['nome' => 'Cadeira com rodas'],
            2 => ['nome' => 'Computador'],
            3 => ['nome' => 'Monitor'],
            4 => ['nome' => 'Impressora']
        ];
        DB::table('patrimonios_tipos')->insert($init);
    }
}
