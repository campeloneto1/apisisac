<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Models\Administracao;
use App\Models\Log;

class AdministracaoController extends Controller
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
             return Administracao::orderBy('subunidade_id')->get();
        }else{ 
            return Administracao::where('subunidade_id', $user->subunidade_id)->orderBy('subunidade_id')->get(); 
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
        $data = new Administracao;

        $data->valor_irso_sd = $request->valor_irso_sd;     
        $data->valor_irso_cb = $request->valor_irso_cb;   
        $data->valor_irso_3sgt = $request->valor_irso_3sgt;      
        $data->valor_irso_2sgt = $request->valor_irso_2sgt;   
        $data->valor_irso_1sgt = $request->valor_irso_1sgt;   
        $data->valor_irso_st = $request->valor_irso_st;   
        $data->valor_irso_2ten = $request->valor_irso_2ten;   
        $data->valor_irso_1ten = $request->valor_irso_1ten;   
        $data->valor_irso_cap = $request->valor_irso_cap;   
        $data->valor_irso_maj = $request->valor_irso_maj;   
        $data->valor_irso_tencel = $request->valor_irso_tencel;   
        $data->valor_irso_cel = $request->valor_irso_cel;  

        $data->observacoes_escala = $request->observacoes_escala;   


        $data->created_by = Auth::id();      

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Cadastrou um pais';
            $log->table = 'paises';
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
        return Administracao::find($id);
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
        $data = Administracao::find($id);
        $dataold = $data;

        $data->valor_irso_sd = $request->valor_irso_sd;     
        $data->valor_irso_cb = $request->valor_irso_cb;   
        $data->valor_irso_3sgt = $request->valor_irso_3sgt;      
        $data->valor_irso_2sgt = $request->valor_irso_2sgt;   
        $data->valor_irso_1sgt = $request->valor_irso_1sgt;   
        $data->valor_irso_st = $request->valor_irso_st;   
        $data->valor_irso_2ten = $request->valor_irso_2ten;   
        $data->valor_irso_1ten = $request->valor_irso_1ten;   
        $data->valor_irso_cap = $request->valor_irso_cap;   
        $data->valor_irso_maj = $request->valor_irso_maj;   
        $data->valor_irso_tencel = $request->valor_irso_tencel;   
        $data->valor_irso_cel = $request->valor_irso_cel;  

        $data->observacoes_escala = $request->observacoes_escala;  
         
        $data->updated_by = Auth::id();

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Editou um pais';
            $log->table = 'paises';
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
        $data = Administracao::find($id);
         
         if($data->delete()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Excluiu um pais';
            $log->table = 'paises';
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
