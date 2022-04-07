<?php

namespace App\Http\Controllers\Api;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            'name'=>'required|max:191',
            'email'=>'required|email|max:191|unique:users,email',
            'date'=>'required|date',
            'password'=>'required|min:6'
        ]);
        if($validator->fails()){
            return response()->json([
                'validation_errors'=>$validator->messages()
            ]);
        }
        else{
            $user= User::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'date'=>$request->date,
                'password'=>Hash::make($request->password),

            ]);
            $token = $user->createToken($user->email.'_Token')->plainTextToken;
            return response()->json([
                'status'=>'200',
                // 'username'=>$user->name,
                // 'token'=>$token,
                // 'user_id'=>$user->id,
                // "role"=>'',
            ]);
        }
    }
    public function login(Request $request){
        $validator =Validator::make($request->all(),[
            'email'=>'required',
            'password'=>'required'
        ]);
        if($validator->fails())
        {
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }
        else
        {
            $user = User::where('email', $request->email)->first();
            
            if(! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status'=>401,
                    'message'=>'Invalid Credentials',
                ]);
            }
            else
            if($user->role_as == 1){
                $role='admin';
                $token = $user->createToken($user->email.'_AdminToken',['server:admin'])->plainTextToken;
                
            }else{
                $role='null';
                $token = $user->createToken($user->email.'_Token',[''])->plainTextToken;
            }
            {
                return response()->json([
                    'status'=>200,
                    'username'=>$user->name,
                    'token'=>$token,
                    'user_id'=>$user->id,
                    "role"=>$role,
                    "verified_at"=>$user->email_verified_at,

                ]);
            }
        }
    }
    public function logout(Request $request){
        auth()->user()->tokens()->delete();
        return response()->json([
            'status'=>200,
            'message'=>"Logged out successfully"
        ]);
    }
    public function get_role(Request $request){
        return response()->json([
            'role'=>$request->user()->role_as,
        ]);
    }
    public function changePassword(Request $request){
        $validator =Validator::make($request->all(),[
            'oldPassword'=>'required',
            'newPassword'=>'required',
        ]);
        if($validator->fails())
        {
            $status=406;
            
        }else{
            $user = User::where('id', $request->user()->id)->first();
            if( Hash::check($request->oldPassword, $user->password)) {
                $user->password = Hash::make($request->newPassword);
                $user->save();
                $status = 200;
            }
            else{
                $status = 403;
            }
        }
        return response()->json([
            'status'=>$status
        ]);
    }
}
