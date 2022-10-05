<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Models\EscalaUser;
use App\Models\UserAfastamento;
use App\Models\Log;
use Carbon\Carbon;

class EscalasUsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return EscalaUser::orderBy('id', 'desc')->get();
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
        $data = new EscalaUser;

        $escala = $request[0];
        $modalidade = $request[1];
        $posto = $request[2];
        $turno = $request[3];
        foreach ($request[4] as $key => $value) {
             $data = new EscalaUser;

            $data->escala_id = $escala;
            $data->modalidade_id = $modalidade;
            $data->posto_id = $posto;
            $data->turno_id = $turno;
            $data->user_id = $value['id'];     

            $data->created_by = Auth::id();      

            if($data->save()){
                $log = new Log;
                $log->user_id = Auth::id();
                $log->mensagem = 'Cadastrou um usuario na escala';
                $log->table = 'escalas_users';
                $log->action = 1;
                $log->fk = $data->id;
                $log->object = $data;
                $log->save();               
            }
        }
        return 1;

        /*
        $data->escala_id = $request->escala_id;
        $data->escala_posto_id = $request->escala_posto_id;    
        $data->user_id = $request->user_id;    
        $data->atrasado = $request->atrasado;    
        $data->ausente = $request->ausente;    
        $data->atestado = $request->atestado;        

        $data->created_by = Auth::id();      

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Cadastrou um usuário na escala';
            $log->table = 'escalas_users';
            $log->action = 1;
            $log->fk = $data->id;
            $log->object = $data;
            $log->save();
            return 1;
        }else{
            return 2;
        }*/


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return EscalaUser::find($id);
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
        $data = EscalaUser::find($id);
        $dataold = $data;

        $data->escala_id = $request->escala_id;
        $data->escala_posto_id = $request->escala_posto_id;    
        $data->user_id = $request->user_id;    
        $data->atrasado = $request->atrasado;    
        $data->ausente = $request->ausente;    
        $data->atestado = $request->atestado;          

        $data->updated_by = Auth::id();

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Editou um usuario da escala';
            $log->table = 'escalas_users';
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
        $data = EscalaUser::find($id);
         
         if($data->delete()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Excluiu um usuario da escala';
            $log->table = 'escalas_users';
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
    public function falta(Request $request)
    {
        $user = Auth::user();
        $data = EscalaUser::find($request->id);

        if($request->opcao == 1){
            $data->ausente = 1;
        }else if($request->opcao == 2){
            $data->atrasado = 1;
        }else if($request->opcao == 3){
            $data->atestado = 1;
        }else if($request->opcao == 4){
            $data->dispensado = 1;
        }
         
         if($data->save()){
            if($request->opcao == 3){
                $data2 = new UserAfastamento;

                $data2->afastamento_tipo_id = $request->afastamento_tipo_id;      
                $data2->user_id = $request->user_id;      
                //$data->descricao = $request->descricao;     
                $data2->data = $request->data;       
                $data2->dias = $request->dias; 
                $data2->cid = $request->cid;   

                $date = Carbon::createFromFormat('Y-m-d', $request->data);
                $data2->data_fim = Carbon::parse($date->addDays($request->dias-1))->format('Y-m-d');
                $data2->apto = $date->addDays(1);      
             
                $data2->subunidade_id = $user->subunidade_id;  
                $data2->created_by = Auth::id();
                $data2->save();
            }
            

            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Editou um usuario da escala';
            $log->table = 'escalas_users';
            $log->action = 2;
            $log->fk = $data->id;
            $log->object = $data;
            $log->save();
            return 1;
          }else{
            return 2;
          }
    }
}
