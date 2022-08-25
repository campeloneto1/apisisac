<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class TurnosSeeder extends Seeder
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
            0 => ['subunidade_id' => 1,'nome' => 'Turno A'], 
            1 => ['subunidade_id' => 1,'nome' => 'Turno B']
        ];
        DB::table('turnos')->insert($init);
        Schema::enableForeignKeyConstraints();
    }
}
