<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ArmamentosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('armamentos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('armamento_id')->nullable()->constrained('armamentos')->onUpdate('cascade')->onDelete('set null'); 
            $table->foreignId('marca_id')->nullable()->constrained('marcas')->onUpdate('cascade')->onDelete('set null');   
            $table->foreignId('modelo_id')->nullable()->constrained('modelos')->onUpdate('cascade')->onDelete('set null'); 
            $table->string('serial',100);      
                        
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
        Schema::dropIfExists('armamentos');
    }
}
