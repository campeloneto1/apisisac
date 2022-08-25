<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
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
        Schema::disableForeignKeyConstraints();
        $init = [
            0 => ['subunidade_id' => 1,'nome' => 'Posto 01', 'abreviatura' => 'P 01'],
            1 => ['subunidade_id' => 1,'nome' => 'Posto 02', 'abreviatura' => 'P 02'],
            2 => ['subunidade_id' => 1,'nome' => 'Posto 03', 'abreviatura' => 'P 03'],                    
            3 => ['subunidade_id' => 1,'nome' => 'Posto 04', 'abreviatura' => 'P 04'],
            4 => ['subunidade_id' => 1,'nome' => 'Posto 05', 'abreviatura' => 'P 05'],
            5 => ['subunidade_id' => 1,'nome' => 'Posto 06', 'abreviatura' => 'P 06'],
            6 => ['subunidade_id' => 1,'nome' => 'Residência Oficial 01', 'abreviatura' => 'RO 01'],
            7 => ['subunidade_id' => 1,'nome' => 'Residência Oficial 02', 'abreviatura' => 'RO 02'],
            8 => ['subunidade_id' => 1,'nome' => 'Residência Oficial 03', 'abreviatura' => 'RO 03'],
        ];
        DB::table('postos')->insert($init);
        Schema::enableForeignKeyConstraints();
    }
}
