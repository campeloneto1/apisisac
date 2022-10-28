<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ArmamentosItensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('armamentos_itens', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_armamento_id')->nullable()->constrained('users_armamentos')->onUpdate('cascade')->onDelete('set null');
            $table->foreignId('armamento_id')->nullable()->constrained('armamentos')->onUpdate('cascade')->onDelete('set null');
            
            $table->integer('quant')->nullable();
            $table->integer('carregadores')->nullable();
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
        Schema::dropIfExists('armamentos_itens');
    }
}
