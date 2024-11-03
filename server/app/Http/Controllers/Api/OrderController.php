<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Middleware\LastSeen;
use App\Http\Resources\OrderResource;
use App\Models\Employee;
use App\Models\Order;
use App\Models\OrderConfirm;
use App\Models\OrderItem;
use App\Models\User;
use Error;
use Illuminate\Http\Request;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;
use Endroid\QrCode\Encoding\Encoding;
use Exception;
use Illuminate\Support\Facades\File;

class OrderController extends Controller
{
   
    public function createOrder(Request $request)
    {
        try {
            $order = new Order();
            $order->table_id = $request->table;
            $order->status = "pending";
            $order->save();
            foreach ($request->products as $product) {
                $item = new OrderItem();
                $item->product_id = $product["id"];
                $item->order_id = $order->id;
                $item->price = $product["price"];
                $item->quantity = $product["quantity"];
                $item->save();
            }
            $url = "/api/orders/{$order->id}/confirm";

            $writer = new PngWriter();

            // Create a new QR code instance
            $qrCode = QrCode::create($url)
                ->setEncoding(new Encoding('UTF-8'))
                ->setSize(300)
                ->setMargin(10);
            // Set the icon for the QR code
            $iconPath = public_path('logo.png'); // Make sure the icon is available here
            $icon = \Endroid\QrCode\Logo\Logo::create($iconPath)
                ->setResizeToWidth(50);

            // Generate the QR code with the icon
            $result = $writer->write($qrCode, $icon);

            $directoryPath = public_path('qrcodes');
            $filePath = "{$directoryPath}/order_{$order->id}.png";
        
            // Ensure the 'qrcodes' directory exists
            File::ensureDirectoryExists($directoryPath, 0775, true);
        
            // Generate and save the QR code
            $result->saveToFile($filePath);
        
            // Return the public URL for the QR code image
            return response()->json(['qr_code_url' => "order_{$order->id}.png"]);
        
        } catch (Error $error) {
            return response($error, 500);
        }
    }


    public function confirmOrder(Request $request, $id)
{
    try {
        $order = Order::where("id", $id)->first();

        // Check if order exists
        if (!$order) {
            return response(["message" => "Order not found"], 404);
        }
        $user = User::find($request->id);
        // Create and save the OrderConfirm
        $order_confirm = new OrderConfirm();
        $order_confirm->order_id = $id;
        $order_confirm->employee_id =$user->employee->id;

        if(OrderConfirm::where("order_id",$id)->first())
        {
           
            return response(["message" => "order already confirmed", "success"=>false], 200);
        }
        // Update and save the Order status
        $order->status = "confirmed";
        $order->save();
        $order_confirm->save();
        // Order::where("table_id",$order->table_id)->where("status","pending")->delete();
        return response(["table"=>$order->table_id,"message" => "Order confirmed successfully", "success"=>true], 200);
    } catch (Exception $error) {
        return response(["error" => $error->getMessage()], 500);
    }finally{
        $user->last_seen = now();
        $user->save();
    }
}

public function getOrdersByWorker ($id)
{
    try{
        $employee = Employee::find($id);
        $confirmedOrders = $employee->order_confirm()->with('order')->get();

        // Extract order IDs from confirmed orders
        $orderIds = $confirmedOrders->pluck('order_id')->unique();
    
        // Get all orders associated with the confirmed orders
        $orders = Order::whereIn('id', $orderIds)->get();
    

        return response(OrderResource::collection($orders));

    }catch(Error $error)
    {
        return response(["message"=>"somethink went wrong"],500);
    }
}

}
