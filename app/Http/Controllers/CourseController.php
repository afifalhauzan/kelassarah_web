<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

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
                'thumbnail_url' => $course->thumbnail_url,
                'description' => $course->description,
                'order' => $course->order,
                'thumbnail' => $course->thumbnail_url,
                'slug' => Str::slug($course->title),
                'progress' => 0, 
                'modulesCompleted' => 0,
                'totalModules' => $course->materials()->count() + $course->quizzes()->count(), 
            ]);

        return inertia('Guru/TambahCourse', [ 
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
            'thumbnail_url' => 'nullable|string',
        ]);

        $course = Course::create($validated);

        return inertia('Guru/TambahCourse', [
            'courses' => Course::where('is_published', true)
                ->orderBy('order', 'asc')
                ->get()
                ->map(fn ($c) => [
                    'id' => $c->id,
                    'title' => $c->title,
                    'thumbnail_url' => $c->thumbnail_url,
                    'description' => $c->description,
                    'order' => $c->order,
                    'is_published' => $c->is_published,
                    'knowledge_prompt' => $c->knowledge_prompt,
                    'welcome_message' => $c->welcome_message,
                    'created_at' => $c->created_at
                ]),
            'message' => 'Course created successfully',
            'newCourse' => [
                'id' => $course->id,
                'title' => $course->title,
                'thumbnail_url' => $course->thumbnail_url,
                'description' => $course->description,
                'order' => $course->order,
                'is_published' => $course->is_published,
                'knowledge_prompt' => $course->knowledge_prompt,
                'welcome_message' => $course->welcome_message,
                'created_at' => $course->created_at
            ]
        ]);
    }

   public function show(Course $course)
    {
        $userId = Auth::id();
        $completedQuizIds = Quiz::where('course_id', $course->id)
            ->whereHas('questions.userAnswers', fn($query) => 
                $query->where('user_id', $userId)
            )
            ->pluck('id')
            ->flip();

        $materials = $course->materials()->orderBy('order', 'asc')->get()->map(fn ($material) => [
            'id' => $material->id,
            'title' => $material->title,
            'order' => $material->order,
            'lesson_type' => 'material',
            'material_type' => $material->type, 
            'content_text' => $material->content_text,
            'content_url' => $material->content_url,
            'is_completed' => false,
        ]);

        $quizzes = $course->quizzes()->orderBy('order', 'asc')->get()->map(fn ($quiz) => [
            'id' => $quiz->id,
            'title' => $quiz->title,
            'order' => $quiz->order,
            'lesson_type' => 'quiz', 
            'material_type' => null, 
            'content_text' => null,
            'content_url' => null,
            'is_completed' => $completedQuizIds->has($quiz->id),
        ]);

        $lessons = $materials->merge($quizzes)->sortBy('order')->values();

        return inertia('Guru/TambahCourse', [
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

        return inertia('Guru/TambahCourse', [
            'course' => [
                'id' => $course->id,
                'title' => $course->title,
                'thumbnail_url' => $course->thumbnail_url,
                'description' => $course->description,
                'order' => $course->order,
                'is_published' => $course->is_published,
                'knowledge_prompt' => $course->knowledge_prompt,
                'welcome_message' => $course->welcome_message,
                'created_at' => $course->created_at
            ],
            'materials' => $course->materials()->get()->map(fn ($material) => [
                'id' => $material->id,
                'title' => $material->title,
                'content' => $material->content,
                'order' => $material->order,
                'created_at' => $material->created_at
            ]),
            'message' => 'Course updated successfully'
        ]);
    }

    public function destroy(Course $course)
    {
        $course->delete();
        
        return inertia('Guru/TambahCourse', [
            'courses' => Course::where('is_published', true)
                ->orderBy('order', 'asc')
                ->get()
                ->map(fn ($c) => [
                    'id' => $c->id,
                    'title' => $c->title,
                    'thumbnail_url' => $c->thumbnail_url,
                    'description' => $c->description,
                    'order' => $c->order,
                    'is_published' => $c->is_published,
                    'knowledge_prompt' => $c->knowledge_prompt,
                    'welcome_message' => $c->welcome_message,
                    'created_at' => $c->created_at
                ]),
            'message' => 'Course deleted successfully'
        ]);
    }
}