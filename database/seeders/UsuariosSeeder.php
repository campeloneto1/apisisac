<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsuariosSeeder extends Seeder
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
            0 => ['subunidade_id' => 1, 'nome' => 'Jose de Barros Campelo Neto', 'cpf' => '05906219471', 'usuario' => '30882814', 'matricula' => '30882814', 'password' => bcrypt('123456'), 'data_nascimento' => '1991-05-16', 'graduacao_id' => 1, 'email' => 'pmcebarros@gmail.com', 'telefone1' => '88999492036', 'cidade_id' => '756', 'rua' => 'rua 1', 'numero' => 1, 'bairro' => 'coco', 'perfil_id' => 1, 'numeral' => 32103, 'nome_guerra' => 'Barros', 'sexo_id' => 1, 'boletim_inclusao' => 'BCG 035, 04.09.2017', 'data_apresentacao' => '2020-01-01', 'setor_id' => 1 ],
           
        ];
        DB::table('users')->insert($init);
        Schema::enableForeignKeyConstraints();
    }
}
