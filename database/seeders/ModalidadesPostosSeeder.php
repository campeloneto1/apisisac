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
            1 => ['modalidade_id' => 1,'posto_id' => 2],
            2 => ['modalidade_id' => 2,'posto_id' => 6],
            3 => ['modalidade_id' => 2,'posto_id' => 7],
            4 => ['modalidade_id' => 2,'posto_id' => 8],
            5 => ['modalidade_id' => 2,'posto_id' => 9]

        ];
        DB::table('modalidades_postos')->insert($init);
        Schema::enableForeignKeyConstraints();
    }
}
