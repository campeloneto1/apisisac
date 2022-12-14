<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('email')->unique()->nullable();
            $table->string('cpf', 15)->unique()->nullable();
            $table->string('numeral', 10)->unique()->nullable();
            $table->string('matricula', 15)->unique();
            $table->string('usuario', 15)->unique();
            $table->string('telefone1', 15)->nullable();
            $table->string('telefone2', 15)->nullable();
            $table->date('data_nascimento')->nullable();
            $table->date('data_ingresso')->nullable();
            $table->string('nome_guerra', 50)->nullable();
            $table->string('foto', 100)->nullable();
            $table->integer('sexo_id')->nullable();
            $table->foreignId('graduacao_id')->nullable()->constrained('graduacoes')->onUpdate('cascade')->onDelete('set null');
            $table->foreignId('perfil_id')->nullable()->constrained('perfis')->onUpdate('cascade')->onDelete('set null');
            $table->foreignId('subunidade_id')->nullable()->constrained('subunidades')->onUpdate('cascade')->onDelete('set null');
             $table->foreignId('setor_id')->nullable()->constrained('setores')->onUpdate('cascade')->onDelete('set null');
            //$table->integer('graduacao_id')->nullable();
            //$table->integer('perfil_id');

            $table->string('rua', 150)->nullable();
            $table->string('numero', 15)->nullable();
            $table->string('bairro', 50)->nullable();
            $table->string('complemento', 150)->nullable();
            //$table->integer('cidade_id')->nullable();
            $table->foreignId('cidade_id')->nullable()->constrained('cidades')->onUpdate('cascade')->onDelete('set null');
            $table->string('cep', 10)->nullable();

            $table->timestamp('email_verified_at')->nullable();            
            $table->string('password', 150);

            $table->string('boletim_inclusao', 30)->nullable();
            $table->string('boletim_entrada', 30)->nullable();
            $table->date('data_apresentacao')->nullable();
            //$table->boolean('transferido')->nullable();
            $table->string('boletim_saida', 30)->nullable();

            $table->boolean('conta')->default(0);

            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->rememberToken();
            $table->timestamps();

            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
