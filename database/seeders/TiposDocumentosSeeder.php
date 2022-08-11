<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TiposDocumentosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $init = [
            0 => ['nome' => 'Ofício', 'abreviatura' => 'OF'],
            1 => ['nome' => 'Comunicação Interna', 'abreviatura' => 'CI'],
            2 => ['nome' => 'Cópia Autêntica', 'abreviatura' => 'CA'],
            3 => ['nome' => 'Declaração', 'abreviatura' => 'DC'],
            4 => ['nome' => 'Requerimento', 'abreviatura' => 'RE'],
            5 => ['nome' => 'Guia de Férias', 'abreviatura' => 'GF'],
        ];
        DB::table('documentos_tipos')->insert($init);
    }
}
