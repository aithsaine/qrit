<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Error;
use Illuminate\Http\Request;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;
use Endroid\QrCode\Encoding\Encoding;
use Illuminate\Support\Facades\Storage;

class OrderController extends Controller
{
    public function createsOrder(Request $request)
    {
        try {


            $order = new Order();
            $order->table_id = $request->table;
            $order->status = "pending";
            $order->save();
            foreach ($request->products as $product) {
                $item = new OrderItem();
                $item->product_id = $product->id;
                $item->order_id = $order->id;
                $item->price = $product->price;
                $item->quantity = $product->quantity;
                $item->save();
            }
            $url = url("/api/orders/{$order->id}/confirm");

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

            // Save the generated QR code
            $filePath = "qrcodes/order_{$order->id}.png";
            Storage::put("public/$filePath", $result->getString());
            return response()->json(['qr_code_url' => Storage::url("public/$filePath")]);
        } catch (Error $error) {
            return response($error, 500);
        }
    }
}
