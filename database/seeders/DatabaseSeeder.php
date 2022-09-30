<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /** php artisan migrate:fresh --seed
     * php artisan passport:install
     * php artisan key:generate
     * Seed the application's database.

     UPDATE `perfis` SET `administrador`= 1,`gestor`= 1,`oficial_dia`= 1,`afastamentos`= 1,`afastamentos_cad`= 1,`afastamentos_edt`= 1,`afastamentos_del`= 1,`armamentos`= 1,`armamentos_cad`= 1,`armamentos_edt`= 1,`armamentos_del`= 1,`armamentos_emprestimos`= 1,`armamentos_emprestimos_cad`= 1,`armamentos_emprestimos_edt`= 1,`armamentos_emprestimos_del`= 1,`documentos`= 1,`documentos_cad`= 1,`documentos_edt`= 1,`documentos_del`= 1,`escalas`= 1,`escalas_cad`= 1,`escalas_edt`= 1,`escalas_del`= 1,`irsos`= 1,`irsos_cad`= 1,`irsos_edt`= 1,`irsos_del`= 1,`materiais`= 1,`materiais_cad`= 1,`materiais_edt`= 1,`materiais_del`= 1,`materiais_emprestimos`= 1,`materiais_emprestimos_cad`= 1,`materiais_emprestimos_edt`= 1,`materiais_emprestimos_del`= 1,`publicacoes`= 1,`publicacoes_cad`= 1,`publicacoes_edt`= 1,`publicacoes_del`= 1,`ocorrencias`= 1,`ocorrencias_cad`= 1,`ocorrencias_edt`= 1,`ocorrencias_del`= 1,`usuarios`= 1,`usuarios_cad`= 1,`usuarios_edt`= 1,`usuarios_del`= 1,`veiculos`= 1,`veiculos_cad`= 1,`veiculos_edt`= 1,`veiculos_del`= 1,`veiculos_emprestimos`= 1,`veiculos_emprestimos_cad`= 1,`veiculos_emprestimos_edt`= 1,`veiculos_emprestimos_del`= 1 WHERE id = 1
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        
        $this->call([
            
            AfastamentosTiposSeeder::class,
            GraduacoesSeeder::class,
            PerfisSeeder::class,
            PostosSeeder::class,
            PaisesSeeder::class,
            CoresSeeder::class,          
            TiposPublicacoesSeeder::class,
            
            TiposDocumentosSeeder::class,
            TurnosSeeder::class,
            UnidadesSeeder::class,
            SubunidadesSeeder::class,
            UsuariosSeeder::class,
            SetoresSeeder::class,
            ModalidadesSeeder::class, 

            MarcasSeeder::class, 
            ModelosSeeder::class, 
            ArmamentosTiposSeeder::class,

            PostosTurnosSeeder::class,
            ModalidadesPostosSeeder::class,
            EscalasModelosSeeder::class,
            EscalasModalidadesSeeder::class,
            OcorrenciasTiposSeeder::class,

            MateriaisTiposSeeder::class,
        ]);
       
    }
}
