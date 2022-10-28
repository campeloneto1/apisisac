<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AdministracaoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('administracao', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subunidade_id')->nullable()->constrained('subunidades')->onUpdate('cascade')->onDelete('set null');

            $table->double('valor_irso_sd',5,2);       
            $table->double('valor_irso_cb',5,2); 
            $table->double('valor_irso_3sgt',5,2);      
            $table->double('valor_irso_2sgt',5,2); 
            $table->double('valor_irso_1sgt',5,2); 
            $table->double('valor_irso_st',5,2); 
            $table->double('valor_irso_2ten',5,2); 
            $table->double('valor_irso_1ten',5,2); 
            $table->double('valor_irso_cap',5,2); 
            $table->double('valor_irso_maj',5,2); 
            $table->double('valor_irso_tencel',5,2); 
            $table->double('valor_irso_cel',5,2); 

            $table->mediumText('observacoes_escala')->nullable();

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
        Schema::dropIfExists('administracao');
    }
}
