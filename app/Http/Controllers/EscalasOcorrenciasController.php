<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Models\EscalaOcorrencia;
use App\Models\Log;
use Carbon\Carbon;

class EscalasOcorrenciasController extends Controller
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
             return EscalaOcorrencia::orderBy('id', 'desc')->get();
        }else{ 
            return EscalaOcorrencia::where('subunidade_id', $user->subunidade_id)->orderBy('id', 'desc')->get();
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
        $cod =  EscalaOcorrencia::where('ocorrencia_id', $request->ocorrencia_id)->whereYear('created_at', $hoje->format('Y'))->max('codigo');
        $data = new EscalaOcorrencia;

        $data->escala_id = $request->escala_id;
        $data->ocorrencia_id = $request->ocorrencia_id; 
        $data->codigo = $cod+1;  
        $data->titulo = $request->titulo;  
        $data->descricao = $request->descricao;        
        $data->user_id = Auth::id(); 

        $data->key = hash("sha512",$user->subunidade_id.$request->escala_id.$request->ocorrencia_id.$cod+1);

        $data->subunidade_id = $user->subunidade_id;  
        $data->created_by = Auth::id();      

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Cadastrou uma ocorrencia na escala';
            $log->table = 'escalas_ocorrencias';
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
        return EscalaOcorrencia::find($id);
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
        $data = EscalaOcorrencia::find($id);
        $dataold = $data;

        $data->escala_id = $request->escala_id;
        $data->ocorrencia_id = $request->ocorrencia_id; 
        $data->titulo = $request->titulo;  
        $data->descricao = $request->descricao;        

        $data->updated_by = Auth::id();

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Editou uma ocorrencia da escala';
            $log->table = 'escalas_ocorrencias';
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
        $data = EscalaOcorrencia::find($id);
         
         if($data->delete()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Excluiu uma ocorrencia da escala';
            $log->table = 'escalas_ocorrencias';
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
        
        return EscalaOcorrencia::where('key', addslashes($id))->get(); 
        
    }
}
