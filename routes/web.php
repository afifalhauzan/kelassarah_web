<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ChatMessageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;

Route::get('/', function () {
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
    return Inertia::render('LandingPage', [
        // 'canLogin' => Route::has('login'),
        // 'canRegister' => Route::has('register'),
        // 'laravelVersion' => Application::VERSION,
        // 'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/load-test', function () {
    try {
        $user = User::first();
        if ($user) {
            return response()->json($user);
        } else {
            return response()->json(['error' => 'No users found'], 404);
        }
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::get('/load-test-write', function () {
    try {
        // 1. Ambil user pertama
        // Kita asumsikan user ini ada, berdasarkan tes Anda sebelumnya
        $user = User::first();

        if (!$user) {
            return response()->json(['error' => 'No users found. Please seed the database.'], 404);
        }

        // 2. Lakukan operasi TULIS (WRITE)
        // Ini adalah bagian krusial yang mengalahkan cache
        $user->update([
            'name' => 'Load Test ' . Str::random(10)
        ]);

        // 3. Kembalikan data yang baru saja ditulis
        return response()->json($user);
    } catch (\Exception $e) {
        // DI SINI PENTING:
        // Di bawah load test, Anda MUNGKIN akan mendapat error 500
        // seperti "Lock wait timeout exceeded" atau "Deadlock found".
        // Ini NORMAL dan inilah yang sedang kita uji.
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::get('/dashboard', function () {
    $courses = \App\Models\Course::where('is_published', true)
        ->orderBy('order', 'asc')
        ->get()
        ->map(fn ($course) => [
            'id' => $course->id,
            'title' => $course->title,
            'description' => $course->description,
            'order' => $course->order,
            'is_published' => $course->is_published,
            'knowledge_prompt' => $course->knowledge_prompt,
            'welcome_message' => $course->welcome_message,
            'created_at' => $course->created_at
        ]);

    return Inertia::render('Dashboard', [
        'courses' => $courses
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/courses', function () {
    return Inertia::render('Courses');
})->middleware(['auth', 'verified'])->name('courses');

Route::get('/bot-test', function () {
    return Inertia::render('BotTestPage');
})->middleware(['auth', 'verified'])->name('bot-test');

Route::get('/chat-test', function () {
    return Inertia::render('ChatTestPage');
})->middleware(['auth', 'verified'])->name('chat-test');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/chat/{course_id}', [ChatMessageController::class, 'index']);
    Route::get('/chat/{course_id}/last', [ChatMessageController::class, 'getLastMessage']);
    Route::post('/chat/{course_id}', [ChatMessageController::class, 'store']);
});

Route::prefix('course')->group(function () {
    Route::get('/', [CourseController::class, 'index'])->name('course.index');
    Route::get('/{course}', [CourseController::class, 'show'])->name('course.show');
    Route::post('/', [CourseController::class, 'store'])->name('course.store');
    Route::put('/{course}', [CourseController::class, 'update'])->name('course.update');
    Route::delete('/{course}', [CourseController::class, 'destroy'])->name('course.destroy');

    Route::prefix('{course}/material')->group(function () {
        Route::get('/', [MaterialController::class, 'index'])->name('material.index');
        Route::get('/{material}', [MaterialController::class, 'show'])->name('material.show');
        Route::post('/', [MaterialController::class, 'store'])->name('material.store');
        Route::put('/{material}', [MaterialController::class, 'update'])->name('material.update');
        Route::delete('/{material}', [MaterialController::class, 'destroy'])->name('material.destroy');
    });
});


require __DIR__ . '/auth.php';