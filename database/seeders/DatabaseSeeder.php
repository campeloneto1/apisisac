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
            ArmamentosTiposSeeder::class
            
        ]);
       
    }
}
