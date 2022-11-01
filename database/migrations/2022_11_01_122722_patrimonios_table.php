<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PatrimoniosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patrimonios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subunidade_id')->nullable()->constrained('subunidades')->onUpdate('cascade')->onDelete('set null');
            $table->foreignId('setor_id')->nullable()->constrained('setores')->onUpdate('cascade')->onDelete('set null');
            $table->foreignId('patrimonio_tipo_id')->nullable()->constrained('patrimonios_tipos')->onUpdate('cascade')->onDelete('set null');
            $table->string('serial',100)->unique();

            $table->date('data_baixa')->nullable(); 
            $table->string('observacoes', 1000)->nullable(); 
                        
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
       Schema::dropIfExists('patrimonios');
    }
}
