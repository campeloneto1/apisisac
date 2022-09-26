<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UsersArmamentosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_armamentos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subunidade_id')->nullable()->constrained('subunidades')->onUpdate('cascade')->onDelete('set null');
            $table->foreignId('user_id')->nullable()->constrained('users')->onUpdate('cascade')->onDelete('set null');
            $table->foreignId('armamento_id')->nullable()->constrained('armamentos')->onUpdate('cascade')->onDelete('set null');
            
            $table->integer('quant')->nullable();

            $table->date('data_emp');
            $table->date('data_dev')->nullable();
            $table->boolean('danificado')->nullable();
            $table->boolean('extraviado')->nullable();
            $table->string('observacoes', 10000)->nullable();         

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
        Schema::dropIfExists('users_armamentos');
    }
}
