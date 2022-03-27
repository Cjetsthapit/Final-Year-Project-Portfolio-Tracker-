<?php

namespace App\Http\Controllers\Share;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DailyShare;
use Illuminate\Support\Facades\Http;

class DailyShareController extends Controller
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
            // $stock
            'message'=>'Successful',
            // "data"=>$stock
        ]);
    }
    public function call(){
        $share =DailyShare::all();
        return response()->json([
            'share'=>$share
        ]);
    }
    public function gainer(){
        $gainer =DailyShare::all()->sortByDesc('diffper')->take(7);
        $loser =DailyShare::all()->sortBy('diffper')->take(7);
        $turnover =DailyShare::all()->sortByDesc('(double)turnover')->take(7);
        $gain=[];
        $lose=[];
        $turn=[];

        foreach($gainer as $data){
            array_push($gain,$data);
        }
        foreach($loser as $data){
            array_push($lose,$data);
        }
        foreach($turnover as $data){
            array_push($turn,$data);
        }
        return response()->json([
            'gainer'=>$gain,
            'loser'=>$lose,
            'turnover'=>$turn,
        ]);

    }
}
