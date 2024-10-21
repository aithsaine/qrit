<?php

use App\Http\Controllers\Api\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//category routes
Route::controller(CategoryController::class)->group(function(){
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
    Route::delete("product/{id}/delete","destroy");
});