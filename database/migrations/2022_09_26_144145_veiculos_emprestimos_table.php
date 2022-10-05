<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class VeiculosEmprestimosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::create('veiculos_emprestimos', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('subunidade_id')->nullable()->constrained('subunidades')->onUpdate('cascade')->onDelete('set null'); 
            $table->foreignId('veiculo_id')->nullable()->constrained('veiculos')->onUpdate('cascade')->onDelete('set null');               
            $table->foreignId('user_id')->nullable()->constrained('users')->onUpdate('cascade')->onDelete('set null');

            $table->date('data_saida');
            $table->time('hora_saida');
            $table->integer('km_inicial'); 

            $table->date('data_chegada')->nullable();
            $table->time('hora_chegada')->nullable();
            $table->integer('km_final')->nullable(); 

            $table->string('observacoes', 10000)->nullable(); 

            $table->string('key', 130)->nullable(); 
            
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
        Schema::dropIfExists('veiculos_emprestimos');
    }
}
