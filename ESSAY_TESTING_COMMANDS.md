# Essay Entity Testing Commands for Tinker

## Basic Model Testing Commands

### 1. Check if Essay model works
```php
use App\Models\Essay;
use App\Models\Quiz;
use App\Models\Course;

// Test Essay model
Essay::all();
```

### 2. Check Quiz with type field
```php
// Check all quizzes with their types
Quiz::select('id', 'title', 'type', 'course_id')->get();

// Get essay type quizzes only
Quiz::where('type', 'essay')->get();

// Get traditional quizzes (null type)
Quiz::whereNull('type')->get();
```

### 3. Test Essay relationships
```php
// Get the essay quiz we created
$essayQuiz = Quiz::where('type', 'essay')->first();

// Check if quiz has essays
$essayQuiz->essays;

// Get essay details
$essay = Essay::first();
echo "Essay Question: " . $essay->question_text;
echo "Max Words: " . $essay->max_words;
echo "Instructions: " . $essay->instructions;

// Test relationship back to quiz
$essay->quiz;
```

### 4. Test Course relationships with essay quizzes
```php
// Get course order 2 (should have essay quiz)
$course = Course::where('order', 2)->first();

// Check all quizzes for this course
$course->quizzes;

// Get specifically the essay quiz
$course->quizzes()->where('type', 'essay')->first();
```

### 5. Create new essay programmatically
```php
// Find course order 3 (if exists) 
$course3 = Course::where('order', 3)->first();

if ($course3) {
    // Create new essay quiz
    $newEssayQuiz = Quiz::create([
        'course_id' => $course3->id,
        'title' => 'Test Essay Quiz',
        'content' => 'Test essay for development',
        'order' => 101,
        'is_published' => '1',
        'type' => 'essay'
    ]);

    // Create essay question
    Essay::create([
        'quiz_id' => $newEssayQuiz->id,
        'question_text' => 'This is a test essay question created via Tinker.',
        'sample_answer' => 'This is a sample answer for testing.',
        'max_words' => 300,
        'instructions' => 'Write a clear and concise answer.'
    ]);

    echo "New essay quiz created with ID: " . $newEssayQuiz->id;
}
```

### 6. Verify database structure
```php
// Check essays table structure
use Illuminate\Support\Facades\Schema;

// Get essays table columns
Schema::getColumnListing('essays');

// Get quizzes table columns (should include 'type')
Schema::getColumnListing('quizzes');
```

### 7. Data validation tests
```php
// Test creating essay without required fields (should fail)
try {
    Essay::create([
        'quiz_id' => 999, // non-existent quiz
        'question_text' => 'Test question'
    ]);
} catch (Exception $e) {
    echo "Expected error: " . $e->getMessage();
}

// Test valid essay creation
$validQuiz = Quiz::first();
$testEssay = Essay::create([
    'quiz_id' => $validQuiz->id,
    'question_text' => 'Valid test essay question',
    'max_words' => 250,
]);

echo "Valid essay created with ID: " . $testEssay->id;
```

### 8. Count and statistics
```php
// Get counts
echo "Total Quizzes: " . Quiz::count();
echo "Essay Quizzes: " . Quiz::where('type', 'essay')->count();
echo "Multiple Choice Quizzes: " . Quiz::whereNull('type')->count();
echo "Total Essays: " . Essay::count();

// Get courses with essay quizzes
$coursesWithEssays = Course::whereHas('quizzes', function($query) {
    $query->where('type', 'essay');
})->get();

echo "Courses with essay quizzes: " . $coursesWithEssays->count();
```

## Usage Instructions:
1. Run `php artisan tinker`
2. Copy and paste these commands one by one
3. Check the results to verify everything works correctly
4. Test both success and error cases
5. Verify relationships work properly