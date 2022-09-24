<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Models\User;
use App\Models\UserAfastamento;
use Carbon\Carbon;

class InicioController extends Controller
{
    public function getPm()
    {
        $user = Auth::user();
        if($user->perfil->administrador){
             return User::whereNull('boletim_saida')->count();
        }else{ 
            return User::where('subunidade_id', $user->subunidade_id)->whereNull('boletim_saida')->count();
        }
        
    }

    public function getAfastamentos()
    {
        $datahj = Carbon::now();
        $user = Auth::user();
        if($user->perfil->administrador){
             return UserAfastamento::where('data', '<=', $datahj->format('Y-m-d'))->where('data_fim', '>=', $datahj->format('Y-m-d'))->count();
        }else{ 
            return UserAfastamento::where('data', '<=', $datahj->format('Y-m-d'))->where('data_fim', '>=', $datahj->format('Y-m-d'))->where('subunidade_id', $user->subunidade_id)->count();
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
                ->groupBy('setores.nome')
                ->get();

             //return User::with('setores')->select(DB::raw('setores.nome', 'COUNT(users.id)'))->groupBy('setores.nome')->get();
        }else{ 
            //return User::with('setores')->select(DB::raw('setores.nome', 'COUNT(users.id)'))->where('subunidade_id', $user->subunidade_id)->groupBy('setores.nome')->get();
             return User::query()
                ->join('setores', 'setores.id', '=', 'users.setor_id')
                ->where('users.subunidade_id', $user->subunidade_id)
                ->select('setores.nome', DB::raw('COUNT(users.id) as quant'))
                ->whereNull('boletim_saida')
                ->groupBy('setores.nome')
                ->get();
        }        
    }
}
