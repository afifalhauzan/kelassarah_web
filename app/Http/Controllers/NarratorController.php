<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log; // Import Log facade

class NarratorController extends Controller
{
    public function narrate(Request $request)
    {
        try {
            // DEBUG: Log that we actually hit the endpoint
            Log::info('Narrator: Endpoint hit.');
            
            $text = $request->input('text');
            
            // DEBUG: Log the text received
            Log::info('Narrator: Text received', ['text' => $text]);

            if (!$text) {
                return response()->json(['error' => 'No text provided'], 400);
            }

            $apiKey = env('ELEVENLABS_API_KEY');
            $voiceId = env('ELEVENLABS_VOICE_ID', '21m00Tcm4TlvDq8ikWAM'); // Fallback to Rachel

            // DEBUG: Check if API key is actually loaded
            if (empty($apiKey)) {
                Log::error('Narrator: API Key is MISSING. Check .env file.');
                throw new \Exception('Server configuration error: ELEVENLABS_API_KEY is missing.');
            }

            $url = "https://api.elevenlabs.io/v1/text-to-speech/" . $voiceId . "/stream";

            // Make the request
            $response = Http::withoutVerifying()->withHeaders([
                'xi-api-key' => $apiKey,
                'Content-Type' => 'application/json',
            ])->post($url, [
                'text' => $text,
                'model_id' => 'eleven_turbo_v2_5',
                'voice_settings' => [
                    'stability' => 0.5,
                    'similarity_boost' => 0.5
                ]
            ]);

            // DEBUG: Check if ElevenLabs returned an error (like 401 Unauthorized or Quota Exceeded)
            if ($response->failed()) {
                Log::error('Narrator: ElevenLabs API Failed', [
                    'status' => $response->status(),
                    'body' => $response->json()
                ]);
                return response()->json([
                    'error' => 'ElevenLabs API Error',
                    'details' => $response->json()
                ], $response->status());
            }

            return response($response->body(), 200, [
                'Content-Type' => 'audio/mpeg',
                'Cache-Control' => 'no-cache',
            ]);

        } catch (\Exception $e) {
            // DEBUG: Catch any PHP crashes and send them to frontend
            Log::error('Narrator: PHP Exception', ['message' => $e->getMessage()]);
            
            return response()->json([
                'error' => 'Server Exception', 
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ], 500);
        }
    }
}