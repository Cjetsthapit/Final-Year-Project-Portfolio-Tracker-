<?php

namespace App\Http\Controllers\Share;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\DailyShare;

use Illuminate\Support\Facades\Storage;

class CompanyDetailController extends Controller
{
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
