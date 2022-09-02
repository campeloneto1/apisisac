<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EscalasOcorrenciasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('escalas_ocorrencias', function (Blueprint $table) {
            $table->id();
             $table->foreignId('subunidade_id')->nullable()->constrained('subunidades')->onUpdate('cascade')->onDelete('set null');       
            $table->foreignId('escala_id')->nullable()->constrained('escalas')->onUpdate('cascade')->onDelete('set null');        
            $table->foreignId('ocorrencia_id')->nullable()->constrained('ocorrencias')->onUpdate('cascade')->onDelete('set null');  
             $table->foreignId('user_id')->nullable()->constrained('users')->onUpdate('cascade')->onDelete('set null');       
            $table->integer('codigo');
            $table->string('titulo', 250);            
            $table->longText('descricao');   
               
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
        Schema::dropIfExists('escalas_ocorrencias');
    }
}
