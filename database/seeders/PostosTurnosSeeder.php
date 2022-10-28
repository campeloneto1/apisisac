<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class PostosTurnosSeeder extends Seeder
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
            0 => ['posto_id' => 1,'turno_id' => 1],
            1 => ['posto_id' => 1,'turno_id' => 2],
            2 => ['posto_id' => 2,'turno_id' => 1],
            3 => ['posto_id' => 2,'turno_id' => 2],
            4 => ['posto_id' => 3,'turno_id' => 1],
            5 => ['posto_id' => 3,'turno_id' => 2],
            6 => ['posto_id' => 4,'turno_id' => 1],
            7 => ['posto_id' => 4,'turno_id' => 2],
            8 => ['posto_id' => 5,'turno_id' => 1],
            9 => ['posto_id' => 5,'turno_id' => 2],
            10 => ['posto_id' => 6,'turno_id' => 1],
            11 => ['posto_id' => 6,'turno_id' => 2],
            12 => ['posto_id' => 7,'turno_id' => 1],
            13 => ['posto_id' => 7,'turno_id' => 2],
            14 => ['posto_id' => 8,'turno_id' => 1],
            15 => ['posto_id' => 8,'turno_id' => 2],
            16 => ['posto_id' => 9,'turno_id' => 1],
            17 => ['posto_id' => 9,'turno_id' => 2],
            18 => ['posto_id' => 10,'turno_id' => 1],
            19 => ['posto_id' => 10,'turno_id' => 2],
            20 => ['posto_id' => 11,'turno_id' => 1],
            21 => ['posto_id' => 11,'turno_id' => 2],
            22 => ['posto_id' => 12,'turno_id' => 1],
            23 => ['posto_id' => 12,'turno_id' => 2],
            24 => ['posto_id' => 13,'turno_id' => 1],
            25 => ['posto_id' => 13,'turno_id' => 2],
            26 => ['posto_id' => 14,'turno_id' => 1],
            27 => ['posto_id' => 14,'turno_id' => 2],
            28 => ['posto_id' => 15,'turno_id' => 1],
            29 => ['posto_id' => 15,'turno_id' => 2],
            30 => ['posto_id' => 17,'turno_id' => 1],
            31 => ['posto_id' => 17,'turno_id' => 2]

        ];
        DB::table('postos_turnos')->insert($init);
        Schema::enableForeignKeyConstraints();
    }
}
