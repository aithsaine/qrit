<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\TableResource;
use App\Models\Category;
use App\Models\Employee;
use App\Models\Product;
use App\Models\Table;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(){
        $products = ProductResource::collection(Product::all());
        $employees = EmployeeResource::collection(Employee::all());
        $categories = CategoryResource::collection(Category::all());
        $tables = TableResource::collection(Table::all());
        return response()->json(["categories"=>$categories,"products"=>$products,"employees"=>$employees, "tables"=>$tables]);
    
    }

}
