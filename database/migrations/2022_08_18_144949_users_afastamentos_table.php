<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UsersAfastamentosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_afastamentos', function (Blueprint $table) {
            $table->id();

            $table->foreignId('subunidade_id')->nullable()->constrained('subunidades')->onUpdate('cascade')->onDelete('set null');
            $table->foreignId('user_id')->nullable()->constrained('users')->onUpdate('cascade')->onDelete('set null');
            $table->foreignId('afastamento_tipo_id')->nullable()->constrained('afastamentos_tipos')->onUpdate('cascade')->onDelete('set null');
            //$table->string('descricao',1000);
            $table->string('cid',20)->nullable();
            $table->string('hospital',100)->nullable();
            $table->date('data');
            $table->date('data_fim')->nullable();
            $table->date('apto')->nullable();
            $table->integer('dias');
            $table->boolean('objeto_servico')->nullable();

            $table->date('copem')->nullable();
            $table->integer('resultado')->nullable();


            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
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
        Schema::dropIfExists('users_afastamentos');
    }
}
