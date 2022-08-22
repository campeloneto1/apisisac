<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TiposPublicacoesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         $init = [
            0 => ['nome' => 'Férias'], 
            1 => ['nome' => 'Publicação de Título'],
            2 => ['nome' => 'Punição'],
            3 => ['nome' => 'Averbação'],
            4 => ['nome' => 'Transferência'],
            5 => ['nome' => 'Quadro de Acesso'],
            6 => ['nome' => 'Instrução de Tiro'],
            7 => ['nome' => 'Promoção'],
            8 => ['nome' => 'Curso'],
            9 => ['nome' => 'Assunção de Função'],
            10 => ['nome' => 'Justiça'],
            11 => ['nome' => 'Determinação'],
            12 => ['nome' => 'Núpcias'],
            13 => ['nome' => 'Luto'],
            14 => ['nome' => 'Paternidade'],
            15 => ['nome' => 'Inspeção de saúde'],
            16 => ['nome' => 'Medalha'],
            17 => ['nome' => 'TAF']
        ];
        DB::table('tipos_publicacoes')->insert($init);
    }
}
