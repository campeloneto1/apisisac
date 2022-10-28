<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Models\UserPromocao;
use App\Models\User;
use App\Models\Log;
use Carbon\Carbon;


class UsuariosPromocoesController extends Controller
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
            return UserPromocao::orderBy('id', 'desc')->get();
        }else{  
            return UserPromocao::where('subunidade_id', $user->subunidade_id)->orderBy('id', 'desc')->get();
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
        $data = new UserPromocao;

         $data->graduacao_id = $request->graduacao_id;      
         $data->user_id = $request->user_id;      
         $data->boletim = $request->boletim;       
        $data->data = $request->data;       
        $data->tipo_id = $request->tipo_id;   
     
        $data->subunidade_id = $user->subunidade_id;  
        $data->created_by = Auth::id();      

        if($data->save()){

            $user = User::find($request->user_id);
            $user->graduacao_id = $request->graduacao_id;
            $user->save();

            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Cadastrou uma promocao';
            $log->table = 'users_promocoes';
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
        return UserPromocao::find($id);
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
        $data = UserPromocao::find($id);
        $dataold = $data;
        $data->boletim = $request->boletim;       
        $data->graduacao_id = $request->graduacao_id;      
         $data->user_id = $request->user_id;      

        $data->data = $request->data;       
        $data->tipo_id = $request->tipo_id;    

        $data->updated_by = Auth::id();

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Editou uma promocao';
            $log->table = 'users_promocoes';
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
        $data = UserPromocao::find($id);
         
         if($data->delete()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Excluiu uma Promocao';
            $log->table = 'users_promocoes';
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
