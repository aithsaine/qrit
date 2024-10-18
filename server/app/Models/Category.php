<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Category extends Model
{
    protected $fillable = ["name","image","description"];


    public static function validate(Request $request){
        $request->validate([
            "name"=>"required|unique:categories,name",
            "description"=>"required",
            "image"=>"required|mimes:png,jpg,webp"
        ]);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    
}
