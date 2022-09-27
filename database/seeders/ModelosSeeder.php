<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ModelosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $init = [
            0 => ['nome' => 'P320', 'marca_id' => '1'],
            1 => ['nome' => 'PT100', 'marca_id' => '2'],
            2 => ['nome' => '24/7', 'marca_id' => '2'],
            3 => ['nome' => 'Capa Balística', 'marca_id' => '3'],
            4 => ['nome' => 'Corolla', 'marca_id' => '4'],
            5 => ['nome' => 'Cruze', 'marca_id' => '5'],
            6 => ['nome' => 'Modelo Material', 'marca_id' => '6']
        ];
        DB::table('modelos')->insert($init);
    }
}
