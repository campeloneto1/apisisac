<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PerfisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('perfis', function (Blueprint $table) {
            $table->id();
            $table->string('nome',100)->unique();

            $table->boolean('administrador')->nullable();
            $table->boolean('gestor')->nullable();
            $table->boolean('oficial_dia')->nullable();
            $table->boolean('permanente')->nullable();
            
            $table->boolean('afastamentos')->nullable();
            $table->boolean('afastamentos_cad')->nullable();
            $table->boolean('afastamentos_edt')->nullable();
            $table->boolean('afastamentos_del')->nullable();  

            $table->boolean('armamentos')->nullable();
            $table->boolean('armamentos_cad')->nullable();
            $table->boolean('armamentos_edt')->nullable();
            $table->boolean('armamentos_del')->nullable();  

            $table->boolean('armamentos_emprestimos')->nullable();
            $table->boolean('armamentos_emprestimos_cad')->nullable();
            $table->boolean('armamentos_emprestimos_edt')->nullable();
            $table->boolean('armamentos_emprestimos_del')->nullable();  

            $table->boolean('documentos')->nullable();
            $table->boolean('documentos_cad')->nullable();
            $table->boolean('documentos_edt')->nullable();
            $table->boolean('documentos_del')->nullable();            

            $table->boolean('escalas')->nullable();
            $table->boolean('escalas_cad')->nullable();
            $table->boolean('escalas_edt')->nullable();
            $table->boolean('escalas_del')->nullable();

            $table->boolean('irsos')->nullable();
            $table->boolean('irsos_cad')->nullable();
            $table->boolean('irsos_edt')->nullable();
            $table->boolean('irsos_del')->nullable();

            $table->boolean('materiais')->nullable();
            $table->boolean('materiais_cad')->nullable();
            $table->boolean('materiais_edt')->nullable();
            $table->boolean('materiais_del')->nullable();

            $table->boolean('materiais_emprestimos')->nullable();
            $table->boolean('materiais_emprestimos_cad')->nullable();
            $table->boolean('materiais_emprestimos_edt')->nullable();
            $table->boolean('materiais_emprestimos_del')->nullable();

            $table->boolean('publicacoes')->nullable();
            $table->boolean('publicacoes_cad')->nullable();
            $table->boolean('publicacoes_edt')->nullable();
            $table->boolean('publicacoes_del')->nullable();

            $table->boolean('ocorrencias')->nullable();
            $table->boolean('ocorrencias_cad')->nullable();
            $table->boolean('ocorrencias_edt')->nullable();
            $table->boolean('ocorrencias_del')->nullable();

            $table->boolean('usuarios')->nullable();
            $table->boolean('usuarios_cad')->nullable();
            $table->boolean('usuarios_edt')->nullable();
            $table->boolean('usuarios_del')->nullable();

            $table->boolean('veiculos')->nullable();
            $table->boolean('veiculos_cad')->nullable();
            $table->boolean('veiculos_edt')->nullable();
            $table->boolean('veiculos_del')->nullable();

            $table->boolean('veiculos_emprestimos')->nullable();
            $table->boolean('veiculos_emprestimos_cad')->nullable();
            $table->boolean('veiculos_emprestimos_edt')->nullable();
            $table->boolean('veiculos_emprestimos_del')->nullable();
            
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
        Schema::dropIfExists('perfis');
    }
}
