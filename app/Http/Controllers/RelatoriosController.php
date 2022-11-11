<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;

use App\Models\MaterialEmprestimo;
use App\Models\VeiculoEmprestimo;
use App\Models\UserArmamento;
use App\Models\UserPromocao;

use App\Models\Log;

class RelatoriosController extends Controller
{
    public function getEmpArmamentos(Request $request){
        $user = Auth::user();
        $data = UserArmamento::where('data_emp', '>=', $request->dt_ini)->where('data_emp', '<=', $request->dt_fim);

        if($request->marca_id){
            $data->whereRelation('armamentos','marca_id', $request->marca_id);
        }

        if($request->modelo_id){
           $data->whereRelation('armamentos','modelo_id', $request->modelo_id);
        }

        if($request->tipo_id){
           $data->whereRelation('armamentos','tipo_id', $request->tipo_id);
        }

         if($request->tipo_id){
           $data->whereRelation('armamentos','tipo_id', $request->tipo_id);
        }

        if($request->user_id){
            $data->where('user_id', $request->user_id);
        }

        if($user->perfil->administrador){
             return $data->orderBy('id', 'DESC')->get();
        }else{ 
            return $data->where('subunidade_id', $user->subunidade_id)->orderBy('id', 'DESC')->get(); 
        }
    }

    public function getEmpMateriais(Request $request){
        $user = Auth::user();
        $data = MaterialEmprestimo::where('data_saida', '>=', $request->dt_ini)->where('data_saida', '<=', $request->dt_fim);

        if($request->marca_id){
            $data->whereRelation('material','marca_id', $request->marca_id);
        }

        if($request->modelo_id){
           $data->whereRelation('material','modelo_id', $request->modelo_id);
        }

        if($request->tipo_id){
           $data->whereRelation('material','tipo_id', $request->tipo_id);
        }

        if($request->material_id){
            $data->where('material_id', $request->material_id);
        }

        if($request->user_id){
            $data->where('user_id', $request->user_id);
        }

        if($user->perfil->administrador){
             return $data->orderBy('id', 'DESC')->get();
        }else{ 
            return $data->where('subunidade_id', $user->subunidade_id)->orderBy('id', 'DESC')->get(); 
        }
    }

    public function getPromocoes(Request $request){
        $user = Auth::user();
        $data = UserPromocao::where('data_saida', '>=', $request->dt_ini)->where('data_saida', '<=', $request->dt_fim);

        if($request->boletim){
            $data->where('boletim', 'like', '%'.$request->boletim.'%');
        }

        if($request->tipo_id){
            $data->where('tipo_id', $request->tipo_id);
        }

        if($request->graduacao_id){
            $data->where('graduacao_id', $request->graduacao_id);
        }

        if($request->user_id){
            $data->where('user_id', $request->user_id);
        }

        if($user->perfil->administrador){
             return $data->orderBy('id', 'DESC')->get();
        }else{ 
            return $data->where('subunidade_id', $user->subunidade_id)->orderBy('id', 'DESC')->get(); 
        }
    }

    public function getEmpVeiculos(Request $request){
        $user = Auth::user();
        $data = VeiculoEmprestimo::where('data_saida', '>=', $request->dt_ini)->where('data_saida', '<=', $request->dt_fim);

        if($request->marca_id){
            $data->whereRelation('veiculo','marca_id', $request->marca_id);
        }

        if($request->modelo_id){
           $data->whereRelation('veiculo','modelo_id', $request->modelo_id);
        }

        if($request->tipo_id){
           $data->whereRelation('veiculo','tipo_id', $request->tipo_id);
        }

        if($request->veiculo_id){
            $data->where('veiculo_id', $request->veiculo_id);
        }

        if($request->user_id){
            $data->where('user_id', $request->user_id);
        }

        if($user->perfil->administrador){
             return $data->orderBy('id', 'DESC')->get();
        }else{ 
            return $data->where('subunidade_id', $user->subunidade_id)->orderBy('id', 'DESC')->get(); 
        }
    }

    

}
