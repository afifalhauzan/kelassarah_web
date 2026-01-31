<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseGuruController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ChatMessageController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\NarratorController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Course;
use App\Models\Informasi;

// Route::get('/', function () {
// return Inertia::render('Welcome', [
//     'canLogin' => Route::has('login'),
//     'canRegister' => Route::has('register'),
//     'laravelVersion' => Application::VERSION,
//     'phpVersion' => PHP_VERSION,
// ]);
// return Inertia::render('LandingPage', [
// 'canLogin' => Route::has('login'),
// 'canRegister' => Route::has('register'),
// 'laravelVersion' => Application::VERSION,
// 'phpVersion' => PHP_VERSION,
// ]);
// });

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
        $user = User::first();

        if (!$user) {
            return response()->json(['error' => 'No users found. Please seed the database.'], 404);
        }

        $user->update([
            'name' => 'Load Test ' . Str::random(10)
        ]);

        // 3. Kembalikan data yang baru saja ditulis
        return response()->json($user);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

// Route::domain(env('APP_TEACHER_DOMAIN'))->group(function () {
Route::prefix('guru')->group(function () {

    Route::get('/', function () {
        return redirect()->route('login');
    });

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('guru.logout');

    Route::middleware(['auth', 'verified'])->group(function () {
        // Teacher Dashboard
        // Route::get('/dashboard', function () {
        //     return Inertia::render('Guru/GuruDashboard', [
        //         'message' => 'Welcome, Guru.'
        //     ]);
        // })->name('guru.dashboard');

        // Profile routes for teachers
        Route::get('/profile', [ProfileController::class, 'edit'])->name('guru.profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('guru.profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('guru.profile.destroy');

        // Course Management for teachers
        Route::get('/', [CourseGuruController::class, 'index'])->name('guru.main');

        // Course Management for teachers
        Route::get('/course', [CourseGuruController::class, 'course'])->name('guru.course.create');

        // Add edit route
        Route::get('/course/edit/{course}', [CourseGuruController::class, 'show'])->name('guru.course.edit');
        Route::post('/course/add', [CourseGuruController::class, 'store'])->name('guru.course.store');
        Route::put('/course/{course}', [CourseGuruController::class, 'update'])->name('guru.course.update');
        Route::delete('/course/{course}', [CourseGuruController::class, 'destroy'])->name('guru.course.destroy');

        // Material Management for teachers
        Route::get('/tambah-materi', [CourseGuruController::class, 'createMaterial'])->name('guru.material.create');
        Route::post('/material', [MaterialController::class, 'store'])->name('guru.material.store');
        Route::put('/material/{material}', [MaterialController::class, 'update'])->name('guru.material.update');
        Route::delete('/material/{material}', [MaterialController::class, 'destroy'])->name('guru.material.destroy');
    });
});

/*
|--------------------------------------------------------------------------
| DOMAIN 2: STUDENTS / PUBLIC (kelassarah.id)
|--------------------------------------------------------------------------
| The Learning Area.
*/
// Route::domain(env('APP_DOMAIN'))->group(function () {
Route::middleware('web')->group(function () {

    // Public Landing
    Route::get('/', function () {
        return Inertia::render('LandingPage');
    });

    // Serve offline pages for PWA
    Route::get('/offline/{page}', function ($page) {
        $filePath = public_path("offline/{$page}.html");
        if (file_exists($filePath)) {
            return response()->file($filePath);
        }
        abort(404);
    })->name('offline.page');

    // Route::get('/credits', function () {
    //     return Inertia::render('Credits');
    // })->name('credits');

    // Student Protected Routes
    Route::middleware(['auth', 'verified'])->group(function () {

        Route::post('/narrate', [NarratorController::class, 'narrate'])->name('narrate');

        // Student Dashboard
        Route::get('/dashboard', function () {
            $user = auth()->user();
            $courses = Course::where('is_published', true)
                ->orderBy('order', 'asc')
                ->get()
                ->map(fn($course) => [
                    'id' => $course->id,
                    'title' => $course->title,
                    'description' => $course->description,
                    'thumbnail' => $course->thumbnail_url,
                    'slug' => Str::slug($course->title),
                    'progress' => 0,
                    'modulesCompleted' => 0,
                    'totalModules' => $course->materials()->count() + $course->quizzes()->count(),
                ]);

            // Get PDF documents (only public documents for students)
            $pdfDocuments = Informasi::where('is_published', true)
                ->whereNull('access')
                ->orderBy('order', 'asc')
                ->get()
                ->map(fn($doc) => [
                    'id' => $doc->id,
                    'title' => $doc->title,
                    'description' => $doc->description,
                    'type' => $doc->type,
                    'file_url' => $doc->file_url,
                ]);

            // Get last accessed course
            $lastAccessedCourse = $user->courses()
                ->where('is_published', true)
                ->orderByPivot('last_accessed_at', 'desc')
                ->first();

            $lastAccessedData = null;
            if ($lastAccessedCourse) {
                $lastAccessedData = [
                    'id' => $lastAccessedCourse->id,
                    'title' => $lastAccessedCourse->title,
                    'progress' => $lastAccessedCourse->pivot->progress,
                    // You can add more fields if needed for the card
                ];
            }

            return Inertia::render('Dashboard', [
                'courses' => $courses,
                'pdfDocuments' => $pdfDocuments,
                'showOnboarding' => !$user->has_completed_onboarding,
                'lastAccessedCourse' => $lastAccessedData
            ]);
        })->name('dashboard');

        // Student Course List
        Route::get('/courses', [CourseController::class, 'index'])->name('courses');

        // Profile
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        // Onboarding
        Route::get('/onboarding/status', [OnboardingController::class, 'status'])->name('onboarding.status');
        Route::post('/onboarding/complete', [OnboardingController::class, 'complete'])->name('onboarding.complete');

        // Chat & Bot
        Route::get('/bot-test', function () {
            return Inertia::render('BotTestPage');
        })->name('bot-test');
        Route::get('/chat-test', function () {
            return Inertia::render('ChatTestPage');
        })->name('chat-test');
        Route::get('/chat/{course_id}', [ChatMessageController::class, 'index']);
        Route::get('/chat/{course_id}/last', [ChatMessageController::class, 'getLastMessage']);
        Route::post('/chat/{course_id}', [ChatMessageController::class, 'store']);

        // Quiz
        Route::get('/quiz/{quiz}', [QuizController::class, 'show'])->name('quiz.show');
        Route::post('/quiz/{quiz}/submit', [QuizController::class, 'submit'])->name('quiz.submit');

        // Course Detail & Materials (Viewing)
        Route::prefix('course')->group(function () {
            Route::get('/', [CourseController::class, 'index'])->name('course.index');
            Route::get('/{course}', [CourseController::class, 'show'])->name('course.show');
            Route::get('/{course}/game', [CourseController::class, 'game'])->name('course.game');
            // Note: Store/Update/Destroy are technically still here accessible by ID, 
            // but we will secure them via Policy or move them to 'guru' domain later.
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
    });

    require __DIR__ . '/auth.php';
});


