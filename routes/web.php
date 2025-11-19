<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ChatMessageController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Course;

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

Route::domain(env('APP_TEACHER_DOMAIN'))->group(function () {

    // 1. The Teacher Dashboard
    //Route::get('/', function () {
        // In the future, point this to [TeacherDashboardController::class, 'index']
       // return Inertia::render('Credits', [
         //   'message' => 'Welcome to the Teacher Command Center'
      //  ]);
    // })->name('credits');


    Route::get('/', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('/', [AuthenticatedSessionController::class, 'store']);

    Route::get('/dashboard', function () {
        return Inertia::render('Teacher/Dashboard', [
             'message' => 'Welcome, Teacher.'
        ]);
    })->name('guru.dashboard');
    // 2. Course Management (Create, Edit, Delete)
    // Ideally, you move your 'store', 'update', 'destroy' routes here later.
});

/*
|--------------------------------------------------------------------------
| DOMAIN 2: STUDENTS / PUBLIC (kelassarah.id)
|--------------------------------------------------------------------------
| The Learning Area.
*/
Route::domain(env('APP_DOMAIN'))->group(function () {

    // Public Landing
    Route::get('/', function () {
        return Inertia::render('LandingPage');
    });

    Route::get('/credits', function () {
        return Inertia::render('Credits');
    })->name('credits');

    // Student Protected Routes
    Route::middleware(['auth', 'verified'])->group(function () {
        
        // Student Dashboard
        Route::get('/dashboard', function () {
            $user = auth()->user();
            $courses = Course::where('is_published', true)
                ->orderBy('order', 'asc')
                ->get()
                ->map(fn ($course) => [ 
                    'id' => $course->id,
                    'title' => $course->title,
                    'description' => $course->description,
                    'thumbnail' => $course->thumbnail_url, 
                    'slug' => Str::slug($course->title),
                    'progress' => 0, 
                    'modulesCompleted' => 0,
                    'totalModules' => $course->materials()->count() + $course->quizzes()->count(),
                ]);

            return Inertia::render('Dashboard', [
                'courses' => $courses,
                'showOnboarding' => !$user->has_completed_onboarding
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
        Route::get('/bot-test', function () { return Inertia::render('BotTestPage'); })->name('bot-test');
        Route::get('/chat-test', function () { return Inertia::render('ChatTestPage'); })->name('chat-test');
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
});


require __DIR__ . '/auth.php';
