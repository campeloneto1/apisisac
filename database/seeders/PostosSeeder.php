<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $init = [
            0 => ['nome' => 'Posto 01', 'abreviatura' => 'P01'],
            1 => ['nome' => 'Posto 02', 'abreviatura' => 'P02'],
            2 => ['nome' => 'Posto 03', 'abreviatura' => 'P03'],                    
            3 => ['nome' => 'Posto 04', 'abreviatura' => 'P04'],
            4 => ['nome' => 'Posto 05', 'abreviatura' => 'P05'],
            5 => ['nome' => 'Posto 06', 'abreviatura' => 'P06'],
            6 => ['nome' => 'Residência Oficial 01', 'abreviatura' => 'RO 01'],
            7 => ['nome' => 'Residência Oficial 02', 'abreviatura' => 'RO 02'],
            8 => ['nome' => 'Residência Oficial 03', 'abreviatura' => 'RO 03'],
        ];
        DB::table('postos')->insert($init);
    }
}
