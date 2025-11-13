<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessOpenAIResponse;
use App\Models\ChatMessage;
use App\Models\Course;
use Illuminate\Http\Request;

class ChatMessageController extends Controller
{
    public function index(Course $course)
    {
        // Load messages for the course and authenticated user
        $messages = $course->messages()
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn ($msg) => [
                'id' => $msg->id,
                'role' => $msg->role,
                'content' => $msg->content,
                'created_at' => $msg->created_at
            ]);

        return inertia('ChatProvider', [
            'course' => $course,
            'messages' => $messages,
        ]);
    }
    
    public function store(Request $request, Course $course)
    {
        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        $validated['course_id'] = $course->id;
        $validated['user_id'] = auth()->id();
        $validated['role'] = 'user';

        $dataPost = ChatMessage::create($validated);

        ProcessOpenAIResponse::dispatch($dataPost->id, $validated['user_id'], $validated['course_id'], $validated['content']);

        return inertia('ChatProvider', [
            'course' => $course,
            'status' => 'pending',
            'messages' => $course->messages()
                ->where('user_id', auth()->id())
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(fn ($msg) => [
                    'id' => $msg->id,
                    'role' => $msg->role,
                    'content' => $msg->content,
                    'created_at' => $msg->created_at
                ])
        ]);
    }

    public function getLastMessage(Course $course)
    {
        $lastMessage = $course->messages()
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->first();

        if ($lastMessage) {
            return response()->json([
                'id' => $lastMessage->id,
                'role' => $lastMessage->role,
                'content' => $lastMessage->content,
                'created_at' => $lastMessage->created_at
            ]);
        } else {
            return response()->json(['message' => 'No messages found'], 404);
        }
    }
}
