<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;

class Category extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = ["name","image","description"];
    public static function validate(Request $request){
        $request->validate([
            "name"=>"required|unique:categories,name",
            "description"=>"required",
            "image"=>"required|mimes:png,jpg,webp,svg"
        ]);
    }
}
