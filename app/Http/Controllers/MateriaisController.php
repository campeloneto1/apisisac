<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Models\Material;
use App\Models\Log;


class MateriaisController extends Controller
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
             return Material::orderBy('serial')->get();
        }else{ 
            return Material::where('subunidade_id', $user->subunidade_id)->orderBy('serial')->get(); 
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
             return Material::whereNull('data_baixa')->whereNull('danificado')->whereNull('extraviado')->orderBy('serial')->get();
        }else{ 
            return Material::whereNull('data_baixa')->whereNull('danificado')->whereNull('extraviado')->where('subunidade_id', $user->subunidade_id)->orderBy('serial')->get(); 
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
        $data = new Material;

        $data->serial = $request->serial;
        $data->material_tipo_id = $request->material_tipo_id;
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
            $log->mensagem = 'Cadastrou um material';
            $log->table = 'materiais';
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
        return Material::find($id);
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
        $data = Material::find($id);
        $dataold = $data;

        $data->serial = $request->serial;
        $data->material_tipo_id = $request->material_tipo_id;
        $data->marca_id = $request->marca_id;
        $data->modelo_id = $request->modelo_id;
        $data->data_venc = $request->data_venc;
        $data->data_baixa = $request->data_baixa;
        $data->observacoes = $request->observacoes;

        $data->updated_by = Auth::id();

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Editou um material';
            $log->table = 'materiais';
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
        $data = Material::find($id);
         
         if($data->delete()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Excluiu um material';
            $log->table = 'materiais';
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
        $data = Material::find($id);
        $dataold = $data;

        $data->danificado = null;
 
        $data->updated_by = Auth::id();

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Reparou um material';
            $log->table = 'materiais';
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
