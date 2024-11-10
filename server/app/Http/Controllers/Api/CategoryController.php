<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
                return response(["message"=>"category created with success","category"=>new CategoryResource($category)]);
            }
            return response(["error"=>"somethink went wrong"],501);

        }catch(ValidationException $e){
            return response( $e->errors(),500);
        }
    }

    public function destroy($id)
    {
        try{
            $product = Category::find($id);
            $removeImage = Storage::delete('categories/'.$product->image);
            if($removeImage)
            {
                $product->delete();
                return response(["message"=>"this category deleted"]);
            }
            return response(["error"=>"somethink went wrong"],500);
    
           }catch(Error $e)
           {
            return response(["error"=>"somethink went wrong"],500);
    
    
           }
    }


    public function update(Request $request, $id){
        try{
            $request->validate([
                "name"=>"required",
                "description"=>"required",
                "image"=>"mimes:png,jpg,webp,svg"
                ]);
            $category = Category::find($id);
            $category->name = $request->name;
            $category->description = $request->description;
            if($request->image)
            {
                $newImageName = Str::random(6).".".$request->file("image")->getClientOriginalExtension();
                $save = $request->file('image')->move(public_path("categories"), $newImageName);
                if($save){
                    $category->image = $newImageName;
                }    

            }
            $category->save();
            return response(["message"=>"category updated with success","category"=>new CategoryResource($category)]);



        }catch(ValidationException $error)
        {
            return response( $error->errors(),500);
        }

    }
}
