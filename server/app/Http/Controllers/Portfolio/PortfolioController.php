<?php

namespace App\Http\Controllers\Portfolio;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Portfolio;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;

class PortfolioController extends Controller
{
    public function createPortfolio(Request $request){
        $portfolio =Portfolio::create([
            'name'=>$request->name,
            'user_id'=>$request->id,

        ]);
        return response()->json([
            'status'=>'200',
        ]);

    }

    public function listUserPortfolio($id){
        $portfolio = Portfolio::where('user_id',$id)->get();
            return response()->json([
                'status'=>$portfolio
            ]);
    }
    public function portfolioInvestment($id){
        // $portfolio = Portfolio::where('user_id',$id)->get();
        $portfolio =Portfolio::where('user_id',$id)
        ->leftJoin('transactions','transactions.portfolio_id','=','portfolios.id')
        ->select('portfolios.id','portfolios.name as pname',DB::raw("SUM(transactions.investment) as total"),'transactions.name as tname')
        ->where('transactions.type','=','buy')
        ->groupBy('portfolios.id','pname','tname')
        ->get()
        ->groupBy('pname');
            return response()->json([
                'status'=>$portfolio
            ]);
    // }
    }
    public function singlePortfolio($id){
        $portfolio = Portfolio::where('id',$id)->get();
        return response()->json([
            'status'=>$portfolio
        ]);

    }

    public function destroy($id){
        $portfolio = Portfolio::where('id',$id)->firstorfail()->delete();
        return response()->json([
            'status'=>$portfolio,
        ]);  

    }
    public function update(Request $request, $id){
        try {
            $portfolio = Portfolio::findOrfail($id)->update($request->all());
        } catch (Exception $e) {
            
        }

        return response()->json($portfolio);
    }
}
