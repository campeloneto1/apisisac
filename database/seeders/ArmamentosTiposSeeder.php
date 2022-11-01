<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArmamentosTiposSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $init = [
            0 => ['nome' => 'Pistola 9mm'],
            1 => ['nome' => 'Pistola .40'],
            2 => ['nome' => 'Revolver 38'],
            3 => ['nome' => 'Carabina'],
            4 => ['nome' => 'Espingarda'],
            5 => ['nome' => 'Metralhadora'],
            6 => ['nome' => 'Fuzil 556'],
            7 => ['nome' => 'Fuzil 762'],
            8 => ['nome' => 'Munição .40'],
            9 => ['nome' => 'Munição 38'],
            10 => ['nome' => 'Munição 9mm'],
            11 => ['nome' => 'Munição 556'],
            12 => ['nome' => 'Munição 762'],
            13 => ['nome' => 'Munição Cal 12'],
            14 => ['nome' => 'Colete Balístico IIIA'],
            15 => ['nome' => 'Algemas']
        ];
        DB::table('armamentos_tipos')->insert($init);
    }
}
