<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Employee;
use App\Models\Product;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(){
        $products = Product::all();
        $employees = Employee::all();
        $categories = Category::all();
        return response()->json(["categories"=>$categories,"products"=>$products,"employees"=>$employees]);
    
    }

}
