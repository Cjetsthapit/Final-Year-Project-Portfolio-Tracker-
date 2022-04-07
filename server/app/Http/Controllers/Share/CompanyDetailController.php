<?php

namespace App\Http\Controllers\Share;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\DailyShare;


class CompanyDetailController extends Controller
{
   
    public function callCompany($id){
        
        // $company =Company::where('sname', $id)->get();
        $company = Company::where('sname', $id)
        ->leftJoin('daily_shares','daily_shares.symbol', '=', 'companies.sname')
        ->get();
        if (!$company->isEmpty()){
            return response()->json([
                'status'=>200,
                'company'=>$company
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
