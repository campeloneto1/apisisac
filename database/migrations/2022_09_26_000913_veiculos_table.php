<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class VeiculosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::create('veiculos', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('subunidade_id')->nullable()->constrained('subunidades')->onUpdate('cascade')->onDelete('set null'); 
            $table->foreignId('marca_id')->nullable()->constrained('marcas')->onUpdate('cascade')->onDelete('set null');               
            $table->foreignId('modelo_id')->nullable()->constrained('modelos')->onUpdate('cascade')->onDelete('set null');
            $table->foreignId('cor_id')->nullable()->constrained('cores')->onUpdate('cascade')->onDelete('set null');
            $table->integer('ano');

            $table->string('placa',20);
            $table->string('placa_esp',20)->nullable(); 
            $table->string('chassi',30)->nullable(); 
            $table->string('renavam',30)->nullable(); 

            $table->integer('km_inicial')->nullable(); 
            $table->integer('km_atual')->nullable(); 

            $table->integer('troca_oleo')->nullable(); 

            $table->date('data_baixa')->nullable(); 

            $table->string('observacoes', 1000)->nullable(); 
            
            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->timestamps();

            $table->unique(['subunidade_id', 'placa'], 'unique_veiculo');
            $table->unique(['subunidade_id', 'placa_esp'], 'unique_veiculo2');
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
        Schema::dropIfExists('veiculos');
    }
}
