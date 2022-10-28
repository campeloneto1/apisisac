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
            0 => ['subunidade_id' => 1,'nome' => 'Oficial de Dia', 'abreviatura' => 'OFD'],
            1 => ['subunidade_id' => 1,'nome' => 'Residência Oficial 01', 'abreviatura' => 'RO 01'],
            2 => ['subunidade_id' => 1,'nome' => 'Residência Oficial 02', 'abreviatura' => 'RO 02'],
            3 => ['subunidade_id' => 1,'nome' => 'Residência Oficial 03', 'abreviatura' => 'RO 03'],
            4 => ['subunidade_id' => 1,'nome' => 'Posto 01', 'abreviatura' => 'P 01'],
            5 => ['subunidade_id' => 1,'nome' => 'Posto 02', 'abreviatura' => 'P 02'],
            6 => ['subunidade_id' => 1,'nome' => 'Posto 03', 'abreviatura' => 'P 03'],                    
            7 => ['subunidade_id' => 1,'nome' => 'Posto 04', 'abreviatura' => 'P 04'],
            8 => ['subunidade_id' => 1,'nome' => 'Posto 05', 'abreviatura' => 'P 05'],
            9 => ['subunidade_id' => 1,'nome' => 'Posto 06', 'abreviatura' => 'P 06'],            
            10 => ['subunidade_id' => 1,'nome' => 'Permanente', 'abreviatura' => 'PRM'],
            11 => ['subunidade_id' => 1,'nome' => 'Armeiro', 'abreviatura' => 'ARM'],
            12 => ['subunidade_id' => 1,'nome' => 'Alfa (CPG 01)', 'abreviatura' => 'CPG01'],
            13 => ['subunidade_id' => 1,'nome' => 'Bravo (CPG 02)', 'abreviatura' => 'CPG02'],
            14 => ['subunidade_id' => 1,'nome' => 'Charlie (CPG 03)', 'abreviatura' => 'CPG03'],
            15 => ['subunidade_id' => 1,'nome' => 'A Disposição', 'abreviatura' => 'DISP'],
            16 => ['subunidade_id' => 1,'nome' => 'Anexo Silva Paulet', 'abreviatura' => 'Casa Amarela']
        ];
        DB::table('postos')->insert($init);
        Schema::enableForeignKeyConstraints();
    }
}
