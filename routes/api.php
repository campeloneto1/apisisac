<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdministracaoController;
use App\Http\Controllers\ArmamentosController;
use App\Http\Controllers\ArmamentosTiposController;
use App\Http\Controllers\AfastamentosTiposController;
use App\Http\Controllers\CidadesController;
use App\Http\Controllers\CoresController;
use App\Http\Controllers\DocumentosController;
use App\Http\Controllers\DocumentosTiposController;
use App\Http\Controllers\EscalasController;
use App\Http\Controllers\EscalasDispensasController;
use App\Http\Controllers\EscalasModalidadesController;
use App\Http\Controllers\EscalasModelosController;
use App\Http\Controllers\EscalasOcorrenciasController;
use App\Http\Controllers\EscalasPostosController;
use App\Http\Controllers\EscalasUsersController;
use App\Http\Controllers\EstadosController;
use App\Http\Controllers\GraduacoesController;
use App\Http\Controllers\InicioController;
use App\Http\Controllers\IrsosController;
use App\Http\Controllers\IrsosFinanceirosController;
use App\Http\Controllers\IrsosUsersController;
use App\Http\Controllers\LogsController;
use App\Http\Controllers\MarcasController;
use App\Http\Controllers\MateriaisController;
use App\Http\Controllers\MateriaisEmprestimosController;
use App\Http\Controllers\MateriaisTiposController;
use App\Http\Controllers\ModalidadesController;
use App\Http\Controllers\ModalidadesPostosController;
use App\Http\Controllers\ModelosController;
use App\Http\Controllers\OcorrenciasController;
use App\Http\Controllers\PaisesController;
use App\Http\Controllers\PatrimoniosController;
use App\Http\Controllers\PatrimoniosTiposController;
use App\Http\Controllers\PerfisController;
use App\Http\Controllers\PostosController;
use App\Http\Controllers\PostosTurnosController;
use App\Http\Controllers\RelatoriosController;
use App\Http\Controllers\SetoresController;
use App\Http\Controllers\SubunidadesController;
use App\Http\Controllers\TiposPublicacoesController;
use App\Http\Controllers\TurnosController;
use App\Http\Controllers\UnidadesController;
use App\Http\Controllers\UsuariosController;
use App\Http\Controllers\UsuariosFeriasController;
use App\Http\Controllers\UsuariosPromocoesController;
use App\Http\Controllers\UsuariosPublicacoesController;
use App\Http\Controllers\UsuariosAfastamentosController;
use App\Http\Controllers\UsuariosArmamentosController;
use App\Http\Controllers\VeiculosController;
use App\Http\Controllers\VeiculosEmprestimosController;
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

Route::group(['middleware' => ['guest:api', 'middleware' => 'throttle:5,1']], function() {
    Route::post('/login', [AuthController::class, 'login']);     

    Route::get('validar-documento/{id}', [DocumentosController::class, 'validar']);
    Route::get('validar-emparmamento/{id}', [UsuariosArmamentosController::class, 'validar']);
    Route::get('validar-empmaterial/{id}', [MateriaisEmprestimosController::class, 'validar']);
    Route::get('validar-empveiculo/{id}', [VeiculosEmprestimosController::class, 'validar']);
    Route::get('validar-ocorrencia/{id}', [EscalasOcorrenciasController::class, 'validar']);
    Route::get('validar-ferias/{id}', [UsuariosFeriasController::class, 'validar']);
});

 Route::group(['middleware' => ['auth:api']], function() {
    Route::get('/logout', [AuthController::class, 'logout']); 
    Route::get('/check', [AuthController::class, 'check']); 

    Route::resource('administracao', AdministracaoController::class);
    Route::resource('armamentos', ArmamentosController::class);
    Route::resource('armamentos-tipos', ArmamentosTiposController::class);
    Route::resource('afastamentos-tipos', AfastamentosTiposController::class);
    Route::resource('cidades', CidadesController::class);
    Route::resource('cores', CoresController::class);
    Route::resource('documentos', DocumentosController::class);
    Route::resource('documentos-tipos', DocumentosTiposController::class);  
    Route::resource('escalas', EscalasController::class);
    Route::resource('escalas-dispensas', EscalasDispensasController::class);
    Route::resource('escalas-modalidades', EscalasModalidadesController::class);
    Route::resource('escalas-modelos', EscalasModelosController::class);
    Route::resource('escalas-ocorrencias', EscalasOcorrenciasController::class);
    Route::resource('escalas-postos', EscalasPostosController::class);
    Route::resource('escalas-users', EscalasUsersController::class);
    Route::resource('estados', EstadosController::class);
    Route::resource('graduacoes', GraduacoesController::class);
    Route::resource('irsos', IrsosController::class);
    Route::resource('irsos-financeiros', IrsosFinanceirosController::class);
    Route::resource('irsos-users', IrsosUsersController::class);
    Route::resource('logs', LogsController::class);
    Route::resource('marcas', MarcasController::class);
    Route::resource('materiais', MateriaisController::class);
    Route::resource('materiais-emprestimos', MateriaisEmprestimosController::class);
    Route::resource('materiais-tipos', MateriaisTiposController::class);
    Route::resource('modalidades', ModalidadesController::class);
    Route::resource('modalidades-postos', ModalidadesPostosController::class);
    Route::resource('modelos', ModelosController::class);
    Route::resource('ocorrencias', OcorrenciasController::class);
    Route::resource('paises', PaisesController::class);
    Route::resource('patrimonios', PatrimoniosController::class);
    Route::resource('patrimonios-tipos', PatrimoniosTiposController::class);
    Route::resource('perfis', PerfisController::class);
    Route::resource('postos', PostosController::class);
    Route::resource('postos-turnos', PostosTurnosController::class);
    Route::resource('tipos-publicacoes', TiposPublicacoesController::class);
    Route::resource('setores', SetoresController::class);
    Route::resource('subunidades', SubunidadesController::class);
    Route::resource('turnos', TurnosController::class);
    Route::resource('unidades', UnidadesController::class);
    Route::resource('usuarios', UsuariosController::class);
    Route::resource('usuarios-ferias', UsuariosFeriasController::class);
    Route::resource('usuarios-promocoes', UsuariosPromocoesController::class);
    Route::resource('usuarios-publicacoes', UsuariosPublicacoesController::class);
    Route::resource('usuarios-afastamentos', UsuariosAfastamentosController::class);
    Route::resource('usuarios-armamentos', UsuariosArmamentosController::class);
    Route::resource('veiculos', VeiculosController::class);
    Route::resource('veiculos-emprestimos', VeiculosEmprestimosController::class);

    Route::get('armamentos-reparar/{id}', [ArmamentosController::class, 'reparar']);
    Route::post('usuarios-armamentos-receber', [UsuariosArmamentosController::class, 'receber']);
    Route::get('cidades/{id}/where', [CidadesController::class, 'where']);
    Route::post('escalas-users-falta', [EscalasUsersController::class, 'falta']);
    Route::get('estados/{id}/where', [EstadosController::class, 'where']);
    Route::post('irsos-where', [IrsosController::class, 'where']);
    Route::get('irsos-financeiros-mes/{id}', [IrsosFinanceirosController::class,'gastomensal']);
    Route::get('marcas/{id}/where', [MarcasController::class, 'where']); 
    Route::get('materiais-reparar/{id}', [MateriaisController::class, 'reparar']);
    Route::post('materiais-emprestimos-receber', [MateriaisEmprestimosController::class, 'receber']);
    Route::get('modelos/{id}/where', [ModelosController::class, 'where']); 
    Route::get('setores/{id}/where', [SetoresController::class, 'where']);    
    Route::get('setores/{id}/where2', [SetoresController::class, 'where2']);  
    Route::get('subunidades/{id}/where', [SubunidadesController::class, 'where']);  
    Route::get('usuarios-afastamentos-ativos', [UsuariosAfastamentosController::class,'ativos']);
    Route::get('usuarios-ferias-ativos', [UsuariosFeriasController::class,'ativos']);
    Route::post('usuarios-foto', [UsuariosController::class,'foto']);
    Route::post('usuarios-changepass', [UsuariosController::class,'change_password']);
    Route::get('usuarios-resetpass/{id}', [UsuariosController::class,'reset_password']);
    Route::post('veiculos-emprestimos-receber', [VeiculosEmprestimosController::class, 'receber']);
    Route::post('veiculos-trocaoleo', [VeiculosController::class, 'trocaoleo']);

    Route::get('armamentos2', [ArmamentosController::class, 'index2']);
    Route::get('escalas2', [EscalasController::class, 'index2']);
    Route::get('materiais2', [MateriaisController::class, 'index2']);
    Route::get('usuarios2', [UsuariosController::class, 'index2']);
    Route::get('veiculos2', [VeiculosController::class, 'index2']);

    Route::get('inicio-escaladia', [InicioController::class, 'getEscalaDia']);
    Route::get('inicio-quantafast', [InicioController::class, 'getQuantAfastamentos']);
    Route::get('inicio-quantferias', [InicioController::class, 'getQuantFerias']);
    Route::get('inicio-quantpms', [InicioController::class, 'getQuantPm']);
    Route::get('inicio-quantveiculos', [InicioController::class, 'getQuantVeiculos']);
    Route::get('inicio-setores', [InicioController::class, 'getSetores']);
    Route::get('inicio-graduacoes', [InicioController::class, 'getGraduacoes']);
    Route::get('inicio-veiculos-emprestimos', [InicioController::class, 'getVeiculosEmprestimos']);
    Route::get('inicio-materiais-emprestimos', [InicioController::class, 'getMateriaisEmprestimos']);
    Route::get('inicio-trocaoleo', [InicioController::class, 'getTrocaOleo']);
    Route::get('inicio-armamentos-vencimentos', [InicioController::class, 'getArmVencimentos']);
    Route::get('inicio-materiais-vencimentos', [InicioController::class, 'getMatVencimentos']);

    Route::post('relatorios-emparmamentos', [RelatoriosController::class, 'getEmpArmamentos']);
    Route::post('relatorios-empmateriais', [RelatoriosController::class, 'getEmpMateriais']);
    Route::post('relatorios-empveiculos', [RelatoriosController::class, 'getEmpVeiculos']);
    Route::post('relatorios-promocoes', [RelatoriosController::class, 'getPromocoes']);


    Route::get('search/{id}', [InicioController::class, 'search']);
});