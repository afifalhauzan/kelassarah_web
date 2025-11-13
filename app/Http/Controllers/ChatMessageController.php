<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessOpenAIResponse;
use App\Models\ChatMessage;
use Illuminate\Http\Request;

class ChatMessageController extends Controller
{
    /**
     * This method is now hit by the INITIAL page load AND all polls.
     * It MUST return an Inertia response.
     */
    public function index(Request $request, $courseId)
    {
        $validated = $request->validate([
            'user_id' => 'sometimes|integer',
        ]);

        $userId = $validated['user_id'] ?? auth()->id();

        // Get all messages for the chat
        $messages = ChatMessage::with(['user', 'course'])
            ->where('course_id', $courseId)
            ->where('user_id', $userId)
            ->orderBy('created_at', 'asc') // Order by ASC for display
            ->get();
        
        // This is the main page component for your chat
        // (You may need to change 'Chat/Show' to your component's name)
        return inertia('Chat/Show', [
            'course_id' => $courseId,
            
            // This 'messages' prop is what Inertia will use
            'messages' => $messages->map(fn ($msg) => [
                'id' => $msg->id,
                'role' => $msg->role,
                'content' => $msg->content,
                'created_at' => $msg->created_at,
            ]),
        ]);
    }
    
    /**
     * This method is hit by POST requests.
     * It MUST return a Redirect. This tells Inertia to refresh props.
     */
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

        // Redirect back. Inertia will see this and automatically
        // re-fetch the props from the `index` method.
        return redirect()->back();
    }

    /**
     * This method is NO LONGER NEEDED.
     * The new polling logic will just hit the 'index' method
     * for a partial reload. You can delete this method and its route.
     */
    // public function getLastMessage(Request $request, $courseId)
    // { ... }
}