<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Models\Irso;
use App\Models\IrsoFinanceiro;
use App\Models\Log;

class IrsosFinanceirosController extends Controller
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
             return IrsoFinanceiro::orderBy('data', 'desc')->get();
        }else{ 
            return IrsoFinanceiro::where('subunidade_id', $user->subunidade_id)->orderBy('data', 'desc')->get();
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
        $data = new IrsoFinanceiro;

        $data->valor_irso_sd = $request->valor_irso_sd;     
        $data->valor_irso_cb = $request->valor_irso_cb;   
        $data->valor_irso_3sgt = $request->valor_irso_3sgt;      
        $data->valor_irso_2sgt = $request->valor_irso_2sgt;   
        $data->valor_irso_1sgt = $request->valor_irso_1sgt;   
        $data->valor_irso_st = $request->valor_irso_st;   
        $data->valor_irso_2ten = $request->valor_irso_2ten;   
        $data->valor_irso_1ten = $request->valor_irso_1ten;   
        $data->valor_irso_cap = $request->valor_irso_cap;   
        $data->valor_irso_maj = $request->valor_irso_maj;   
        $data->valor_irso_tencel = $request->valor_irso_tencel;   
        $data->valor_irso_cel = $request->valor_irso_cel;   

        $data->data = $request->data.'-01'; 
        $data->cota_mensal = $request->cota_mensal; 

        $data->subunidade_id = $user->subunidade_id;   

        $data->created_by = Auth::id();      

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Cadastrou um financeiro da irso';
            $log->table = 'irsos_financeiros';
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
        return IrsoFinanceiro::find($id);
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
        $user = Auth::user();
        $data = IrsoFinanceiro::find($id);
        $dataold = $data;

        $data->valor_irso_sd = $request->valor_irso_sd;     
        $data->valor_irso_cb = $request->valor_irso_cb;   
        $data->valor_irso_3sgt = $request->valor_irso_3sgt;      
        $data->valor_irso_2sgt = $request->valor_irso_2sgt;   
        $data->valor_irso_1sgt = $request->valor_irso_1sgt;   
        $data->valor_irso_st = $request->valor_irso_st;   
        $data->valor_irso_2ten = $request->valor_irso_2ten;   
        $data->valor_irso_1ten = $request->valor_irso_1ten;   
        $data->valor_irso_cap = $request->valor_irso_cap;   
        $data->valor_irso_maj = $request->valor_irso_maj;   
        $data->valor_irso_tencel = $request->valor_irso_tencel;   
        $data->valor_irso_cel = $request->valor_irso_cel;   

        $data->data = $request->data.'-01'; 
        $data->cota_mensal = $request->cota_mensal; 
        $data->subunidade_id = $user->subunidade_id;  
        $data->updated_by = Auth::id();

        if($data->save()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Editou um financeiro da irso';
            $log->table = 'irsos_financeiros';
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
        $data = IrsoFinanceiro::find($id);
         
         if($data->delete()){
            $log = new Log;
            $log->user_id = Auth::id();
            $log->mensagem = 'Excluiu um financeiro da irso';
            $log->table = 'irsos_financeiros';
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
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function gastomensal($id)
    {
        $datas = explode("-", $id);
        $user = Auth::user();
        if($user->perfil->administrador){
          
            /*return DB::table('irsos')
            ->join('irsos_users', 'irsos.id', '=', 'irsos_users.irso_id')
            ->join('users', 'irsos_users.user_id', '=', 'users.id')
            ->join('irsos_financeiros', 'irsos.subunidade_id','=','irsos_financeiros.subunidade_id')
            ->select(DB::raw(
                'irsos.data',
                'SUM(if(users.graduacao_id = 1, 1, 0)) * irsos_financeiros.valor_irso_sd as SD'  ,
                'SUM(if(users.graduacao_id = 2, 1, 0)) * irsos_financeiros.valor_irso_cb as CB',
                'SUM(if(users.graduacao_id = 3, 1, 0)) * irsos_financeiros.valor_irso_3sgt as 3SGT',
                'SUM(if(users.graduacao_id = 4, 1, 0)) * irsos_financeiros.valor_irso_2sgt as 2SGT',
                'SUM(if(users.graduacao_id = 5, 1, 0)) * irsos_financeiros.valor_irso_1sgt as 1SGT',
                'SUM(if(users.graduacao_id = 6, 1, 0)) * irsos_financeiros.valor_irso_st as ST',
                'SUM(if(users.graduacao_id = 7, 1, 0)) * irsos_financeiros.valor_irso_2ten as 2TEN',
                'SUM(if(users.graduacao_id = 8, 1, 0)) * irsos_financeiros.valor_irso_1ten as 1TEN',
                'SUM(if(users.graduacao_id = 9, 1, 0)) * irsos_financeiros.valor_irso_cap as CAP',
                'SUM(if(users.graduacao_id = 10, 1, 0)) * irsos_financeiros.valor_irso_maj as MAJ',
                'SUM(if(users.graduacao_id = 11, 1, 0)) * irsos_financeiros.valor_irso_tencel as TENCEL',
                'SUM(if(users.graduacao_id = 12, 1, 0)) * irsos_financeiros.valor_irso_cel as CEL',
            ))       
            ->where(DB::raw('MONTH(irsos_financeiros.data)'), '=', 'MONTH('.$id.')')
            ->where(DB::raw('YEAR(irsos_financeiros.data)'), '=', 'YEAR('.$id.')')    
            ->groupBy('irsos.data')
            ->get();*/

            return DB::select("SELECT 
                    irsos.data,
                    SUM(if(users.graduacao_id = 1, 1, 0)) AS 'quantSD',
                    SUM(if(users.graduacao_id = 1, 1, 0)) * irsos_financeiros.valor_irso_sd AS 'SD',
                    SUM(if(users.graduacao_id = 2, 1, 0)) AS 'quantCB',
                    SUM(if(users.graduacao_id = 2, 1, 0)) * irsos_financeiros.valor_irso_cb AS 'CB',
                    SUM(if(users.graduacao_id = 3, 1, 0)) AS 'quantSGT3',
                    SUM(if(users.graduacao_id = 3, 1, 0)) * irsos_financeiros.valor_irso_3sgt AS 'SGT3',
                    SUM(if(users.graduacao_id = 4, 1, 0)) AS 'quantSGT2',
                    SUM(if(users.graduacao_id = 4, 1, 0)) * irsos_financeiros.valor_irso_2sgt AS 'SGT2',
                    SUM(if(users.graduacao_id = 5, 1, 0)) AS 'quantSGT1',
                    SUM(if(users.graduacao_id = 5, 1, 0)) * irsos_financeiros.valor_irso_1sgt AS 'SGT1',
                    SUM(if(users.graduacao_id = 6, 1, 0)) AS 'quantST',
                    SUM(if(users.graduacao_id = 6, 1, 0)) * irsos_financeiros.valor_irso_st AS 'ST',
                    SUM(if(users.graduacao_id = 7, 1, 0)) AS 'quantTEN2',
                    SUM(if(users.graduacao_id = 7, 1, 0)) * irsos_financeiros.valor_irso_2ten AS 'TEN2',
                    SUM(if(users.graduacao_id = 8, 1, 0)) AS 'quantTEN1',
                    SUM(if(users.graduacao_id = 8, 1, 0)) * irsos_financeiros.valor_irso_1ten AS 'TEN1',
                    SUM(if(users.graduacao_id = 9, 1, 0)) AS 'quantCAP',
                    SUM(if(users.graduacao_id = 9, 1, 0)) * irsos_financeiros.valor_irso_cap AS 'CAP',
                    SUM(if(users.graduacao_id = 10, 1, 0)) AS 'quantMAJ',
                    SUM(if(users.graduacao_id = 10, 1, 0)) * irsos_financeiros.valor_irso_maj AS 'MAJ',
                    SUM(if(users.graduacao_id = 11, 1, 0)) AS 'quantTENCEL',
                    SUM(if(users.graduacao_id = 11, 1, 0)) * irsos_financeiros.valor_irso_tencel AS 'TENCEL',
                    SUM(if(users.graduacao_id = 12, 1, 0)) AS 'quantCEL',
                    SUM(if(users.graduacao_id = 12, 1, 0)) * irsos_financeiros.valor_irso_cel AS 'CEL'
                FROM irsos
                INNER JOIN irsos_users ON irsos.id = irsos_users.irso_id
                INNER JOIN users ON irsos_users.user_id = users.id
                INNER JOIN irsos_financeiros ON irsos.subunidade_id = irsos_financeiros.subunidade_id 
                WHERE month(irsos_financeiros.data) = '".$datas[1]."' 
                AND YEAR(irsos_financeiros.data) = '".$datas[0]."'
                AND month(irsos.data) = '".$datas[1]."' 
                AND YEAR(irsos.data) = '".$datas[0]."'
                GROUP BY irsos.data,
                irsos_financeiros.valor_irso_sd,
                irsos_financeiros.valor_irso_cb,
                irsos_financeiros.valor_irso_3sgt,
                irsos_financeiros.valor_irso_2sgt,
                irsos_financeiros.valor_irso_1sgt,
                irsos_financeiros.valor_irso_st,
                irsos_financeiros.valor_irso_2ten,
                irsos_financeiros.valor_irso_1ten,
                irsos_financeiros.valor_irso_cap,
                irsos_financeiros.valor_irso_maj,
                irsos_financeiros.valor_irso_tencel,
                irsos_financeiros.valor_irso_cel
                ORDER BY irsos.data 
                ");
        }else{ 
            
             /*return DB::table('irsos')
            ->join('irsos_users', 'irsos_users.irso_id', '=', 'irsos.id')
            ->join('users', 'irsos_users.user_id', '=', 'users.id')
            ->join('irsos_financeiros', 'irsos.subunidade_id','=','irsos_financeiros.subunidade_id')
            ->select(DB::raw(
                'irsos.data',
                'SUM(if(users.graduacao_id = 1, 1, 0)) * irsos_financeiros.valor_irso_sd as SD'  ,
                'SUM(if(users.graduacao_id = 2, 1, 0)) * irsos_financeiros.valor_irso_cb as CB',
                'SUM(if(users.graduacao_id = 3, 1, 0)) * irsos_financeiros.valor_irso_3sgt as 3SGT',
                'SUM(if(users.graduacao_id = 4, 1, 0)) * irsos_financeiros.valor_irso_2sgt as 2SGT',
                'SUM(if(users.graduacao_id = 5, 1, 0)) * irsos_financeiros.valor_irso_1sgt as 1SGT',
                'SUM(if(users.graduacao_id = 6, 1, 0)) * irsos_financeiros.valor_irso_st as ST',
                'SUM(if(users.graduacao_id = 7, 1, 0)) * irsos_financeiros.valor_irso_2ten as 2TEN',
                'SUM(if(users.graduacao_id = 8, 1, 0)) * irsos_financeiros.valor_irso_1ten as 1TEN',
                'SUM(if(users.graduacao_id = 9, 1, 0)) * irsos_financeiros.valor_irso_cap as CAP',
                'SUM(if(users.graduacao_id = 10, 1, 0)) * irsos_financeiros.valor_irso_maj as MAJ',
                'SUM(if(users.graduacao_id = 11, 1, 0)) * irsos_financeiros.valor_irso_tencel as TENCEL',
                'SUM(if(users.graduacao_id = 12, 1, 0)) * irsos_financeiros.valor_irso_cel as CEL',
            ))
            ->where('irsos.subunidade_id', $user->subunidade_id)
            ->where(DB::raw('MONTH(irsos_financeiros.data)'), '=', 'MONTH('.$id.')')
            ->where(DB::raw('YEAR(irsos_financeiros.data)'), '=', 'YEAR('.$id.')')
            ->groupBy('irsos.data')
            ->get();*/

            return DB::select("SELECT 
                    irsos.data,
                    SUM(if(users.graduacao_id = 1, 1, 0)) AS 'quantSD',
                    SUM(if(users.graduacao_id = 1, 1, 0)) * irsos_financeiros.valor_irso_sd AS 'SD',
                    SUM(if(users.graduacao_id = 2, 1, 0)) AS 'quantCB',
                    SUM(if(users.graduacao_id = 2, 1, 0)) * irsos_financeiros.valor_irso_cb AS 'CB',
                    SUM(if(users.graduacao_id = 3, 1, 0)) AS 'quantSGT3',
                    SUM(if(users.graduacao_id = 3, 1, 0)) * irsos_financeiros.valor_irso_3sgt AS 'SGT3',
                    SUM(if(users.graduacao_id = 4, 1, 0)) AS 'quantSGT2',
                    SUM(if(users.graduacao_id = 4, 1, 0)) * irsos_financeiros.valor_irso_2sgt AS 'SGT2',
                    SUM(if(users.graduacao_id = 5, 1, 0)) AS 'quantSGT1',
                    SUM(if(users.graduacao_id = 5, 1, 0)) * irsos_financeiros.valor_irso_1sgt AS 'SGT1',
                    SUM(if(users.graduacao_id = 6, 1, 0)) AS 'quantST',
                    SUM(if(users.graduacao_id = 6, 1, 0)) * irsos_financeiros.valor_irso_st AS 'ST',
                    SUM(if(users.graduacao_id = 7, 1, 0)) AS 'quantTEN2',
                    SUM(if(users.graduacao_id = 7, 1, 0)) * irsos_financeiros.valor_irso_2ten AS 'TEN2',
                    SUM(if(users.graduacao_id = 8, 1, 0)) AS 'quantTEN1',
                    SUM(if(users.graduacao_id = 8, 1, 0)) * irsos_financeiros.valor_irso_1ten AS 'TEN1',
                    SUM(if(users.graduacao_id = 9, 1, 0)) AS 'quantCAP',
                    SUM(if(users.graduacao_id = 9, 1, 0)) * irsos_financeiros.valor_irso_cap AS 'CAP',
                    SUM(if(users.graduacao_id = 10, 1, 0)) AS 'quantMAJ',
                    SUM(if(users.graduacao_id = 10, 1, 0)) * irsos_financeiros.valor_irso_maj AS 'MAJ',
                    SUM(if(users.graduacao_id = 11, 1, 0)) AS 'quantTENCEL',
                    SUM(if(users.graduacao_id = 11, 1, 0)) * irsos_financeiros.valor_irso_tencel AS 'TENCEL',
                    SUM(if(users.graduacao_id = 12, 1, 0)) AS 'quantCEL',
                    SUM(if(users.graduacao_id = 12, 1, 0)) * irsos_financeiros.valor_irso_cel AS 'CEL'
                FROM irsos
                INNER JOIN irsos_users ON irsos.id = irsos_users.irso_id
                INNER JOIN users ON irsos_users.user_id = users.id
                INNER JOIN irsos_financeiros ON irsos.subunidade_id = irsos_financeiros.subunidade_id 
                WHERE irsos.subunidade_id = $user->subunidade_id
                AND month(irsos_financeiros.data) = '".$datas[1]."' 
                AND YEAR(irsos_financeiros.data) = '".$datas[0]."'
                AND month(irsos.data) = '".$datas[1]."' 
                AND YEAR(irsos.data) = '".$datas[0]."'
                GROUP BY irsos.data,
                irsos_financeiros.valor_irso_sd,
                irsos_financeiros.valor_irso_cb,
                irsos_financeiros.valor_irso_3sgt,
                irsos_financeiros.valor_irso_2sgt,
                irsos_financeiros.valor_irso_1sgt,
                irsos_financeiros.valor_irso_st,
                irsos_financeiros.valor_irso_2ten,
                irsos_financeiros.valor_irso_1ten,
                irsos_financeiros.valor_irso_cap,
                irsos_financeiros.valor_irso_maj,
                irsos_financeiros.valor_irso_tencel,
                irsos_financeiros.valor_irso_cel
                ORDER BY irsos.data 
                ");
        }  
    }
}
