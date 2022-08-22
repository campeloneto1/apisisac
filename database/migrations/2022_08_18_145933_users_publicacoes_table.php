<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UsersPublicacoesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_publicacoes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subunidade_id')->nullable()->constrained('subunidades')->onUpdate('cascade')->onDelete('set null');
            $table->foreignId('user_id')->nullable()->constrained('users')->onUpdate('cascade')->onDelete('set null');
            $table->foreignId('tipo_publicacao_id')->nullable()->constrained('tipos_publicacoes')->onUpdate('cascade')->onDelete('set null');
            $table->string('descricao',1000);
            $table->string('boletim',50);            

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
        Schema::dropIfExists('users_publicacoes');
    }
}
