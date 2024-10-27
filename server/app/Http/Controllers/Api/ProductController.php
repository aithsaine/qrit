<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();

        return response()->json(
            $products);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            Product::validate($request);
            $product = new Product();
            $product->name = $request->name;
            $product->category_id = $request->category;
            $product->price = $request->price;
            $product->description = $request->description;
            $newImageName = Str::random(6).".".$request->file("image")->getClientOriginalExtension();
           $save = $request->file('image')->move(public_path("products"), $newImageName);

            if($save){
                $product->image = $newImageName;
                $product->save();
                return response(["message"=>"product created with success","product"=>$product]);
            }
            return response(["error"=>"somethink went wrong"],501);
        }catch(ValidationException $e){
            return response( $e->errors(),500);
        }    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
       try{
        $product = Product::find($id);
        $removeImage = Storage::delete('products/'.$product->image);
        if($removeImage)
        {
            $product->delete();
            return response(["message"=>"this product deleted"]);
        }
        return response(["error"=>"somethink went wrong"],500);

       }catch(Error $e)
       {
        return response(["error"=>"somethink went wrong"],500);


       }
    }
}
