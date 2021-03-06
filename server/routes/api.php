<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ResetPasswordController;
use App\Http\Controllers\Api\EmailVerificationController;
use App\Http\Controllers\Portfolio\PortfolioController;
use App\Http\Controllers\Portfolio\TransactionController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Share\DailyShareController;
use App\Http\Controllers\Share\CompanyDetailController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

Route::middleware(['auth:sanctum'])->group(function(){
    Route::post('/change',[AuthController::class,'changePassword']);


    Route::get('/sample',[TransactionController::class,'hello']);
    Route::post('/logout',[AuthController::class,'logout']);

    // Portfolio
    Route::post('/create-portfolio',[PortfolioController::class,'createPortfolio']);
    Route::get('/get-portfolio/{id}',[PortfolioController::class,'listUserPortfolio']);
    Route::get('/get-user-portfolio/{id}',[PortfolioController::class,'portfolioInvestment']);
    Route::get('/fetch-portfolio/{id}',[PortfolioController::class,'singlePortfolio']);
    Route::patch('/update-portfolio/{id}',[PortfolioController::class,'update']);
    Route::delete('/delete-portfolio/{id}',[PortfolioController::class,'destroy']);
    
    // Transaction 
    Route::post('/create-transaction',[TransactionController::class,'buyShare']);
    Route::post('/sell-transaction',[TransactionController::class,'sellShare']);
    Route::get('/get-average/{id}/{name}',[TransactionController::class,'average']);
    Route::get('/get-transaction/{id}',[TransactionController::class,'show']);
    Route::get('/get-singletransaction/{id}/{name}',[TransactionController::class,'singleTransaction']);
    Route::delete('/delete-singletransaction/{id}',[TransactionController::class,'destroy']);
    Route::post('/editbuy-transaction/{id}',[TransactionController::class,'editBuy']);
    Route::post('/editsell-transaction/{id}',[TransactionController::class,'editSell']);
    Route::get('/chart/{id}',[TransactionController::class,'chartbyName']);
    Route::get('/singlechart/{id}/{name}',[TransactionController::class,'singleGraph']);

    
    
    
    // User call
    Route::get('/callCompany/{id}',[App\Http\Controllers\Share\CompanyDetailController::class,'callCompany']);
    
    Route::get('/call',[DailyShareController::class,'call']);
    Route::get('/gainer',[DailyShareController::class,'gainer']);
});

Route::middleware(['auth:sanctum','isAPIAdmin'])->group(function(){
    Route::get('/checkAuthenticated',function(){
        return response()->json(['message'=>'You are in ', 'status'=>200],200);
    });
    
    Route::get('/dailycall',[AdminController::class,'dailyShare']);
    Route::get('/company',[AdminController::class,'importCompanyDetails']);
    Route::get('/user-list',[AdminController::class,'userList']);
    Route::get('/latest',[AdminController::class,'latest']);
}); 

Route::get('/chart',[AdminController::class,'charts']);

Route::post('/forgot-password',[ResetPasswordController::class,'forgotPassword']);
Route::post('/reset-password',[ResetPasswordController::class,'resetPassword']);

Route::post('/email/verification-notification',[EmailVerificationController::class, 'sendVerificationEmail'])->middleware('auth:sanctum');
Route::get('/verify-email/{id}/{hash}', [EmailVerificationController::class, 'verify'])->name('verification.verify')->middleware('auth:sanctum');