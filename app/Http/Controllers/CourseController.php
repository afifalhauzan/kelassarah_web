<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::where('is_published', true)->get();
        return response()->json($courses);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'order' => 'required|integer',
            'is_published' => 'nullable|boolean',
            'knowledge_prompt' => 'nullable|string',
            'welcome_message' => 'nullable|string',
        ]);

        $course = Course::create($validated);

        return response()->json($course, 201);
    }

    public function show($id)
    {
        $course = Course::findOrFail($id);
        return response()->json($course);
    }

    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'order' => 'sometimes|required|integer',
            'is_published' => 'sometimes|nullable|boolean',
            'knowledge_prompt' => 'sometimes|nullable|string',
            'welcome_message' => 'sometimes|nullable|string',
        ]);

        $course->update($validated);

        return response()->json($course);
    }

    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();
        return response()->json(null, 204);
    }
}
