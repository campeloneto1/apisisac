<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class ModalidadesPostosSeeder extends Seeder
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
            0 => ['modalidade_id' => 1,'posto_id' => 1],
            1 => ['modalidade_id' => 2,'posto_id' => 2],
            2 => ['modalidade_id' => 2,'posto_id' => 3],
            3 => ['modalidade_id' => 2,'posto_id' => 4],
            4 => ['modalidade_id' => 3,'posto_id' => 5],
            5 => ['modalidade_id' => 3,'posto_id' => 6],
            6 => ['modalidade_id' => 3,'posto_id' => 7],
            7 => ['modalidade_id' => 3,'posto_id' => 10],
            8 => ['modalidade_id' => 4,'posto_id' => 13],
            9 => ['modalidade_id' => 4,'posto_id' => 14],
            10 => ['modalidade_id' => 4,'posto_id' => 15],
            11 => ['modalidade_id' => 5,'posto_id' => 11],
            12 => ['modalidade_id' => 5,'posto_id' => 12],
            13 => ['modalidade_id' => 5,'posto_id' => 17],
            14 => ['modalidade_id' => 6,'posto_id' => 16]

        ];
        DB::table('modalidades_postos')->insert($init);
        Schema::enableForeignKeyConstraints();
    }
}
