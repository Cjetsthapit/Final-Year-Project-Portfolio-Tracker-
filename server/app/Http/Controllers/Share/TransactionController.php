<?php

namespace App\Http\Controllers\Share;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function buyShare(Request $request)
    {   
        $type=$request->type;
        $price=$request->price;
        $units=$request->units;
        $total = $price*$units;
        $broker = 0;
        $gainper=0;
        $gain=0;
        if($total <=50000){
            $broker= .004* $total;
        }
        elseif($total>50000 && $total<=500000 ){
            $broker = .0037 * $total;
        }
        elseif($total>500000 && $total<=2000000 ){
            $broker = .0034 * $total;
        }
        elseif($total>2000000 && $total<=10000000 ){
            $broker = .0030 * $total;
        }
        else{
            $broker = .0027 * $total;
        }

        
        $sebon =.00015*$total;
        $commission = $broker+$sebon+25;
        if ($type == 'buy'){
            $investment= $total+$commission;
        }
        $transaction= Transaction::create([
            'portfolio_id'=>$request->portfolio_id,
            'name'=>$request->name,
            'units'=>$request->units,
            'price'=>$request->price,
            'date'=>$request->date,
            'type'=>$request->type,
            'broker_commission'=>round($broker,2),
            'sebon_commission'=>round($sebon,2),
            'taxper'=>$gainper,
            'tax'=>round($gain,2),
            'investment'=>round($investment,2),

        ]);
        return response()->json([
            'status'=>'200',
        ]); 
        
    }
    
    public function sellShare(Request $request)
    {   
        $avg=$request->avg;
        $type=$request->type;
        $price=$request->price;
        $units=$request->units;
        $total = $price*$units;
        $broker = 0;
        $gainper=$request->gainper;
        $gain=0;
        if($total <=50000){
            $broker= .004* $total;
        }
        elseif($total>50000 && $total<=500000 ){
            $broker = .0037 * $total;
        }
        elseif($total>500000 && $total<=2000000 ){
            $broker = .0034 * $total;
        }
        elseif($total>2000000 && $total<=10000000 ){
            $broker = .0030 * $total;
        }
        else{
            $broker = .0027 * $total;
        }
        // $gainper=7.5;
        
        $sebon =.00015*$total;
        $commission = $broker+$sebon+25;
        
            if ($total > (($avg*$units)+$commission)){
                $gain=($gainper/100)*((($price-$avg)*$units)-$commission);
            }
            $investment= ($total-$commission-$gain);

        
        $transaction= Transaction::create([
            'portfolio_id'=>$request->portfolio_id,
            'name'=>$request->name,
            'units'=>$request->units,
            'price'=>$request->price,
            'date'=>$request->date,
            'type'=>$request->type,
            'broker_commission'=>round($broker,2),
            'sebon_commission'=>round($sebon,2),
            'taxper'=>$gainper,
            'tax'=>round($gain,2),
            'investment'=>round($investment,2),

        ]);
        return response()->json([
            'status'=>200,
        ]); 
        
    }
    public function editBuy(Request $request,$id){
        $transaction = Transaction::where('id',$id)->firstorfail()->delete();

        $this->buyShare($request);

    }
    public function editSell(Request $request,$id){
        $transaction = Transaction::where('id',$id)->firstorfail()->delete();

        $this->sellShare($request);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $transaction = Transaction::all()->where('portfolio_id','=',$id)->groupBy('name');
        return response()->json([
            'data'=>$transaction
        ]);
    }

 
    public function singleTransaction($id,$name, Request $request)
    {
        $transaction = Transaction::all()->where('portfolio_id','=',$id)->where('name','=',$name)->groupBy('name');
        
        if ($transaction->isEmpty()){
            return response()->json([
                'status'=>404,
            ]);
                   }
        else{
            return response()->json([
                'data'=>$transaction,
                'status'=>200
            ]);
        }
    }
    public function average($id,$name, Request $request)
    {
        $transaction = Transaction::all()->where('portfolio_id','=',$id)->where('name','=',$name)->where('type','=','buy')->groupBy('name');
        $units=0;
        $investment=0;
        foreach($transaction as $data){
            foreach($data as $d){
                $units = $d->units + $units;
                $investment = $d->investment + $investment;

            }
        }
        $average = $investment/$units;
        // if ($transaction->isEmpty()){
        //     return response()->json([
        //         'status'=>404,
        //     ]);
        //            }
        // else{
            return response()->json([
                'status'=>200,
                'average'=>round($average,2)
            ]);
        // }
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id){
        $transaction = Transaction::where('id',$id)->firstorfail()->delete();
        $count = Transaction::where('id',$id)->get();
        
        return response()->json([
            'count'=>$count,
            'status'=>200,
        ]);  

    }
}
