<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Models\UserAfastamento;
use App\Models\Log;
use Carbon\Carbon;

class UsuariosAfastamentosController extends Controller
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
            return UserAfastamento::with('user')->orderBy('id', 'desc')->get();
        }else{  
            return UserAfastamento::with('user')->where('subunidade_id', $user->subunidade_id)->orderBy('id', 'desc')->get();
        }
        
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
        $data = new UserAfastamento;

         $data->afastamento_tipo_id = $request->afastamento_tipo_id;      
         $data->user_id = $request->user_id;      
        //$data->descricao = $request->descricao;   
        $data->cid = $request->cid;     
        $data->hospital = $request->hospital;     
        $data->data = $request->data;       
        $data->dias = $request->dias;   

        $date = Carbon::createFromFormat('Y-m-d', $request->data);
        $data->data_fim = Carbon::parse($date->addDays($request->dias-1))->format('Y-m-d');
        $data->apto = $date->addDays(1);

        $data->objeto_servico = $request->objeto_servico;       
     
        $data->subunidade_id = $user->subunidade_id;  
        $data->created_by = Auth::id();      

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Cadastrou um afastamento';
            $log->table = 'users_afastamentos';
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
        return UserAfastamento::with('user')->find($id);
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
        $data = UserAfastamento::find($id);
        $dataold = $data;

        $data->afastamento_tipo_id = $request->afastamento_tipo_id;      
        $data->user_id = $request->user_id;      
        //$data->descricao = $request->descricao;   
        $data->cid = $request->cid;     
        $data->hospital = $request->hospital;     
        $data->data = $request->data;       
        $data->dias = $request->dias; 

        $date = Carbon::createFromFormat('Y-m-d', $request->data);
        //return $date->addDays($request->dias);
        $data->data_fim = Carbon::parse($date->addDays($request->dias-1))->format('Y-m-d');
        $data->apto = $date->addDays(1);
   
        $data->copem = $request->copem;
        $data->resultado = $request->resultado;

        $data->objeto_servico = $request->objeto_servico;  

        $data->updated_by = Auth::id();

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Editou um afastamento';
            $log->table = 'users_afastamentos';
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
        $data = UserAfastamento::find($id);
         
         if($data->delete()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Excluiu um afastamento';
            $log->table = 'users_afastamentos';
            $log->action = 3;
            $log->fk = $data->id;
            $log->object = $data;
            $log->save();
            return 1;
          }else{
            return 2;
          }
    }
}
