<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Models\Veiculo;
use App\Models\Log;

class VeiculosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        if($user->perfil->administrador){
             return Veiculo::orderBy('placa')->get();
        }else{ 
            return Veiculo::where('subunidade_id', $user->subunidade_id)->orderBy('placa')->get(); 
        }
        //return Veiculo::orderBy('placa')->get();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index2()
    {
        $user = Auth::user();
        if($user->perfil->administrador){
             return Veiculo::whereNull('data_baixa')->orderBy('placa')->get();
        }else{ 
            return Veiculo::whereNull('data_baixa')->where('subunidade_id', $user->subunidade_id)->orderBy('placa')->get(); 
        }
        //return Veiculo::orderBy('placa')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        $user = Auth::user();
        $data = new Veiculo;

        $data->subunidade_id = $request->subunidade_id;
        $data->marca_id = $request->marca_id;
        $data->modelo_id = $request->modelo_id;
        $data->cor_id = $request->cor_id;

        $data->placa = $request->placa;
        $data->placa_esp = $request->placa_esp;
        $data->chassi = $request->chassi;
        $data->renavam = $request->renavam;
        $data->ano = $request->ano;
        $data->tipo_id = $request->tipo_id;

        $data->km_inicial = $request->km_inicial;
        $data->km_atual = $request->km_inicial;
        $data->troca_oleo = $request->troca_oleo;

        $data->data_baixa = $request->data_baixa;

        $data->observacoes = $request->observacoes;

        $data->subunidade_id = $user->subunidade_id;  
        $data->created_by = Auth::id();       

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Cadastrou um Veiculo';
            $log->table = 'veiculos';
            $log->action = 1;
            $log->fk = $data->id;
            $log->object = $data;
            $log->save();
            return 1;
        }else{
            return 2;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Veiculo::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = Veiculo::find($id);
        $dataold = $data;
        
        $data->marca_id = $request->marca_id;
        $data->modelo_id = $request->modelo_id;
        $data->cor_id = $request->cor_id;

        $data->placa = $request->placa;
        $data->placa_esp = $request->placa_esp;
        $data->chassi = $request->chassi;
        $data->renavam = $request->renavam;
        $data->ano = $request->ano;
        $data->tipo_id = $request->tipo_id;

        $data->km_inicial = $request->km_inicial;
        $data->troca_oleo = $request->troca_oleo;

        $data->data_baixa = $request->data_baixa;

        $data->observacoes = $request->observacoes;

        $data->updated_by = Auth::id();

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Editou um Veiculo';
            $log->table = 'veiculos';
            $log->action = 2;
            $log->fk = $data->id;
            $log->object = $data;
            $log->object_old = $dataold;
            $log->save();
            return 1;
        }else{
            return 2;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Veiculo::find($id);
         
         if($data->delete()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Excluiu um Veiculo';
            $log->table = 'veiculos';
            $log->action = 3;
            $log->fk = $data->id;
            $log->object = $data;
            $log->save();
            return 1;
          }else{
            return 2;
          }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function trocaoleo(Request $request)
    {
        $data = Veiculo::find($request->id);
        $dataold = $data;
        $data->troca_oleo = $request->troca_oleo;
         
         if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Editou um Veiculo';
            $log->table = 'veiculos';
            $log->action = 2;
            $log->fk = $data->id;
            $log->object = $data;
            $log->object_old = $dataold;
            $log->save();
            return 1;
          }else{
            return 2;
          }
    }
}
