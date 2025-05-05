<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Response;

class FlaskapiController extends Controller
{
    public function generateRecipe(Request $request)
    {
        try {
            $flaskUrl = env('FLASK_API_URL');

            $response = Http::timeout(100)->post($flaskUrl, [
                'goal' => $request->input('goal'),
                'max_length' => $request->input('max_length', 300),
                'temperature' => $request->input('temperature', 0.7),
                'parse' => true,
            ]);
            ;
    
            if ($response->successful()) {
                return response()->json($response->json());
            } else {
                \Log::error('Flask error response', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
    
                return response()->json([
                    'error' => 'Failed to fetch recipe.',
                    'flask_error' => $response->body()
                ], 500);
            }
        } catch (\Exception $e) {
            \Log::error('Exception calling Flask API', [
                'message' => $e->getMessage()
            ]);
    
            return response()->json(['error' => 'Flask API unavailable.', 'details' => $e->getMessage()], 500);
        }
}}
