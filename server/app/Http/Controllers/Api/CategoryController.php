<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class CategoryController extends Controller
{
    public function index(){
        $categroies  = Category::all();
        return response($categroies);
    }
    public function store (Request $request){
        try{
            Category::validate($request);
            $category = new Category();
            $category->name = $request->name;
            $category->description = $request->description;
            $newImageName = Str::random(6).".".$request->file("image")->getClientOriginalExtension();
            $save = $request->file('image')->move(public_path("categories"), $newImageName);
            if($save){
                $category->image = $newImageName;
                $category->save();
                return response(["message"=>"category created with success","category"=>$category]);
            }
            return response(["error"=>"somethink went wrong"],501);

        }catch(ValidationException $e){
            return response( $e->errors(),500);
        }
    }
}
