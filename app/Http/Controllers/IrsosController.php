<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Models\Irso;
use App\Models\Log;

class IrsosController extends Controller
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
             return Irso::with('usuarios')->orderBy('data', 'desc')->get();
        }else{ 
            return Irso::with('usuarios')->where('subunidade_id', $user->subunidade_id)->orderBy('data', 'desc')->get(); 
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
        $data = new Irso;

        $data->nome = $request->nome;
        
        $data->data = $request->data;        
        $data->hora = $request->hora;

        $data->subunidade_id = $user->subunidade_id;            

        $data->created_by = Auth::id();      

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Cadastrou uma irso';
            $log->table = 'irsos';
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
        return Irso::with('usuarios')->find($id);
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
        $data = Irso::find($id);
        $dataold = $data;

        $data->nome = $request->nome;
        //$data->subunidade_id = $request->subunidade_id;  
        $data->data = $request->data;        
        $data->hora = $request->hora;         

        $data->updated_by = Auth::id();

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Editou uma irso';
            $log->table = 'irsos';
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
        $data = Irso::find($id);
         
         if($data->delete()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Excluiu uma irso';
            $log->table = 'irsos';
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
