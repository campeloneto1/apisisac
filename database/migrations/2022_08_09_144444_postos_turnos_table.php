<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PostosTurnosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('postos_turnos', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('posto_id')->nullable()->constrained('postos')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('turno_id')->nullable()->constrained('turnos')->onUpdate('cascade')->onDelete('cascade');
            
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
        Schema::dropIfExists('postos_turnos');
    }
}
