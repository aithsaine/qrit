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
        ]);

        $healthCondition = $request->input('message'); // Get message from React

        $response = $client->post('https://localhost:5000/recommend', [
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

        return response()->json([
            'suggestion' => $suggestion
        ]);
    }
}
