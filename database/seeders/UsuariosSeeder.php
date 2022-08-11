<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
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
        $init = [
            0 => ['nome' => 'Jose de Barros Campelo Neto', 'cpf' => '05906219471', 'usuario' => '05906219471', 'matricula' => '30882814', 'password' => bcrypt('123456'), 'data_nascimento' => '1991-05-16', 'graduacao_id' => 1, 'email' => 'pmcebarros@gmail.com', 'telefone1' => '88999492036', 'cidade_id' => '756', 'rua' => 'rua 1', 'numero' => 1, 'bairro' => 'coco', 'perfil_id' => 1],
             1 => ['nome' => 'Pedro Albuquerque', 'cpf' => '05906219472', 'usuario' => '05906219472', 'matricula' => '30882815', 'password' => bcrypt('123456'), 'data_nascimento' => '1991-05-12', 'graduacao_id' => 1, 'email' => 'pmcebarros2@gmail.com', 'telefone1' => '88999492036', 'cidade_id' => '756', 'rua' => 'rua 1', 'numero' => 1, 'bairro' => 'coco', 'perfil_id' => 2],
           
        ];
        DB::table('users')->insert($init);
    }
}
