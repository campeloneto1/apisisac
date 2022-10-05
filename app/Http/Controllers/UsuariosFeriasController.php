<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Models\UserFerias;
use App\Models\Log;
use Carbon\Carbon;


class UsuariosFeriasController extends Controller
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
            return UserFerias::orderBy('id', 'desc')->get();
        }else{  
            return UserFerias::where('subunidade_id', $user->subunidade_id)->orderBy('id', 'desc')->get();
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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function ativos()
    {
        $datahj = Carbon::now();
        $user = Auth::user();
        if($user->perfil->administrador){
            return UserFerias::where('data_ini', '<=', $datahj->format('Y-m-d'))->where('data_fim', '>=', $datahj->format('Y-m-d'))->orderBy('id', 'desc')->get();
        }else{  
            return UserFerias::where('data_ini', '<=', $datahj->format('Y-m-d'))->where('data_fim', '>=', $datahj->format('Y-m-d'))->where('subunidade_id', $user->subunidade_id)->orderBy('id', 'desc')->get();
        }
        
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
        $data = new UserFerias;

         $data->user_id = $request->user_id;      
         $data->boletim = $request->boletim;   
         $data->ano = $request->ano;      
        $data->data_ini = $request->data_ini;  
        $data->dias = $request->dias;     

        $date = Carbon::createFromFormat('Y-m-d', $request->data_ini);
        $data->data_fim = Carbon::parse($date->addDays($request->dias-1))->format('Y-m-d');
        $data->apto = $date->addDays(1);   

        $data->key = hash("sha512",$user->subunidade_id.$request->user_id.$request->boletim.$request->ano.$request->data_ini.$request->dias);      
     
        $data->subunidade_id = $user->subunidade_id;  
        $data->created_by = Auth::id();      

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Cadastrou uma ferias';
            $log->table = 'users_ferias';
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
        return UserFerias::find($id);
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
        $data = UserFerias::find($id);        
        $dataold = $data;

        $data->user_id = $request->user_id;      
         $data->boletim = $request->boletim;   
         $data->ano = $request->ano;      
        $data->data_ini = $request->data_ini;  
        $data->dias = $request->dias; 

        $date = Carbon::createFromFormat('Y-m-d', $request->data_ini);
        $data->data_fim = Carbon::parse($date->addDays($request->dias-1))->format('Y-m-d');
        $data->apto = $date->addDays(1);  

        $data->updated_by = Auth::id();

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Editou uma ferias';
            $log->table = 'users_ferias';
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
        $data = UserFerias::find($id);
         
         if($data->delete()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Excluiu uma Ferias';
            $log->table = 'users_ferias';
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
        
        return UserFerias::where('key', addslashes($id))->get(); 
        
    }
}
