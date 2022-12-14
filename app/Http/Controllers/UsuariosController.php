<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Models\User;
use App\Models\Log;
use Carbon\Carbon;

class UsuariosController extends Controller
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
             return User::orderBy('nome')->get();
        }else{  
            return User::where('subunidade_id', $user->subunidade_id)->orderBy('nome')->get();
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index2()
    {
        $user = Auth::user();
        if($user->perfil->administrador){
             return User::whereNull('boletim_saida')->orderBy('nome')->get();
        }else{  
            return User::whereNull('boletim_saida')->where('subunidade_id', $user->subunidade_id)->orderBy('nome')->get();
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
        $data = new User;

        $data->subunidade_id = $request->subunidade_id;
        $data->setor_id = $request->setor_id;
        $data->nome = $request->nome;
        $data->email = $request->email;
        $data->cpf = $request->cpf;
        $data->matricula = $request->matricula;     
        $data->numeral = $request->numeral;        
        $data->telefone1 = $request->telefone1;
        $data->telefone2 = $request->telefone2;
        $data->data_nascimento = $request->data_nascimento;
        $data->data_ingresso = $request->data_ingresso;
        $data->nome_guerra = $request->nome_guerra;
        $data->sexo_id = $request->sexo_id;
        $data->graduacao_id = $request->graduacao_id;
        $data->perfil_id = $request->perfil_id;
        
        $data->cep = $request->cep;
        $data->rua = $request->rua;
        $data->numero = $request->numero;
        $data->bairro = $request->bairro;
        $data->complemento = $request->complemento;
        $data->cidade_id = $request->cidade_id;

        $data->boletim_inclusao = $request->boletim_inclusao;
        $data->boletim_entrada = $request->boletim_entrada;
        $data->data_apresentacao = $request->data_apresentacao;
        //$data->transferido = $request->transferido;
        $data->boletim_saida = $request->boletim_saida;

        if($request->conta){
            $data->conta = $request->conta;
        }

        $data->usuario = $request->matricula;
        $data->password = bcrypt('CasaMilitar');

        $data->created_by = Auth::id();      

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Cadastrou um usu??rio';
            $log->table = 'users';
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
        return User::with([
            'afastamentos' => function ($query) { return $query->orderBy('id','DESC'); }, 
            'armamentos'=> function ($query) { return $query->orderBy('id','DESC'); },
            'emprestimosmateriais'=> function ($query) { return $query->orderBy('id','DESC'); },
            'emprestimosveiculos'=> function ($query) { return $query->orderBy('id','DESC'); },
            'escalas'=> function ($query) { return $query->orderBy('id','DESC'); },
            'ferias' => function ($query) { return $query->orderBy('id','DESC'); }, 
            'irsos'=> function ($query) { return $query->orderBy('id','DESC'); },
            'promocoes'=> function ($query) { return $query->orderBy('id','DESC'); },
            'publicacoes' => function ($query) { return $query->orderBy('id','DESC'); } 
        ])->find($id);
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
        $data = User::find($id);
        $dataold = User::find($id);

        $data->subunidade_id = $request->subunidade_id;
        $data->setor_id = $request->setor_id;
        $data->nome = $request->nome;
        $data->email = $request->email;
        $data->cpf = $request->cpf;
        $data->matricula = $request->matricula;  
        $data->numeral = $request->numeral;              
        $data->telefone1 = $request->telefone1;
        $data->telefone2 = $request->telefone2;
        $data->data_nascimento = $request->data_nascimento;
        $data->data_ingresso = $request->data_ingresso;
        $data->nome_guerra = $request->nome_guerra;
        $data->sexo_id = $request->sexo_id;
        $data->graduacao_id = $request->graduacao_id;
        $data->perfil_id = $request->perfil_id;
        
        $data->cep = $request->cep;
        $data->rua = $request->rua;
        $data->numero = $request->numero;
        $data->bairro = $request->bairro;
        $data->complemento = $request->complemento;
        $data->cidade_id = $request->cidade_id;

        $data->boletim_inclusao = $request->boletim_inclusao;
        $data->boletim_entrada = $request->boletim_entrada;
        $data->data_apresentacao = $request->data_apresentacao;
        //$data->transferido = $request->transferido;
        $data->boletim_saida = $request->boletim_saida;

        
            $data->conta = $request->conta;
        

        $data->usuario = $request->matricula;        

        $data->updated_by = Auth::id();

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Editou um usu??rio';
            $log->table = 'users';
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
        $data = User::find($id);
         
         if($data->delete()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Excluiu um usu??rio';
            $log->table = 'users';
            $log->action = 3;
            $log->fk = $data->id;
            $log->object = $data;
            $log->save();
            return 1;
          }else{
            return 2;
          }
    }

    public function reset_password($id){    
        $data = User::find($id);
        $dataold = User::find($id);
         
        $data->password = bcrypt('sisac2022');
        
        $data->updated_by = Auth::id();

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Resetou a senha de acesso';
            $log->table = 'usuarios';
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

    public function change_password(Request $request){    
        $data = User::find(Auth::id());
        $dataold = $data;
         
        $data->password = bcrypt($request->password);
        
        $data->updated_by = Auth::id();

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Alterou a senha de acesso';
            $log->table = 'usuarios';
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

    public function foto(Request $request){  
        if ($request->hasFile('image')){
            $file      = $request->file('image');
            $filename  = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $picture   = $request->id.date('dmYHis').".".$extension;
            //move image to public/img folder
            $file->move(public_path('imagens'), $picture);


            $data = User::find($request->id);
            $dataold = User::find($request->id);
            $data->foto =  $picture;

            if($data->save()){
                $log = new Log;
                $log->user_id = Auth::id();
                $log->mensagem = 'Editou foto de usu??rio';
                $log->table = 'usuarios';
                $log->action = 2;
                $log->fk = $data->id;
                $log->object = $data;
                $log->object_old = $dataold;
                $log->save();
              return 1;
            }else{
              return 2;
            }
        }else{
            return 2;
        }
  
        
    }
}
