<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//category routes
Route::controller(\App\Http\Controllers\Api\CategoryController::class)->group(function(){
    Route::get("categories","index");
    Route::post("category/store","store");
});
//product routes 
Route::controller(App\Http\Controllers\Api\ProductController::class)->group(function(){
    Route::get("products","index");
    Route::post("product/store","store");
    Route::delete("product/{id}/delete","destroy");
});

//home controller
Route::controller(App\Http\Controllers\Api\HomeController::class)->group(function(){
    Route::get("home","index");
});

//employee Controller
Route::controller(App\Http\Controllers\Api\EmployeeController::class)->group(function(){
    Route::post("employee/store","store");
    Route::delete("employee/{id}/delete","destroy");
});

//table controller
Route::controller(App\Http\Controllers\Api\TableController::class)->group(function(){
    Route::post("table/store","store");
});

// //order controller
// Route::controller(App\Http\Controllers\Api\OrderController::class)->group(function(){
//     Route::post("order/store","store");
// });