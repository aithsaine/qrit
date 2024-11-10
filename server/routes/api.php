<?php

use App\Http\Middleware\LastSeen;
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

Route::middleware(['auth:sanctum',LastSeen::class])->get('/user', function (Request $request) {
    return response(["user"=>new UserResource( $request->user())]);
});

//category routes
Route::controller(\App\Http\Controllers\Api\CategoryController::class)->group(function(){
    Route::get("categories","index");
    Route::post("category/store","store");
    Route::delete('category/{id}/delete','destroy');
    Route::post("category/{id}/update","update");
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
})->middleware(["auth:sanctum",LastSeen::class]);

//employee Controller
Route::controller(App\Http\Controllers\Api\EmployeeController::class)->group(function(){
    Route::post("employee/store","store");
    Route::delete("employee/{id}/delete","destroy");
    Route::get("employee/{id}/dashboard","getOrdersForEmployeeTables");
})->middleware(["auth:sanctum"]);

//table controller
Route::controller(App\Http\Controllers\Api\TableController::class)->group(function(){
    Route::post("table/store","store");
})->middleware(["auth:sanctum"]);



Route::controller(App\Http\Controllers\Api\AuthenticationController::class)->group(function(){
    Route::post('/login',"login");
    Route::post("/logout","logout")->middleware(["auth:sanctum"]);
});

//menuNeeded Items 
Route::controller(App\Http\Controllers\Api\MenuNeededController::class)->group(function(){
    Route::get("menu","index");
});

//order controller
Route::controller(App\Http\Controllers\Api\OrderController::class)->group(function(){
    Route::post("order/create","createOrder");
    Route::post("orders/{id}/confirm","confirmOrder")->middleware("auth:sanctum");
    Route::get("orders/worker/{id}","getOrdersByWorker")->middleware("auth:sanctum");
    Route::get("orders/analytics","getCountOrdersForEachProduct")->middleware("auth:sanctum");
    Route::get("orders/workeroverview/{filterTime}","getEmployeeOrdersCountByTime")->middleware("auth:sanctum");
    });

    