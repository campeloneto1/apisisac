<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SubunidadesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::create('subunidades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('unidade_id')->nullable()->constrained('unidades')->onUpdate('cascade')->onDelete('set null');
            $table->string('nome',100);
            $table->string('abreviatura', 15)->nullable();

            $table->string('email')->unique()->nullable();
            $table->string('telefone1', 15)->nullable();
            $table->string('telefone2', 15)->nullable();

            $table->string('cep', 15)->nullable();
            $table->string('rua', 150)->nullable();
            $table->string('numero', 15)->nullable();
            $table->string('bairro', 50)->nullable();
            $table->string('complemento', 150)->nullable();
            //$table->integer('cidade_id')->nullable();
            $table->foreignId('cidade_id')->nullable()->constrained('cidades')->onDelete('set null')->onUpdate('cascade');

             $table->foreignId('comandante_id')->nullable()->constrained('users')->onUpdate('cascade')->onDelete('set null');
            $table->foreignId('subcomandante_id')->nullable()->constrained('users')->onUpdate('cascade')->onDelete('set null');
            //$table->integer('comandante')->nullable();
            //$table->integer('subcomandante')->nullable();
            
            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->timestamps();
        });
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('companhias');
    }
}
