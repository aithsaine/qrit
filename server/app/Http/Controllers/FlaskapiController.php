<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class FlaskapiController extends Controller
{
    public function ask(Request $request)
    {
        $client = new Client([
            'verify' => false, // Disable SSL verification for localhost
            'timeout' => 10,   // 🔥 Add timeout (10 seconds max waiting)
        ]);

        $healthCondition = $request->input('message'); // Get message from React

        try {
            $response = $client->post('http://localhost:5000/recommend', [
                'json' => [
                    'health_condition' => $healthCondition, // Important: Flask expects 'health_condition'
                ],
            ]);

            $body = json_decode($response->getBody(), true);

            if (isset($body['recommendations'])) {
                $suggestion = "Recommended foods:\n- " . implode("\n- ", $body['recommendations']);
            } else {
                $suggestion = $body['error'] ?? 'Sorry, could not fetch recommendations.';
            }

        } catch (\Exception $e) {
            $suggestion = '⚠️ Error connecting to the recommendation server.';
        }

        return response()->json([
            'suggestion' => $suggestion
        ]);
    }
}
