<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class EscalasModalidadesSeeder extends Seeder
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
            0 => ['escala_modelo_id' => 1,'modalidade_id' => 1],
            1 => ['escala_modelo_id' => 1,'modalidade_id' => 2],
            2 => ['escala_modelo_id' => 1,'modalidade_id' => 3],
            3 => ['escala_modelo_id' => 1,'modalidade_id' => 4],
            4 => ['escala_modelo_id' => 1,'modalidade_id' => 5],
            5 => ['escala_modelo_id' => 1,'modalidade_id' => 6]

        ];
        DB::table('escalas_modalidades')->insert($init);
        Schema::enableForeignKeyConstraints();
    }
}
