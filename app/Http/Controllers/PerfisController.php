<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Models\Perfil;
use App\Models\Log;

class PerfisController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Perfil::orderBy('nome')->get();
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
        $data = new Perfil;

        $data->nome = $request->nome;

        $data->administrador = $request->administrador;        
        $data->gestor = $request->gestor;        
        $data->oficial_dia = $request->oficial_dia;   
         $data->permanente = $request->permanente;     

        $data->afastamentos = $request->afastamentos;  
        $data->afastamentos_cad = $request->afastamentos_cad;            
        $data->afastamentos_edt = $request->afastamentos_edt;  
        $data->afastamentos_del = $request->afastamentos_del; 

        $data->armamentos = $request->armamentos;  
        $data->armamentos_cad = $request->armamentos_cad;            
        $data->armamentos_edt = $request->armamentos_edt;  
        $data->armamentos_del = $request->armamentos_del; 

        $data->armamentos_emprestimos = $request->armamentos_emprestimos;  
        $data->armamentos_emprestimos_cad = $request->armamentos_emprestimos_cad;            
        $data->armamentos_emprestimos_edt = $request->armamentos_emprestimos_edt;  
        $data->armamentos_emprestimos_del = $request->armamentos_emprestimos_del; 

        $data->documentos = $request->documentos;  
        $data->documentos_cad = $request->documentos_cad;            
        $data->documentos_edt = $request->documentos_edt;  
        $data->documentos_del = $request->documentos_del; 

        $data->escalas = $request->escalas;  
        $data->escalas_cad = $request->escalas_cad;            
        $data->escalas_edt = $request->escalas_edt;  
        $data->escalas_del = $request->escalas_del;   

        $data->irsos = $request->irsos;  
        $data->irsos_cad = $request->irsos_cad;            
        $data->irsos_edt = $request->irsos_edt;  
        $data->irsos_del = $request->irsos_del; 

        $data->materiais = $request->materiais;  
        $data->materiais_cad = $request->materiais_cad;            
        $data->materiais_edt = $request->materiais_edt;  
        $data->materiais_del = $request->materiais_del;

        $data->materiais_emprestimos = $request->materiais_emprestimos;  
        $data->materiais_emprestimos_cad = $request->materiais_emprestimos_cad;            
        $data->materiais_emprestimos_edt = $request->materiais_emprestimos_edt;  
        $data->materiais_emprestimos_del = $request->materiais_emprestimos_del; 

        $data->patrimonios = $request->patrimonios;  
        $data->patrimonios_cad = $request->patrimonios_cad;            
        $data->patrimonios_edt = $request->patrimonios_edt;  
        $data->patrimonios_del = $request->patrimonios_del;

        $data->publicacoes = $request->publicacoes;  
        $data->publicacoes_cad = $request->publicacoes_cad;            
        $data->publicacoes_edt = $request->publicacoes_edt;  
        $data->publicacoes_del = $request->publicacoes_del;

        $data->ocorrencias = $request->ocorrencias;  
        $data->ocorrencias_cad = $request->ocorrencias_cad;            
        $data->ocorrencias_edt = $request->ocorrencias_edt;  
        $data->ocorrencias_del = $request->ocorrencias_del;       

        $data->usuarios = $request->usuarios;  
        $data->usuarios_cad = $request->usuarios_cad;            
        $data->usuarios_edt = $request->usuarios_edt;  
        $data->usuarios_del = $request->usuarios_del; 

        $data->veiculos = $request->veiculos;  
        $data->veiculos_cad = $request->veiculos_cad;            
        $data->veiculos_edt = $request->veiculos_edt;  
        $data->veiculos_del = $request->veiculos_del;  

        $data->veiculos_emprestimos = $request->veiculos_emprestimos;  
        $data->veiculos_emprestimos_cad = $request->veiculos_emprestimos_cad;            
        $data->veiculos_emprestimos_edt = $request->veiculos_emprestimos_edt;  
        $data->veiculos_emprestimos_del = $request->veiculos_emprestimos_del;

        $data->created_by = Auth::id();      

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Cadastrou um perfil';
            $log->table = 'perfis';
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
        return Perfil::find($id);
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
        $data = Perfil::find($id);
        $dataold = $data;

        $data->nome = $request->nome;
        $data->administrador = $request->administrador;        
        $data->gestor = $request->gestor;        
        $data->oficial_dia = $request->oficial_dia;  
        $data->permanente = $request->permanente;    

        $data->afastamentos = $request->afastamentos;  
        $data->afastamentos_cad = $request->afastamentos_cad;            
        $data->afastamentos_edt = $request->afastamentos_edt;  
        $data->afastamentos_del = $request->afastamentos_del; 

        $data->armamentos = $request->armamentos;  
        $data->armamentos_cad = $request->armamentos_cad;            
        $data->armamentos_edt = $request->armamentos_edt;  
        $data->armamentos_del = $request->armamentos_del; 

        $data->armamentos_emprestimos = $request->armamentos_emprestimos;  
        $data->armamentos_emprestimos_cad = $request->armamentos_emprestimos_cad;            
        $data->armamentos_emprestimos_edt = $request->armamentos_emprestimos_edt;  
        $data->armamentos_emprestimos_del = $request->armamentos_emprestimos_del; 

        $data->documentos = $request->documentos;  
        $data->documentos_cad = $request->documentos_cad;            
        $data->documentos_edt = $request->documentos_edt;  
        $data->documentos_del = $request->documentos_del;  

        $data->escalas = $request->escalas;  
        $data->escalas_cad = $request->escalas_cad;            
        $data->escalas_edt = $request->escalas_edt;  
        $data->escalas_del = $request->escalas_del;   

        $data->irsos = $request->irsos;  
        $data->irsos_cad = $request->irsos_cad;            
        $data->irsos_edt = $request->irsos_edt;  
        $data->irsos_del = $request->irsos_del;   

        $data->materiais = $request->materiais;  
        $data->materiais_cad = $request->materiais_cad;            
        $data->materiais_edt = $request->materiais_edt;  
        $data->materiais_del = $request->materiais_del;

         $data->materiais_emprestimos = $request->materiais_emprestimos;  
        $data->materiais_emprestimos_cad = $request->materiais_emprestimos_cad;            
        $data->materiais_emprestimos_edt = $request->materiais_emprestimos_edt;  
        $data->materiais_emprestimos_del = $request->materiais_emprestimos_del; 

        $data->patrimonios = $request->patrimonios;  
        $data->patrimonios_cad = $request->patrimonios_cad;            
        $data->patrimonios_edt = $request->patrimonios_edt;  
        $data->patrimonios_del = $request->patrimonios_del;

        $data->publicacoes = $request->publicacoes;  
        $data->publicacoes_cad = $request->publicacoes_cad;            
        $data->publicacoes_edt = $request->publicacoes_edt;  
        $data->publicacoes_del = $request->publicacoes_del;   

        $data->ocorrencias = $request->ocorrencias;  
        $data->ocorrencias_cad = $request->ocorrencias_cad;            
        $data->ocorrencias_edt = $request->ocorrencias_edt;  
        $data->ocorrencias_del = $request->ocorrencias_del;        

        $data->usuarios = $request->usuarios;  
        $data->usuarios_cad = $request->usuarios_cad;            
        $data->usuarios_edt = $request->usuarios_edt;  
        $data->usuarios_del = $request->usuarios_del;   

        $data->veiculos = $request->veiculos;  
        $data->veiculos_cad = $request->veiculos_cad;            
        $data->veiculos_edt = $request->veiculos_edt;  
        $data->veiculos_del = $request->veiculos_del; 

        $data->veiculos_emprestimos = $request->veiculos_emprestimos;  
        $data->veiculos_emprestimos_cad = $request->veiculos_emprestimos_cad;            
        $data->veiculos_emprestimos_edt = $request->veiculos_emprestimos_edt;  
        $data->veiculos_emprestimos_del = $request->veiculos_emprestimos_del;  

        $data->updated_by = Auth::id();

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Editou um perfil';
            $log->table = 'perfis';
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
        $data = Perfil::find($id);
         
         if($data->delete()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Excluiu um perfil';
            $log->table = 'perfis';
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
