<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Models\VeiculoEmprestimo;
use App\Models\Veiculo;
use App\Models\Log;
use Carbon\Carbon;

class VeiculosEmprestimosController extends Controller
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
             return VeiculoEmprestimo::orderBy('id', 'DESC')->get();
        }else{ 
            return VeiculoEmprestimo::where('subunidade_id', $user->subunidade_id)->orderBy('id', 'DESC')->get(); 
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
        $hoje = Carbon::now();
        $user = Auth::user();
        $data = new VeiculoEmprestimo;
        
        $data->veiculo_id = $request->veiculo_id;
        $data->user_id = $request->user_id;

        $data->data_saida = $hoje->format('Y-m-d');
        $data->hora_saida = $hoje->format('H:i:s');
        $data->km_inicial = $request->km_inicial;
        $data->observacoes = $request->observacoes;

        $data->key = hash("sha512",$user->subunidade_id.$request->veiculo_id.$request->user_id.$hoje->format('Y-m-d').$hoje->format('H:i:s'));
        
        $data->subunidade_id = $user->subunidade_id;  
        $data->created_by = Auth::id();       

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Cadastrou um Emprestimo';
            $log->table = 'veiculos_emprestimos';
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
        return VeiculoEmprestimo::find($id);
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
        $data = VeiculoEmprestimo::find($id);
        $dataold = $data;

        $data->veiculo_id = $request->veiculo_id;
        $data->user_id = $request->user_id;

        $data->data_saida = $request->data_saida;
        $data->hora_saida = $request->hora_saida;
        $data->km_inicial = $request->km_inicial;
        $data->observacoes = $request->observacoes;            

        $data->updated_by = Auth::id();

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Editou um Emprestimo';
            $log->table = 'veiculos_emprestimos';
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function receber(Request $request)
    {   
        $hoje = Carbon::now();
        $user = Auth::user();
        $data = VeiculoEmprestimo::find($request->id);

        

        $data->data_chegada = $hoje->format('Y-m-d');
        $data->hora_chegada = $hoje->format('H:i:s');
        $data->km_final = $request->km_final;
        $data->observacoes = $request->observacoes;
        
        $data->updated_by = Auth::id();    

        if($data->save()){
            $data2 = Veiculo::find($request->veiculo_id);
            $data2->km_atual = $request->km_final;
            $data2->save();
            
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Editou um Emprestimo';
            $log->table = 'veiculos_emprestimos';
            $log->action = 2;
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
    public function destroy($id)
    {
        $data = VeiculoEmprestimo::find($id);
         
         if($data->delete()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Excluiu um Emprestimo';
            $log->table = 'veiculos_emprestimos';
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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function validar($id)
    {
        
        return VeiculoEmprestimo::where('key', addslashes($id))->get(); 
        
    }
}
