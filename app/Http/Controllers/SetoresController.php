<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Models\Setor;
use App\Models\Log;


class SetoresController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Setor::orderBy('nome')->get();
    }

    /**
     * Return the citys with where condition.
     *
     * @return \Illuminate\Http\Response
     */
    public function where($id)
    {
        return Setor::where('subunidade_id', $id)->orderBy('nome')->get();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function where2($id)
    {
        return Setor::with('users')->where('escala', 1)->where('subunidade_id', $id)->orderBy('nome')->get();
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
        $data = new Setor;

        $data->nome = $request->nome;
        $data->subunidade_id = $request->subunidade_id;        
        $data->abreviatura = $request->abreviatura;        
        $data->email = $request->email;        
        $data->telefone1 = $request->telefone1;        
        $data->telefone2 = $request->telefone2;           
        $data->comandante_id = $request->comandante_id;        
        $data->subcomandante_id = $request->subcomandante_id;  

        $data->escala = $request->escala;      
        $data->final_semana = $request->final_semana;      

        $data->created_by = Auth::id();      

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Cadastrou um setor';
            $log->table = 'setores';
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
        return Setor::with('users')->find($id);
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
        $data = Setor::find($id);
        $dataold = $data;

        $data->nome = $request->nome;
        $data->subunidade_id = $request->subunidade_id;        
        $data->abreviatura = $request->abreviatura;        
        $data->email = $request->email;        
        $data->telefone1 = $request->telefone1;        
        $data->telefone2 = $request->telefone2;           
        $data->comandante_id = $request->comandante_id;        
        $data->subcomandante_id = $request->subcomandante_id;    

        $data->escala = $request->escala;        
        $data->final_semana = $request->final_semana;    

        $data->updated_by = Auth::id();

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Editou um setor';
            $log->table = 'setores';
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
        $data = Setor::find($id);
         
         if($data->delete()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Excluiu um setor';
            $log->table = 'setores';
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
