<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call([
            GraduacoesSeeder::class,
            PerfisSeeder::class,
            PostosSeeder::class,
            GraduacoesSeeder::class,
            SetoresSeeder::class,
            
            TiposDocumentosSeeder::class,
            TurnosSeeder::class,
            UnidadesSeeder::class,
            UsuariosSeeder::class,
            SubunidadesSeeder::class
        ]);
    }
}
