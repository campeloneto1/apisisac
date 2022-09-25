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
            0 => ['escala_modelo_id' => 1,'modalidade_id' => 2],
            1 => ['escala_modelo_id' => 1,'modalidade_id' => 1],
            2 => ['escala_modelo_id' => 1,'modalidade_id' => 4],
            3 => ['escala_modelo_id' => 1,'modalidade_id' => 3]

        ];
        DB::table('escalas_modalidades')->insert($init);
        Schema::enableForeignKeyConstraints();
    }
}
