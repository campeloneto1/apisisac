<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;

use App\Models\Armamento;
use App\Models\Documento;
use App\Models\Escala;
use App\Models\EscalaOcorrencia;
use App\Models\Material;
use App\Models\MaterialEmprestimo;
use App\Models\VeiculoEmprestimo;
use App\Models\Veiculo;
use App\Models\User;
use App\Models\UserAfastamento;
use App\Models\UserFerias;
use Carbon\Carbon;

class InicioController extends Controller
{

    public function search($id)
    {
        //return $id;
        //$array = array();
        $user = Auth::user();
        if($user->perfil->administrador){
            $usuarios = User::where('nome', 'like', '%'.$id.'%')
             ->orWhere('matricula', 'like', '%'.$id.'%')
             ->orWhere('cpf', 'like', '%'.$id.'%')
             ->get();
        }else{ 
            $usuarios = User::where('subunidade_id', $user->subunidade_id)
            ->where('nome', 'like', '%'.$id.'%')
            ->orWhere('matricula', 'like', '%'.$id.'%')
            ->orWhere('cpf', 'like', '%'.$id.'%')
            ->get();
        }

         if($user->perfil->administrador){
            $armamentos = Armamento::where('serial', 'like', '%'.$id.'%')
             ->get();
        }else{ 
            $armamentos = Armamento::where('subunidade_id', $user->subunidade_id)
            ->where('serial', 'like', '%'.$id.'%')
            ->get();
        }

        if($user->perfil->administrador){
            $documentos = Documento::where('titulo', 'like', '%'.$id.'%')
            ->orWhere('corpo', 'like', '%'.$id.'%')
             ->get();
        }else{ 
            $documentos = Documento::where('subunidade_id', $user->subunidade_id)
            ->where('titulo', 'like', '%'.$id.'%')
            ->orWhere('corpo', 'like', '%'.$id.'%')
            ->get();
        }

        if($user->perfil->administrador){
            $ocorrencias = EscalaOcorrencia::where('titulo', 'like', '%'.$id.'%')
            ->orWhere('descricao', 'like', '%'.$id.'%')
             ->get();
        }else{ 
            $ocorrencias = EscalaOcorrencia::where('subunidade_id', $user->subunidade_id)
            ->where('titulo', 'like', '%'.$id.'%')
            ->orWhere('descricao', 'like', '%'.$id.'%')
            ->get();
        }

        if($user->perfil->administrador){
            $veiculos = Veiculo::where('placa', 'like', '%'.$id.'%')
             ->orWhere('chassi', 'like', '%'.$id.'%')
             ->orWhere('renavam', 'like', '%'.$id.'%')
             ->get();
        }else{ 
            $veiculos = Veiculo::where('subunidade_id', $user->subunidade_id)
            ->where('placa', 'like', '%'.$id.'%')
            ->orWhere('chassi', 'like', '%'.$id.'%')
            ->orWhere('renavam', 'like', '%'.$id.'%')
            ->get();
        }
        
       // return $array;
       return compact('usuarios', 'armamentos', 'documentos', 'ocorrencias', 'veiculos');
    }

    public function getEscalaDia()
    {
        $user = Auth::user();
        $datahj = Carbon::now();
        return Escala::where('subunidade_id', $user->subunidade_id)->where('data', $datahj->format('Y-m-d'))->get();
    }

    public function getQuantPm()
    {
        $user = Auth::user();
        if($user->perfil->administrador){
             return User::whereNull('boletim_saida')->where('conta', 1)->count();
        }else{ 
            return User::where('subunidade_id', $user->subunidade_id)->whereNull('boletim_saida')->where('conta', 1)->count();
        }
        
    }

    public function getQuantAfastamentos()
    {
        $datahj = Carbon::now();
        $user = Auth::user();
        if($user->perfil->administrador){
             return UserAfastamento::where('data', '<=', $datahj->format('Y-m-d'))->where('data_fim', '>=', $datahj->format('Y-m-d'))->whereNull('boletim_saida')->where('conta', 1)->count();
        }else{ 
            return UserAfastamento::where('data', '<=', $datahj->format('Y-m-d'))->where('data_fim', '>=', $datahj->format('Y-m-d'))->where('subunidade_id', $user->subunidade_id)->whereNull('boletim_saida')->where('conta', 1)->count();
        }
        
    }

    public function getQuantFerias()
    {
        $datahj = Carbon::now();
        $user = Auth::user();
        if($user->perfil->administrador){
             return UserFerias::where('data_ini', '<=', $datahj->format('Y-m-d'))->where('data_fim', '>=', $datahj->format('Y-m-d'))->whereNull('boletim_saida')->where('conta', 1)->count();
        }else{ 
            return UserFerias::where('data_ini', '<=', $datahj->format('Y-m-d'))->where('data_fim', '>=', $datahj->format('Y-m-d'))->where('subunidade_id', $user->subunidade_id)->whereNull('boletim_saida')->where('conta', 1)->count();
        }
        
    }

     public function getQuantVeiculos()
    {
        $user = Auth::user();
        if($user->perfil->administrador){
             return Veiculo::whereNull('data_baixa')->count();
        }else{ 
            return Veiculo::where('subunidade_id', $user->subunidade_id)->whereNull('data_baixa')->count();
        }
        
    }

    public function getSetores()
    {
        $user = Auth::user();
        if($user->perfil->administrador){
           return User::query()
                ->join('setores', 'setores.id', '=', 'users.setor_id')
                ->select('setores.nome', DB::raw('COUNT(users.id) as quant'))
                ->whereNull('boletim_saida')
                ->where('conta', 1)
                ->groupBy('setores.nome')
                ->orderBy('setores.nome')
                ->get();
        }else{ 
             return User::query()
                ->join('setores', 'setores.id', '=', 'users.setor_id')
                ->where('users.subunidade_id', $user->subunidade_id)
                ->select('setores.nome', DB::raw('COUNT(users.id) as quant'))
                ->whereNull('boletim_saida')
                ->where('conta', 1)
                ->groupBy('setores.nome')
                ->orderBy('setores.nome')
                ->get();
        }        
    }

    public function getGraduacoes()
    {
        $user = Auth::user();
        if($user->perfil->administrador){
           return User::query()
                ->join('graduacoes', 'graduacoes.id', '=', 'users.graduacao_id')
                ->select('graduacoes.nome', DB::raw('COUNT(users.id) as quant'))
                ->whereNull('boletim_saida')
                ->where('conta', 1)
                ->groupBy('graduacoes.nome')
                ->orderBy('ordem', 'desc')
                ->get();

        }else{ 
             return User::query()
                ->join('graduacoes', 'graduacoes.id', '=', 'users.graduacao_id')
                ->where('users.subunidade_id', $user->subunidade_id)
                ->select('graduacoes.nome', DB::raw('COUNT(users.id) as quant'))
                ->whereNull('boletim_saida')
                ->where('conta', 1)
                ->groupBy('graduacoes.nome')
                ->orderBy('ordem', 'desc')
                ->get();
        }        
    }

    public function getVeiculosEmprestimos()
    {
        //$datahj = Carbon::now();
        $user = Auth::user();
        if($user->perfil->administrador){
             return VeiculoEmprestimo::whereNull('data_chegada')->get();
        }else{ 
            return VeiculoEmprestimo::whereNull('data_chegada')->where('subunidade_id', $user->subunidade_id)->get();
        }
        
    }

    public function getMateriaisEmprestimos()
    {
        //$datahj = Carbon::now();
        $user = Auth::user();
        if($user->perfil->administrador){
             return MaterialEmprestimo::whereNull('data_chegada')->get();
        }else{ 
            return MaterialEmprestimo::whereNull('data_chegada')->where('subunidade_id', $user->subunidade_id)->get();
        }
        
    }

    public function getTrocaOleo()
    {
        //$datahj = Carbon::now();
        $user = Auth::user();
        if($user->perfil->administrador){
             return Veiculo::where(DB::raw('troca_oleo - km_atual'),'<=',100)->get();
        }else{ 
            return Veiculo::where(DB::raw('troca_oleo - km_atual'),'<=',100)->where('subunidade_id', $user->subunidade_id)->get();
        }
        
    }

    public function getArmVencimentos()
    {
        //$datahj = Carbon::now();
        $user = Auth::user();
        if($user->perfil->administrador){
             return Armamento::where(DB::raw('DATEDIFF(data_venc,CURDATE())'),'<=',7)->get();
        }else{ 
            return Armamento::where(DB::raw('DATEDIFF(data_venc,CURDATE())'),'<=',7)->where('subunidade_id', $user->subunidade_id)->get();
        }
        
    }

    public function getMatVencimentos()
    {
        //$datahj = Carbon::now();
        $user = Auth::user();
        if($user->perfil->administrador){
             return Material::where(DB::raw('DATEDIFF(data_venc,CURDATE())'),'<=',7)->get();
        }else{ 
            return Material::where(DB::raw('DATEDIFF(data_venc,CURDATE())'),'<=',7)->where('subunidade_id', $user->subunidade_id)->get();
        }
        
    }
}
