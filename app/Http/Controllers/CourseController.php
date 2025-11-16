<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::where('is_published', true)
            ->orderBy('order', 'asc')
            ->get()
            ->map(fn ($course) => [
                'id' => $course->id,
                'title' => $course->title,
                'description' => $course->description,
                'order' => $course->order,
                
                'thumbnail' => match ($course->order) {
                    1 => 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Logo_Budi_Utomo.png',
                    2 => 'https://upload.wikimedia.org/wikipedia/commons/7/77/Museum_Sumpah_Pemuda_01.jpg',
                    default => 'https://via.placeholder.com/320x160.png?text=' . $course->id,
                },
                'slug' => Str::slug($course->title),
                'progress' => 0, 
                'modulesCompleted' => 0,
                'totalModules' => $course->materials()->count() + $course->quizzes()->count(), 
            ]);

        return inertia('Courses', [ 
            'courses' => $courses,
        ]);
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

        // Redirect back or wherever appropriate
        return redirect()->route('course.index')->with('message', 'Course created successfully');
    }

    public function show(Course $course)
    {
        $materials = $course->materials()->orderBy('order', 'asc')->get()->map(fn ($material) => [
            'id' => $material->id,
            'title' => $material->title,
            'order' => $material->order,
            'lesson_type' => 'material',
            'material_type' => $material->type, // 'video' atau 'document'
            'content_text' => $material->content_text,
            'content_url' => $material->content_url,
        ]);

        $quizzes = $course->quizzes()->orderBy('order', 'asc')->get()->map(fn ($quiz) => [
            'id' => $quiz->id,
            'title' => $quiz->title,
            'order' => $quiz->order,
            'lesson_type' => 'quiz',
            'material_type' => null, 
            'content_text' => null,
            'content_url' => null,
        ]);

        $lessons = $materials->merge($quizzes)->sortBy('order')->values();

        return inertia('Course/Show', [
            'course' => [
                'id' => $course->id,
                'title' => $course->title,
                'description' => $course->description,
            ],
            'lessons' => $lessons 
        ]);
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'order' => 'sometimes|required|integer',
            'is_published' => 'sometimes|nullable|boolean',
            'knowledge_prompt' => 'sometimes|nullable|string',
            'welcome_message' => 'sometimes|nullable|string',
        ]);

        $course->update($validated);
        
        // Redirect back
        return redirect()->back()->with('message', 'Course updated successfully');
    }

    public function destroy(Course $course)
    {
        $course->delete();
        
        return redirect()->route('course.index')->with('message', 'Course deleted successfully');
    }
}