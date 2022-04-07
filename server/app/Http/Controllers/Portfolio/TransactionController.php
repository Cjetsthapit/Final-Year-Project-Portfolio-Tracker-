<?php

namespace App\Http\Controllers\Portfolio;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\Portfolio;
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
        // $validator =Validator::make($request->all(),[
        //     'avg'=>'required',
        //     'price'=>'required',
        //     'units'=>'required',
        //     'gainper'=>'required',
        // ]);
        // if($validator->fails()){
        //     return response()->json([
        //         'validation_errors'=>'404'
        //     ]);
        // }else{
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
    public function hello(Request $request){
        return response()->json([
            "data"=>$request->user()
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {
        $list = Portfolio::select('id')->where('user_id',$request->user()->id)->get();
        $flag=true;
        foreach($list as $data){
            if ($data->id == $id){
                $transaction = Transaction::all()->where('portfolio_id','=',$id)->groupBy('name');
                return response()->json([
                    'data'=>$transaction,
                    
                ]);
                $flag=false;
                break;
            }
            
        }
        if ($flag == true){
            return response()->json([
                'status'=>404,
                
            ]);
        }
       
    }

 
    public function singleTransaction($id,$name, Request $request)
    {   
        $list = Portfolio::select('id')->where('user_id',$request->user()->id)->get();
        $flag=true;
        foreach($list as $data){
            if ($data->id == $id){
                $transaction = Transaction::all()->where('portfolio_id','=',$id)->where('name','=',$name)->sortByDesc('date')->groupBy('name');
                if (!$transaction->isEmpty()){
                    return response()->json([
                        'data'=>$transaction,
                        'status'=>200
                    ]);
                    $flag=false;
                break;
                 }
            }
        }
        if ($flag == true){
            return response()->json([
                'status'=>404,
                
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
            return response()->json([
                'status'=>200,
                'average'=>round($average,2)
            ]);
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
    public function chartbyName($id,Request $request){
        $list = Portfolio::select('id')->where('user_id',$request->user()->id)->get();
        $flag=true;
        $databyunits =[];
        $databyinvestment =[];
        
        foreach($list as $data){
            if ($data->id == $id){
                $transaction = Transaction::all()->where('portfolio_id','=',$id)->groupBy('name');
                foreach($transaction as $data){
                    $unitsA=[];
                    $investmentA=[];
                    $units=0;
                    $investment=0;
                    foreach($data as $d){
                        if($d->type == "buy"){
                            $units = $units + $d->units;
                            $investment += $d->investment;
                        }
                        else{
                            $units = $units - $d->units;

                        }
                    }
                    $unitsA['id']=$data[0]->name;
                    $unitsA['portfolio_id']=$id;
                    $unitsA['value']=$units;
                    $unitsA['label']=$data[0]->name;
                    $investmentA['id']=$data[0]->name;
                    $investmentA['label']=$data[0]->name;
                    $investmentA['value']=round($investment,0);
                    $investmentA['portfolio_id']=$id;

                    array_push($databyunits, $unitsA);
                    array_push($databyinvestment, $investmentA);
                }
                return response()->json([
                    'databyUnits'=>$databyunits,
                    'databyInvestment'=>$databyinvestment
                    
                ]);
                $flag=false;
                break;
            }
            
        }
        if ($flag == true){
            return response()->json([
                'status'=>404,
                
            ]);
        }

    }

    public function singleGraph($id,$name, Request $request)
    {   
        $list = Portfolio::select('id')->where('user_id',$request->user()->id)->get();
        $flag=true;
        $progress =[];
        $demo=[];
        $units=0;
        $a=[];
        
        foreach($list as $data){
            if ($data->id == $id){
                $transactions = Transaction::all()->where('portfolio_id','=',$id)->where('name','=',$name)->sortBy('date')->groupBy('name');
                if (!$transactions->isEmpty()){
                    foreach($transactions as $transaction){
                        foreach($transaction as $data){
                            if ($data->type == "buy"){
                                $units += $data->units;
                                $demo['x']=$data->date;
                                $demo['y']=$units;
                                array_push($progress, $demo);
                            }
                            else{
                                $units -= $data->units;
                                $demo['x']=$data->date;
                                $demo['y']=$units;
                    array_push($progress, $demo);

                            }
                        }
                    }
                    // array_push($progress, $demo);
                    return response()->json([
                            "id"=>$name,
                            "data"=>$progress,
                    ]);
                    $flag=false;
                break;
                 }
            }
        }
        if ($flag == true){
            return response()->json([
                'status'=>404,
                
            ]);
        }
            
        
    }
   
}
