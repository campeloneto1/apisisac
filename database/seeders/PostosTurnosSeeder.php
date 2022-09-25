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
            4 => ['posto_id' => 6,'turno_id' => 1],
            5 => ['posto_id' => 6,'turno_id' => 2],
            6 => ['posto_id' => 7,'turno_id' => 1],
            7 => ['posto_id' => 7,'turno_id' => 2],
            8 => ['posto_id' => 8,'turno_id' => 1],
            9 => ['posto_id' => 8,'turno_id' => 2],
            10 => ['posto_id' => 9,'turno_id' => 1],
            11 => ['posto_id' => 9,'turno_id' => 2]

        ];
        DB::table('postos_turnos')->insert($init);
        Schema::enableForeignKeyConstraints();
    }
}
