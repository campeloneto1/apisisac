<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
     public function login(Request $request){
        $credenciais = request(['usuario', 'password']);

        if(!Auth::attempt($credenciais)){
            $erro = "Usuario nao autorizado!";
            $cod = 171;
            $resposta = ['erro' => $erro, 'cod' => $cod];
            return response()->json($resposta, 404);
        }

        $usuario = $request->user();
        
        DB::table('oauth_access_tokens')->where('revoked', 0)->where('user_id', $usuario->id)->update(['revoked' => 1]);
        
        $resposta['token'] = $usuario->createToken('token')->accessToken;
        $resposta['user'] = $usuario;


        return response()->json($resposta, 200);
    }

    public function check(){
        return Auth::user();
    }

    public function home(){
        return 1;
    }

    public function logout(Request $request){
        //dd($request->user()->token());
        $isUser = $request->user()->token()->revoke();
        if($isUser){
            $resposta['message'] = 'Logout realizado com sucesso';
            $resposta['codigo'] = 1;
            return response()->json($resposta, 200);
        }else{
            $resposta['message'] = 'Algo deu errado';
            $resposta['codigo'] = 2;
            return response()->json($resposta, 404);
        }

    }
}
