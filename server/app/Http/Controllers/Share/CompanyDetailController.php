<?php

namespace App\Http\Controllers\Share;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\DailyShare;
use App\Models\Chart;


class CompanyDetailController extends Controller
{
   
    public function callCompany($id){
        
        // $company =Company::where('sname', $id)->get();
        $company = Company::where('sname', $id)
        ->leftJoin('daily_shares','daily_shares.symbol', '=', 'companies.sname')
        ->get();
        $chartData = Chart::select('close AS y','created_at')->where('symbol',$id)->orderBy('created_at')->latest()->take(7)->get();
        // return response()->json([
        //     'chart'=>$chart
        // ]);
        $chart=[];
        $progress =[];
        $demo=[];
        if (!$company->isEmpty()){
            for($i=0; $i<count($chartData); $i++){
                
                    $demo['x']=$i+1;
                    $demo['y']=str_replace(',','',$chartData[$i]->y);
                array_push($chart,$demo);
            }
            $progress['data']=$chart;
            // array_push($progress['data'],$chart);
            $progress['id']=$id;
            return response()->json([
                'status'=>200,
                'company'=>$company,
                'chart'=>$progress
            ]);
        }
        else    
        {
            return response()->json([
                'status'=>404,
                'message'=>'404 Error Not Found'
            ]);
        }
    }
}
