<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        try{
            Order::validate($request);
            $order = new Order();
            $order->table_id = $request->table;
            $order->save();
            foreach($request->products as $product)
            {
                $item = new OrderItem();
                $item->order_id = $order->id; 
                $item->product_id= $product->id;
                $item->price = $product->price;
                $item->quantity = $product->quantity;
                $item->description = $product->description;
                $item->save();
            } 
            return response(["message"=>"your order saved with success"]);
        }catch(ValidationException $error)
        {
            return response($error->errors(),500);
        }
    }
}
