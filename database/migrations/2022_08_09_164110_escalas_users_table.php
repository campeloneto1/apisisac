<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EscalasUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::create('escalas_users', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('escala_id')->nullable()->constrained('escalas')->onUpdate('cascade')->onDelete('set null');
            $table->foreignId('modalidade_id')->nullable()->constrained('modalidades')->onUpdate('cascade')->onDelete('set null');   
            $table->foreignId('posto_id')->nullable()->constrained('postos')->onUpdate('cascade')->onDelete('set null');   
            $table->foreignId('turno_id')->nullable()->constrained('turnos')->onUpdate('cascade')->onDelete('set null');                 
            $table->foreignId('user_id')->nullable()->constrained('users')->onUpdate('cascade')->onDelete('set null');
            $table->boolean('atrasado')->nullable();
            $table->boolean('ausente')->nullable();
            $table->boolean('atestado')->nullable();
            
            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->timestamps();

            $table->unique(['escala_id', 'modalidade_id', 'posto_id', 'turno_id', 'user_id'], 'unique_escala');
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
        Schema::dropIfExists('escalas_users');
    }
}
