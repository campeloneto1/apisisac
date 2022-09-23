<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArmamentosTiposSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $init = [
            0 => ['nome' => 'Pistola 9mm'],
            1 => ['nome' => 'Pistola .40'],
            2 => ['nome' => 'Revolver 38']
        ];
        DB::table('armamentos_tipos')->insert($init);
    }
}
