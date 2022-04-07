<?php

namespace App\Http\Controllers\Share;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DailyShare;

class DailyShareController extends Controller
{
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
