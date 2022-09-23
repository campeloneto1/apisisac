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
            3 => ['nome' => 'Capa Balística', 'marca_id' => '3']
        ];
        DB::table('modelos')->insert($init);
    }
}
