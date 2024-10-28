<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class MenuNeededController extends Controller
{
    public function index()
    {
        $categories = CategoryResource::collection(Category::all());
        $products = ProductResource::collection(Product::all());
        return response()->json(["products"=>$products,"categories"=>$categories]);
    }}
