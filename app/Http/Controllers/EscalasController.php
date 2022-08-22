<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Models\Escala;
use App\Models\Log;

class EscalasController extends Controller
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
             return Escala::orderBy('id', 'desc')->get();
        }else{ 
            return Escala::where('subunidade_id', $user->subunidade_id)->orderBy('id', 'desc')->get();
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
        $data = new Escala;

        //$data->subunidade_id = $request->subunidade_id;
        $data->escala_modelo_id = $request->escala_modelo_id;  
        $data->data = $request->data;  
        $data->codigo = $request->codigo;              

        $data->subunidade_id = $user->subunidade_id;         
        $data->created_by = Auth::id();      

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Cadastrou uma escala';
            $log->table = 'escalas';
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
        return Escala::find($id);
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
        $data = Escala::find($id);
        $dataold = $data;

        //$data->subunidade_id = $request->subunidade_id;
        $data->escala_modelo_id = $request->escala_modelo_id;  
        $data->data = $request->data;  
        $data->codigo = $request->codigo;                  

        $data->updated_by = Auth::id();

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Editou uma escala';
            $log->table = 'escalas';
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
        $data = Escala::find($id);
         
         if($data->delete()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Excluiu uma escala';
            $log->table = 'escalas';
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
