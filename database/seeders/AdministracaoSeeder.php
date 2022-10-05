<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdministracaoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $init = [
            0 => ['subunidade_id' => 1, 'valor_irso_sd' => '10', 'valor_irso_cb' => '20', 'valor_irso_3sgt' => '30', 'valor_irso_2sgt' => '40', 'valor_irso_1sgt' => '50', 'valor_irso_st' => '60', 'valor_irso_2ten' => '70', 'valor_irso_1ten' => '80', 'valor_irso_cap' => '90', 'valor_irso_maj' => '100', 'valor_irso_tencel' => '110', 'valor_irso_cel' => '120']
        ];
        DB::table('administracao')->insert($init);
    }
}
