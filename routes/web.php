<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\ProfileController;
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
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/courses', function () {
    return Inertia::render('Courses');
})->middleware(['auth', 'verified'])->name('courses');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('course')->group(function () {
    Route::get('/', [CourseController::class, 'index'])->name('course.index');
    Route::get('/{course_id}', [CourseController::class, 'show'])->name('course.show');
    Route::post('/', [CourseController::class, 'store'])->name('course.store');
    Route::put('/{course_id}', [CourseController::class, 'update'])->name('course.update');
    Route::delete('/{course_id}', [CourseController::class, 'destroy'])->name('course.destroy');

    Route::prefix('{course_id}/material')->group(function () {
        Route::get('/', [MaterialController::class, 'index'])->name('material.index');
        Route::get('/{material_id}', [MaterialController::class, 'show'])->name('material.show');
        Route::post('/', [MaterialController::class, 'store'])->name('material.store');
        Route::put('/{material_id}', [MaterialController::class, 'update'])->name('material.update');
        Route::delete('/{material_id}', [MaterialController::class, 'destroy'])->name('material.destroy');
    });
});


require __DIR__ . '/auth.php';
