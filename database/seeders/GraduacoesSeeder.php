<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GraduacoesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $init = [
            0 => ['nome' => 'Soldado', 'abreviatura' => 'SD', 'ordem' => '1'],
            1 => ['nome' => 'Cabo', 'abreviatura' => 'CB', 'ordem' => '2'],
            2 => ['nome' => '3º Sargento', 'abreviatura' => '3º SGT', 'ordem' => '3'],
            3 => ['nome' => '2º Sargento', 'abreviatura' => '2º SGT', 'ordem' => '4'],
            4 => ['nome' => '1º Sargento', 'abreviatura' => '1º SGT', 'ordem' => '5'],
            5 => ['nome' => 'SubTenente', 'abreviatura' => 'ST', 'ordem' => '6'],
            6 => ['nome' => '2º Tenente', 'abreviatura' => '2º TEN', 'ordem' => '7'],
            7 => ['nome' => '1º Tenente', 'abreviatura' => '1º TEN', 'ordem' => '8'],
            8 => ['nome' => 'Capitão', 'abreviatura' => 'CAP', 'ordem' => '9'],
            9 => ['nome' => 'Major', 'abreviatura' => 'MAJ', 'ordem' => '10'],
            10 => ['nome' => 'Tenente-Coronel', 'abreviatura' => 'TEN-CEL', 'ordem' => '11'],
            11 => ['nome' => 'Coronel', 'abreviatura' => 'CEL', 'ordem' => '12']
        ];
        DB::table('graduacoes')->insert($init);
    }
}
