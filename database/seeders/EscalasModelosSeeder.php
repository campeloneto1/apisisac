<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class EscalasModelosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $init = [
            0 => ['nome' => 'Escala de Serviço Diária', 'administrativo' => 1, 'subunidade_id' => 1]
        ];
        DB::table('escalas_modelos')->insert($init);
    }
}
