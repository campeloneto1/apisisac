<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MateriaisTiposSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $init = [
            0 => ['nome' => 'HT'],
            1 => ['nome' => 'Carregador HT'],
            2 => ['nome' => 'Bateria HT'],
            3 => ['nome' => 'Cone']
        ];
        DB::table('materiais_tipos')->insert($init);
    }
}
