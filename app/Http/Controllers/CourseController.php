<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

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
                
                // --- REVISI THUMBNAIL DI SINI ---
                'thumbnail' => match ($course->order) {
                    1 => 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Logo_Budi_Utomo.png', // Gambar Budi Utomo
                    2 => 'https://upload.wikimedia.org/wikipedia/commons/7/77/Museum_Sumpah_Pemuda_01.jpg', // Gambar Museum Sumpah Pemuda
                    default => 'https://via.placeholder.com/320x160.png?text=' . $course->id, // Placeholder
                },
                'slug' => \Illuminate\Support\Str::slug($course->title),
                'progress' => 0, 
                'modulesCompleted' => 0,
                'totalModules' => $course->materials()->count() > 0 ? $course->materials()->count() : 5, 
                // --- AKHIR REVISI ---

                'order' => $course->order,
                'is_published' => $course->is_published,
                'knowledge_prompt' => $course->knowledge_prompt,
                'welcome_message' => $course->welcome_message,
                'created_at' => $course->created_at
            ]);

        return inertia('Course/Index', [
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

        return inertia('Course/Index', [
            'courses' => Course::where('is_published', true)
                ->orderBy('order', 'asc')
                ->get()
                ->map(fn ($c) => [
                    'id' => $c->id,
                    'title' => $c->title,
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
        return inertia('Course/Show', [
            'course' => [
                'id' => $course->id,
                'title' => $course->title,
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
            ])
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

        return inertia('Course/Show', [
            'course' => [
                'id' => $course->id,
                'title' => $course->title,
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
        
        return inertia('Course/Index', [
            'courses' => Course::where('is_published', true)
                ->orderBy('order', 'asc')
                ->get()
                ->map(fn ($c) => [
                    'id' => $c->id,
                    'title' => $c->title,
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