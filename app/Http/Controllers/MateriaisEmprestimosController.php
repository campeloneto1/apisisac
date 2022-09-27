<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Models\MaterialEmprestimo;
use App\Models\Log;
use Carbon\Carbon;

class MateriaisEmprestimosController extends Controller
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
             return MaterialEmprestimo::orderBy('id', 'DESC')->get();
        }else{ 
            return MaterialEmprestimo::where('subunidade_id', $user->subunidade_id)->orderBy('id', 'DESC')->get(); 
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
        $data = new MaterialEmprestimo;
        
        $data->material_id = $request->material_id;
        $data->user_id = $request->user_id;

        $data->data_saida = $hoje->format('Y-m-d');
        $data->hora_saida = $hoje->format('H:i:s');
        $data->observacoes = $request->observacoes;
        
        $data->subunidade_id = $user->subunidade_id;  
        $data->created_by = Auth::id();       

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Cadastrou um Material';
            $log->table = 'materiais_emprestimos';
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
        return MaterialEmprestimo::find($id);
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
        $data = MaterialEmprestimo::find($id);
        $dataold = $data;

        $data->material_id = $request->material_id;
        $data->user_id = $request->user_id;

        $data->data_saida = $request->data_saida;
        $data->hora_saida = $request->hora_saida;
        $data->observacoes = $request->observacoes;            

        $data->updated_by = Auth::id();

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Editou um Material';
            $log->table = 'materiais_emprestimos';
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
        $data = MaterialEmprestimo::find($request->id);

        $data->data_chegada = $hoje->format('Y-m-d');
        $data->hora_chegada = $hoje->format('H:i:s');
        $data->observacoes = $request->observacoes;
        
        $data->updated_by = Auth::id();    

        if($data->save()){
            
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Editou um Material';
            $log->table = 'materiais_emprestimos';
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
        $data = MaterialEmprestimo::find($id);
         
         if($data->delete()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Excluiu um Material';
            $log->table = 'materiais_emprestimos';
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
