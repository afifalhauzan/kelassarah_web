<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessOpenAIResponse;
use App\Models\ChatMessage;
use Illuminate\Http\Request;

class ChatMessageController extends Controller
{
    public function index(Request $request, $courseId)
    {
        $validated = $request->validate([
            'user_id' => 'sometimes|integer',
        ]);

        $messages = ChatMessage::with(['user', 'course'])->where('course_id', $courseId)->where('user_id', $validated['user_id'] ?? auth()->id())->orderBy('created_at', 'desc')->get();
        return response()->json($messages);
    }
    
    public function store(Request $request, $courseId)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'user_id' => 'sometimes|integer',
        ]);

        $validated['course_id'] = $courseId;
        $validated['user_id'] = $validated['user_id'] ?? auth()->id();
        $validated['role'] = 'user';

        $dataPost = ChatMessage::create($validated);

        ProcessOpenAIResponse::dispatch($dataPost->id, $validated['user_id'], $validated['course_id'], $validated['content']);

        return response()->json([
            'course_id' => $dataPost['course_id'],
            'status' => "pendding",
        ], 201);
    }

    public function getLastMessage(Request $request, $courseId)
    {
        $validated = $request->validate([
            'user_id' => 'sometimes|integer',
        ]);

        $lastMessage = ChatMessage::where('course_id', $courseId)
            ->where('user_id', $validated['user_id'] ?? auth()->id())
            ->orderBy('created_at', 'desc')
            ->first();

        if ($lastMessage) {
            return response()->json($lastMessage);
        } else {
            return response()->json(['message' => 'No messages found'], 404);
        }
    }
}
