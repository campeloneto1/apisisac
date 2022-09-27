<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MateriaisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('materiais', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subunidade_id')->nullable()->constrained('subunidades')->onUpdate('cascade')->onDelete('set null');
            $table->foreignId('material_tipo_id')->nullable()->constrained('armamentos_tipos')->onUpdate('cascade')->onDelete('set null'); 
            $table->foreignId('marca_id')->nullable()->constrained('marcas')->onUpdate('cascade')->onDelete('set null');   
            $table->foreignId('modelo_id')->nullable()->constrained('modelos')->onUpdate('cascade')->onDelete('set null'); 
            $table->string('serial',100)->nullable();    
            $table->date('data_venc')->nullable();
            $table->boolean('danificado')->nullable();
            $table->boolean('extraviado')->nullable();
                        
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
        Schema::dropIfExists('materiais');
    }
}
