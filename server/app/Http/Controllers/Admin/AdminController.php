<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DailyShare;
use App\Models\Company;
use App\Models\User;
use App\Models\Chart;
use App\Models\Portfolio;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
class AdminController extends Controller
{
    public function dailyShare(){
        $daily =DailyShare::truncate();
        $response = Http::get('https://nepstockapi.herokuapp.com/');
        $asd = json_decode($response,true);
        foreach($asd as $data){
            $data = array_values($data);
           $daily = new DailyShare();
           $chart =new Chart();
           $daily->Symbol= $data[15];
           $chart->Symbol= $data[15];
            $daily->Open= $data[10];
            $daily->Low= $data[9];
            $daily->High= $data[8]; 
           $daily->Close= $data[4];
           $chart->Close= $data[4];
            $daily->Diff= $data[6];
           $daily->DiffPer= $data[7];
           $daily->Turnover= $data[17];
           $daily->save();
           $chart->save();
        };
        return response()->json([
            'message'=>'Successful',
            'data'=>$asd,
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
        $user =  DB::select("SELECT u.name,u.email,count(p.user_id) AS 'portfolioCount'  FROM portfolios p right join users u 
        on u.id = p.user_id group by u.id , u.name,u.email having u.id !=0");
       
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
