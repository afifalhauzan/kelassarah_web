<?php

// Tinker Commands for Testing Essay Implementation
// Run these commands one by one in: php artisan tinker

echo "=== ESSAY IMPLEMENTATION TEST COMMANDS ===\n";
echo "\n1. Basic Model Loading:\n";
echo "use App\\Models\\Essay;\n";
echo "use App\\Models\\Quiz;\n";
echo "use App\\Models\\UserEssayAnswer;\n";
echo "use App\\Models\\User;\n";
echo "use App\\Models\\Course;\n\n";

echo "2. Check if data exists:\n";
echo "Essay::count() // Should return 1\n";
echo "Quiz::where('type', 'essay')->count() // Should return 1\n";
echo "Course::where('order', 2)->exists() // Should return true\n\n";

echo "3. Get the essay quiz and essay:\n";
echo "\$essayQuiz = Quiz::where('type', 'essay')->first();\n";
echo "\$essay = \$essayQuiz->essays->first();\n";
echo "echo \$essay->question_text;\n\n";

echo "4. Create a test user essay answer:\n";
echo "\$user = User::first();\n";
echo "\$userAnswer = UserEssayAnswer::create([\n";
echo "    'user_id' => \$user->id,\n";
echo "    'essay_id' => \$essay->id,\n";
echo "    'answer_text' => 'This is a test essay answer about the course material. It demonstrates understanding of key concepts and provides concrete examples.',\n";
echo "]);\n\n";

$user = User::first();
$userAnswer = UserEssayAnswer::create([
'user_id' => $user->id,
'essay_id' => $essay->id,
'answer_text' => 'This is a test essay answer about the course material. It demonstrates understanding of key concepts and provides concrete examples.',
]);

echo "5. Test automatic word count and submission:\n";
echo "\$userAnswer->markAsSubmitted();\n";
echo "echo 'Word count: ' . \$userAnswer->word_count;\n";
echo "echo 'Submitted at: ' . \$userAnswer->submitted_at;\n\n";

echo "6. Test relationships:\n";
echo "echo 'User: ' . \$userAnswer->user->name;\n";
echo "echo 'Essay question: ' . \$userAnswer->essay->question_text;\n";
echo "echo 'Quiz title: ' . \$userAnswer->essay->quiz->title;\n\n";

echo "7. Test grading:\n";
echo "\$userAnswer->update(['score' => 85.5, 'feedback' => 'Good analysis, but could use more examples.']);\n";
echo "echo 'Is graded: ' . (\$userAnswer->isGraded() ? 'Yes' : 'No');\n";
echo "echo 'Score: ' . \$userAnswer->score;\n\n";

echo "8. Test essay helper methods:\n";
echo "echo 'User answer for essay: ' . \$essay->getUserAnswer(\$user->id)->answer_text;\n\n";

echo "9. Clean up (optional):\n";
echo "\$userAnswer->delete();\n\n";

echo "=== END TEST COMMANDS ===\n";