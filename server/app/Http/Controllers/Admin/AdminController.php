<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DailyShare;
use App\Models\Company;
use App\Models\User;
use App\Models\Portfolio;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
class AdminController extends Controller
{
    public function dailyShare(){
        $daily =DailyShare::truncate();
        $response = Http::get('https://nepstockapi.herokuapp.com/');
        // dd($response);
        $asd = json_decode($response,true);
        // dd($asd);
        foreach($asd as $data){

            $data = array_values($data);
           $daily = new DailyShare();
        //    $daily->Days_120= $data[0];
        //    $daily->Days_180= $data[1];
        //    $daily->Weeks_High_52= $data[2];
        //    $daily->Weeks_Low_53= $data[3];
        //    $daily->Conf= $data[5];
           $daily->Symbol= $data[15];
            $daily->Open= $data[10];
            $daily->Low= $data[9];
            $daily->High= $data[8]; 
           $daily->Close= $data[4];
            $daily->Diff= $data[6];
           $daily->DiffPer= $data[7];
           $daily->Turnover= $data[17];
        //    $daily->Prev_Close= $data[11];
        //    $daily->Range= $data[12];
        //    $daily->RangePer= $data[13];
        //    $daily->S_No= $data[14];
        //    $daily->Trans= $data[16];
        //    $daily->VWAP= $data[18];
        //    $daily->VWAP_Per= $data[19];
        //    $daily->Volume= $data[20];
           $daily->save();
        };
        return response()->json([
            'message'=>'Successful',
        ]);
    }
    public function importCompanyDetails(){
        $json = Storage::disk('local')->get('company.json');
        $json = json_decode($json, true);
        $company = Company::truncate();
        foreach($json as $data){
            $company = new Company();
            $company->fname = ($data['cname']);
            $company->sname = ($data['short']);
            $company->sector = ($data['sector']);
            $company->sharesout = ($data['sharesout']==null ? 'No Data at the Moment' :$data['sharesout'] );
            $company->low_high = ($data['low_high']);
            $company->avg_120 = ($data['avg_120']);
            $company->yield = ($data['yield_year']);
            $company->eps = ($data['eps']);
            $company->pe = ($data['pe']);
            $company->bookvalue = ($data['book_value']);
            $company->pbv = ($data['pbv']);
            $company->dividend = ($data['dividend']==null ? 'No Data at the Moment' :$data['dividend']);
            $company->bonus = ($data['bonus']==null ? 'No Data at the Moment' :$data['bonus'] );
            $company->rightshares = ($data['right']==null ? 'No Data at the Moment' :$data['right'] );
            $company->avgvol = ($data['avg']);
            $company->marketcap = ($data['market']);
            $company->save();

        }
        return response()->json([
            'message'=>"Successful"
        ]);
    }
    public function userList(Request $request){
        // $user=User::all()
        // ->join('portfolios','portfolios.user_id', '=', 'users.id')
        // ->where('users.id','!=',$request->user()->id) 
        // ->get();
        $user =  DB::select("SELECT u.name,u.email,count(p.user_id) AS 'portfolioCount'  FROM portfolios p right join users u 
        on u.id = p.user_id group by u.id , u.name,u.email having u.id !=0");
        // $user =Portfolio::select('users.name', DB::raw("COUNT(portfolios.user_id) as no_of_portfolios"))
        // ->rightJoin('users','users.id','=','portfolios.user_id')
        // ->groupBy('users.id')
        // ->get();
       
        return response()->json([
            'users'=>$user
        ]);
    }  
    public function latest(){
        $day = DailyShare::select('created_at')->take(1)->get();
        return response()->json([
            'day'=>$day
        ]);
    } 
}
