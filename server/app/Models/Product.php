<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Product extends Model
{
    protected $fillable = ["category_id","name","price","image","desription"];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public static function validate(Request $request)
    {
        $request->validate(
            [
            "category"=> "required|exists:categories,id",
            "name"=>"required",
            "price"=>"required",
            "image"=>"required|mimes:png,jpg,webp",
            "decription"=>"string"

        ]);
    }

}
