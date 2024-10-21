<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class OrderItem extends Model
{
    //
    protected $fillable = ["product_id","order_id","quantity","price","description"];

    public static function validate(Request $request)
    {
        $request->validate([
            "product"=>"required|exists:products,id",
            "order"=>"required|exists:orders,id",
            "quantity"=>"required",
            "price"=>"required",
        ]);
    }
}
