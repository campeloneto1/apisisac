<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MarcasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $init = [
            0 => ['nome' => 'SigSauer', 'tipo_id' => '2'],
            1 => ['nome' => 'Taurus', 'tipo_id' => '2'],
            2 => ['nome' => 'Protecta', 'tipo_id' => '2'],
            3 => ['nome' => 'Toyota', 'tipo_id' => '1'],
            4 => ['nome' => 'Chevrolet', 'tipo_id' => '1'],
            5 => ['nome' => 'Marca HT', 'tipo_id' => '3']
        ];
        DB::table('marcas')->insert($init);
    }
}
