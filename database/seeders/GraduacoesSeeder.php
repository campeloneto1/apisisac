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
            0 => ['nome' => 'Soldado', 'abreviatura' => 'SD'],
            1 => ['nome' => 'Cabo', 'abreviatura' => 'CB'],
            2 => ['nome' => '3º Sargento', 'abreviatura' => '3º SGT'],
            3 => ['nome' => '2º Sargento', 'abreviatura' => '2º SGT'],
            4 => ['nome' => '1º Sargento', 'abreviatura' => '1º SGT'],
            5 => ['nome' => 'SubTenente', 'abreviatura' => 'Sub'],
            6 => ['nome' => '2º Tenente', 'abreviatura' => '2º TEN'],
            7 => ['nome' => '1º Tenente', 'abreviatura' => '1º TEN'],
            8 => ['nome' => 'Capitão', 'abreviatura' => 'CAP'],
            9 => ['nome' => 'Major', 'abreviatura' => 'MAJ'],
            10 => ['nome' => 'Tenente-Coronel', 'abreviatura' => 'TEN-CEL'],
            11 => ['nome' => 'Coronel', 'abreviatura' => 'CEL']
        ];
        DB::table('graduacoes')->insert($init);
    }
}
