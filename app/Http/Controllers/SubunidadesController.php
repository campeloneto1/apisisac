<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Models\Subunidade;
use App\Models\Log;

class SubunidadesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Subunidade::with(['comandante', 'subcomandante'])->orderBy('nome')->get();
    }

    /**
     * Return the citys with where condition.
     *
     * @return \Illuminate\Http\Response
     */
    public function where($id)
    {
        return Subunidade::where('unidade_id', $id)->orderBy('nome')->get();
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
        $data = new Subunidade;

        $data->nome = $request->nome;
        $data->unidade_id = $request->unidade_id;        
        $data->abreviatura = $request->abreviatura;        
        $data->email = $request->email;        
        $data->telefone1 = $request->telefone1;        
        $data->telefone2 = $request->telefone2;        
        $data->cep = $request->cep;        
        $data->rua = $request->rua;        
        $data->numero = $request->numero;        
        $data->bairro = $request->bairro;        
        $data->complemento = $request->complemento;        
        $data->cidade_id = $request->cidade_id;        
        $data->comandante_id = $request->comandante_id;        
        $data->subcomandante_id = $request->subcomandante_id;        

        $data->created_by = Auth::id();      

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Cadastrou uma subunidade';
            $log->table = 'subunidades';
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
        return Subunidade::with(['comandante', 'subcomandante'])->find($id);
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
        $data = Subunidade::find($id);
        $dataold = $data;

        $data->nome = $request->nome;
        $data->unidade_id = $request->unidade_id;        
        $data->abreviatura = $request->abreviatura;        
        $data->email = $request->email;        
        $data->telefone1 = $request->telefone1;        
        $data->telefone2 = $request->telefone2;   
        $data->cep = $request->cep;       
        $data->rua = $request->rua;        
        $data->numero = $request->numero;        
        $data->bairro = $request->bairro;        
        $data->complemento = $request->complemento;        
        $data->cidade_id = $request->cidade_id;        
        $data->comandante_id = $request->comandante_id;        
        $data->subcomandante_id = $request->subcomandante_id;       

        $data->updated_by = Auth::id();

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Editou uma subunidade';
            $log->table = 'subunidades';
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
        $data = Subunidade::find($id);
         
         if($data->delete()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Excluiu uma subunidade';
            $log->table = 'subunidades';
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
