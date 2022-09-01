<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AfastamentosTiposController;
use App\Http\Controllers\CidadesController;
use App\Http\Controllers\DocumentosController;
use App\Http\Controllers\DocumentosTiposController;
use App\Http\Controllers\EscalasController;
use App\Http\Controllers\EscalasModalidadesController;
use App\Http\Controllers\EscalasModelosController;
use App\Http\Controllers\EscalasOcorrenciasController;
use App\Http\Controllers\EscalasPostosController;
use App\Http\Controllers\EscalasUsersController;
use App\Http\Controllers\EstadosController;
use App\Http\Controllers\GraduacoesController;
use App\Http\Controllers\InicioController;
use App\Http\Controllers\IrsosController;
use App\Http\Controllers\IrsosUsersController;
use App\Http\Controllers\LogsController;
use App\Http\Controllers\MarcasController;
use App\Http\Controllers\ModalidadesController;
use App\Http\Controllers\ModalidadesPostosController;
use App\Http\Controllers\ModelosController;
use App\Http\Controllers\OcorrenciasController;
use App\Http\Controllers\PaisesController;
use App\Http\Controllers\PerfisController;
use App\Http\Controllers\PostosController;
use App\Http\Controllers\PostosTurnosController;
use App\Http\Controllers\SetoresController;
use App\Http\Controllers\SubunidadesController;
use App\Http\Controllers\TiposPublicacoesController;
use App\Http\Controllers\TurnosController;
use App\Http\Controllers\UnidadesController;
use App\Http\Controllers\UsuariosController;
use App\Http\Controllers\UsuariosPublicacoesController;
use App\Http\Controllers\UsuariosAfastamentosController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::group(['middleware' => ['guest:api']], function() {
    Route::post('/login', [AuthController::class, 'login']);        
});

 Route::group(['middleware' => ['auth:api']], function() {
    Route::get('/logout', [AuthController::class, 'logout']); 
    Route::get('/check', [AuthController::class, 'check']); 

    Route::resource('afastamentos-tipos', AfastamentosTiposController::class);
    Route::resource('cidades', CidadesController::class);
    Route::resource('documentos', DocumentosController::class);
    Route::resource('documentos-tipos', DocumentosTiposController::class);
    Route::resource('escalas', EscalasController::class);
    Route::resource('escalas-modalidades', EscalasModalidadesController::class);
    Route::resource('escalas-modelos', EscalasModelosController::class);
    Route::resource('escalas-ocorrencias', EscalasOcorrenciasController::class);
    Route::resource('escalas-postos', EscalasPostosController::class);
    Route::resource('escalas-users', EscalasUsersController::class);
    Route::resource('estados', EstadosController::class);
    Route::resource('graduacoes', GraduacoesController::class);
    Route::resource('irsos', IrsosController::class);
    Route::resource('irsos-users', IrsosUsersController::class);
    Route::resource('logs', LogsController::class);
    Route::resource('marcas', MarcasController::class);
    Route::resource('modalidades', ModalidadesController::class);
    Route::resource('modalidades-postos', ModalidadesPostosController::class);
    Route::resource('modelos', ModelosController::class);
    Route::resource('ocorrencias', OcorrenciasController::class);
    Route::resource('paises', PaisesController::class);
    Route::resource('perfis', PerfisController::class);
    Route::resource('postos', PostosController::class);
    Route::resource('postos-turnos', PostosTurnosController::class);
    Route::resource('tipos-publicacoes', TiposPublicacoesController::class);
    Route::resource('setores', SetoresController::class);
    Route::resource('subunidades', SubunidadesController::class);
    Route::resource('turnos', TurnosController::class);
    Route::resource('unidades', UnidadesController::class);
    Route::resource('usuarios', UsuariosController::class);
    Route::resource('usuarios-publicacoes', UsuariosPublicacoesController::class);
    Route::resource('usuarios-afastamentos', UsuariosAfastamentosController::class);

    Route::get('estados/{id}/where', [EstadosController::class, 'where']);
    Route::get('cidades/{id}/where', [CidadesController::class, 'where']);
    Route::get('subunidades/{id}/where', [SubunidadesController::class, 'where']);
    Route::get('setores/{id}/where', [SetoresController::class, 'where']);    
    Route::get('setores/{id}/where2', [SetoresController::class, 'where2']);    

    Route::get('inicio-getpm', [InicioController::class, 'getPm']);
    Route::get('inicio-afast', [InicioController::class, 'getAfastamentos']);
    Route::get('inicio-setores', [InicioController::class, 'getSetores']);

});