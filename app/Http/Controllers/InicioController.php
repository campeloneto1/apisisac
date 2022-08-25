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
             return User::count();
        }else{ 
            return User::where('subunidade_id', $user->subunidade_id)->count();
        }
        
    }

    public function getAfastamento()
    {
        $datahj = Carbon::now();
        $user = Auth::user();
        if($user->perfil->administrador){
             return UserAfastamento::where('data', '<=', $datahj->format('Y-m-d'))->where('data_fim', '>=', $datahj->format('Y-m-d'))->count();
        }else{ 
            return UserAfastamento::where('data', '<=', $datahj->format('Y-m-d'))->where('data_fim', '>=', $datahj->format('Y-m-d'))->where('subunidade_id', $user->subunidade_id)->count();
        }
        
    }
}
