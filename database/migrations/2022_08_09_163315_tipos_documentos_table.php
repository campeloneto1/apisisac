<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TiposDocumentosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('documentos_tipos', function (Blueprint $table) {
            $table->id();
            $table->string('nome',100);
            $table->string('abreviatura',20);
            $table->boolean('sigiloso')->nullable();
            $table->string('titulo', 250)->nullable();
            $table->longText('corpo')->nullable();
            
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
        Schema::dropIfExists('documentos_tipos');
    }
}
