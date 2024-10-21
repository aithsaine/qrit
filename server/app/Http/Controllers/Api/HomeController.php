<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Employee;
use App\Models\Product;
use App\Models\Table;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(){
        $products = Product::all();
        $employees = Employee::all();
        $categories = Category::all();
        $tables = Table::all();
        return response()->json(["categories"=>$categories,"products"=>$products,"employees"=>$employees, "tables"=>$tables]);
    
    }

}
