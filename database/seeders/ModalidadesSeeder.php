<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class ModalidadesSeeder extends Seeder
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
            0 => ['nome' => 'Coordenador Operacional', 'subunidade_id' => 1], 
            1 => ['nome' => 'Residência Oficial', 'subunidade_id' => 1], 
            2 => ['nome' => 'Palácio da Abolição', 'subunidade_id' => 1],                    
            3 => ['nome' => 'Viatura Operacional', 'subunidade_id' => 1], 
            4 => ['nome' => 'Complexo Administrativo', 'subunidade_id' => 1],
            5 => ['nome' => 'Apoio a Unidade de Segurança', 'subunidade_id' => 1]
        ];
        DB::table('modalidades')->insert($init);
        Schema::enableForeignKeyConstraints();
    }
}
