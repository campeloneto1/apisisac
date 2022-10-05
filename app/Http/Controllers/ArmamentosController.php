<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Models\Armamento;
use App\Models\Log;


class ArmamentosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //return Armamento::orderBy('serial')->get();

        $user = Auth::user();
        if($user->perfil->administrador){
             return Armamento::orderBy('serial')->get();
        }else{ 
            return Armamento::where('subunidade_id', $user->subunidade_id)->orderBy('serial')->get(); 
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index2()
    {
        //return Armamento::orderBy('serial')->get();

        $user = Auth::user();
        if($user->perfil->administrador){
             return Armamento::whereNull('data_baixa')->whereNull('danificado')->whereNull('extraviado')->orderBy('serial')->get();
        }else{ 
            return Armamento::whereNull('data_baixa')->whereNull('danificado')->whereNull('extraviado')->where('subunidade_id', $user->subunidade_id)->orderBy('serial')->get(); 
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
        $data = new Armamento;

        $data->serial = $request->serial;
        $data->armamento_tipo_id = $request->armamento_tipo_id;
        $data->marca_id = $request->marca_id;
        $data->modelo_id = $request->modelo_id;
        $data->data_venc = $request->data_venc;

        $data->data_baixa = $request->data_baixa;

        $data->observacoes = $request->observacoes;

        $data->subunidade_id = $user->subunidade_id;  
        $data->created_by = Auth::id();      

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Cadastrou um armamento';
            $log->table = 'armamentos';
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
        return Armamento::find($id);
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
        $user = Auth::user();
        $data = Armamento::find($id);
        $dataold = $data;

        $data->serial = $request->serial;
        $data->armamento_tipo_id = $request->armamento_tipo_id;
        $data->marca_id = $request->marca_id;
        $data->modelo_id = $request->modelo_id;
        $data->data_venc = $request->data_venc;

        $data->data_baixa = $request->data_baixa;

        $data->observacoes = $request->observacoes;
 
        $data->updated_by = Auth::id();

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Editou um armamento';
            $log->table = 'armamentos';
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
        $data = Armamento::find($id);
         
         if($data->delete()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Excluiu um armamento';
            $log->table = 'armamentos';
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function reparar($id)
    {
        $user = Auth::user();
        $data = Armamento::find($id);
        $dataold = $data;

        $data->danificado = null;
 
        $data->updated_by = Auth::id();

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Reparou um armamento';
            $log->table = 'armamentos';
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
