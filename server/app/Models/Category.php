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
            "name"=>"required",
            "description"=>"required",
            "image"=>"required|mimes:png,jpg,webp,svg"
        ]);
    }
    protected static function boot()
    {
        parent::boot();

        // Listen for the deleting event
        static::deleting(function ($category) {
            if (!$category->isForceDeleting()) {
                // Only soft delete related products
                $category->products()->delete();
            }
        });
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
