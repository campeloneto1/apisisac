<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EscalasPostosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('escalas_postos', function (Blueprint $table) {
            $table->id();

            $table->foreignId('escala_modelo_id')->nullable()->constrained('escalas_modelos')->onUpdate('cascade')->onDelete('set null');            
            $table->foreignId('posto_turno_id')->nullable()->constrained('postos_turnos')->onUpdate('cascade')->onDelete('set null');
            $table->boolean('visivel')->nullable();           
            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->timestamps();

            $table->unique(['escala_modelo_id', 'posto_turno_id']); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('escalas_postos');
    }
}
