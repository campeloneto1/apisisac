<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Models\Armamento;
use App\Models\UserArmamento;
use App\Models\ArmamentoItem;
use App\Models\Log;
use Carbon\Carbon;

class UsuariosArmamentosController extends Controller
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
            return UserArmamento::orderBy('id', 'desc')->get();
        }else{  
            return UserArmamento::where('subunidade_id', $user->subunidade_id)->orderBy('id', 'desc')->get();
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
        $hoje = Carbon::now();
        $user = Auth::user();
        $data = new UserArmamento;

        //$data->armamento_id = $request->armamento_id;      
        $data->user_id = $request->user_id;      
        //$data_emp = Carbon::createFromFormat('Y-m-d', Carbon::now());  
        $data->data_emp = $hoje->format('Y-m-d'); 
        $data->hora_emp = $hoje->format('H:i:s');   
        //$data->quant = $request->quant;   

        $data->observacoes = $request->observacoes;   

        $data->key = hash("sha512",$user->subunidade_id.$request->armamento_id.$request->user_id.$hoje->format('Y-m-d').$hoje->format('H:i:s')); 
     
        $data->subunidade_id = $user->subunidade_id;  
        $data->created_by = Auth::id();      

        if($data->save()){

            foreach ($request->armamentos as $key => $value) {
                //return $value['id'];
                $data2 = new ArmamentoItem;

                $data2->user_armamento_id = $data->id;
                $data2->armamento_id = $value['id'];

                if(!empty($value['carregadores'])){
                    $data2->carregadores = $value['carregadores'];
                }

                if(!empty($value['quant'])){
                    $data2->quant = $value['quant'];
                }

                $data2->save();
            }

            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Cadastrou um armamento de um usuario';
            $log->table = 'users_armamentos';
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
        return UserArmamento::find($id);
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
        $hoje = Carbon::now();
        $data = UserArmamento::find($id);
        $dataold = $data;

        //$data->armamento_id = $request->armamento_id;      
        $data->user_id = $request->user_id;      
        //$data_emp = Carbon::createFromFormat('Y-m-d', Carbon::now());  
        //$data->quant = $request->quant;   

        $data->observacoes = $request->observacoes;  
        $data->updated_by = Auth::id();

        if($data->save()){
            

            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Editou um armamento de um usuario';
            $log->table = 'users_armamentos';
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
        $data = UserArmamento::find($id);
         
         if($data->delete()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Excluiu um armamento de um usuario';
            $log->table = 'users_armamentos';
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
    public function receber(Request $request)
    {
        $hoje = Carbon::now();
        $data = UserArmamento::find($request->id);
        $dataold = $data;

        //$data->armamento_id = $request->armamento_id;      
        //$data->user_id = $request->user_id;      
        //$data->quant = $request->quant;   
        $data->data_dev = $hoje->format('Y-m-d');
        $data->hora_dev = $hoje->format('H:i:s');    
        //$data->danificado = $request->danificado;  
        //$data->extraviado = $request->extraviado;  
        $data->observacoes = $request->observacoes;   
        $data->updated_by = Auth::id();

        if($data->save()){
            /*
            if($request->extraviado || $request->danificado){
                $data = Armamento::find($request->armamento_id);
                
                if($request->extraviado){
                    $data->extraviado = 1;
                }else{
                    $data->danificado = 1;
                }
                $data->save();
            }*/

            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Editou um armamento de um usuario';
            $log->table = 'users_armamentos';
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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function validar($id)
    {
        
        return UserArmamento::where('key', addslashes($id))->get(); 
        
    }
}
