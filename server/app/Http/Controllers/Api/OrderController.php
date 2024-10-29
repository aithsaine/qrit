<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderConfirm;
use App\Models\OrderItem;
use Error;
use Illuminate\Http\Request;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;
use Endroid\QrCode\Encoding\Encoding;
use Exception;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

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


    public function confirmOrder(Request $request,$id)
    {
        try{
            $order = Order::where("id",$id)->first();
            $order_confirm = new OrderConfirm();
            $order_confirm->order_id = $id;
            $order_confirm->$request->employee_id;
            $order->status = "confirmed";
            $order->save();
            $order_confirm->save();
            return response(["message"=>"order confirmed with success"]);

        }catch(Exception $error)
        {
            return response($error, 500);

        }
    }
}
