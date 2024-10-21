<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Order extends Model
{
    //
    protected $fillable = ["table_id"];


    public static function validate(Request $request)
    {
        $request->validate([
            "table"=>"required|exists:tables:id",
            "products"=>"required"
        ]);
    }
}
