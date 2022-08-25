<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EscalasModalidadesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('escalas_modalidades', function (Blueprint $table) {
            $table->id();

            $table->foreignId('escala_modelo_id')->nullable()->constrained('escalas_modelos')->onUpdate('cascade')->onDelete('set null');            
            $table->foreignId('modalidade_id')->nullable()->constrained('modalidades')->onUpdate('cascade')->onDelete('set null');
            $table->boolean('visivel')->nullable();           
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
        Schema::dropIfExists('escalas_modalidades');
    }
}
