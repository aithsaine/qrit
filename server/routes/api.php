<?php

use App\Http\Resources\UserResource;
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
    return response(["user"=>new UserResource( $request->user())]);
});

//category routes
Route::controller(\App\Http\Controllers\Api\CategoryController::class)->group(function(){
    Route::get("categories","index");
    Route::post("category/store","store");
})->middleware("auth:sanctum");
//product routes 
Route::controller(App\Http\Controllers\Api\ProductController::class)->group(function(){
    Route::get("products","index");
    Route::post("product/store","store");
    Route::delete("product/{id}/delete","destroy");
})->middleware("auth:sanctum");

//home controller
Route::controller(App\Http\Controllers\Api\HomeController::class)->group(function(){
    Route::get("home","index");
})->middleware("auth:sanctum");

//employee Controller
Route::controller(App\Http\Controllers\Api\EmployeeController::class)->group(function(){
    Route::post("employee/store","store");
    Route::delete("employee/{id}/delete","destroy");
})->middleware("auth:sanctum");

//table controller
Route::controller(App\Http\Controllers\Api\TableController::class)->group(function(){
    Route::post("table/store","store");
})->middleware("auth:sanctum");

// //order controller
// Route::controller(App\Http\Controllers\Api\OrderController::class)->group(function(){
//     Route::post("order/store","store");
// });
Route::controller(App\Http\Controllers\Api\AuthenticationController::class)->group(function(){
    Route::post('/login',"login");
    Route::post("/logout","logout")->middleware("auth:sanctum");
});