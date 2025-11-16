<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Option;
use App\Models\UserAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuizController extends Controller
{
    public function show(Quiz $quiz)
    {
        $quizData = [
            'id' => $quiz->id,
            'title' => $quiz->title,
            'content' => $quiz->content,
            'published_at' => $quiz->created_at->locale('id')->isoFormat('dddd, D MMMM YYYY, HH:mm'),
        ];
        $courseData = [
            'id' => $quiz->course->id,
            'title' => $quiz->course->title,
        ];
        $questionsData = $quiz->questions()->with('options')->get()->map(fn ($question) => [
            'id' => $question->id,
            'question_text' => $question->question_text,
            'options' => $question->options->map(fn ($option) => [
                'id' => $option->id,
                'option_text' => $option->option_text,
            ]),
        ]);
        return inertia('Quiz/Show', [
            'course' => $courseData,
            'quiz' => $quizData,
            'questions' => $questionsData,
        ]);
    }

    public function submit(Request $request, Quiz $quiz)
    {
        $answers = $request->input('answers');
        $userId = Auth::id();
        
        $correctCount = 0;
        $totalQuestions = $quiz->questions()->count();

        $correctOptionIds = Option::whereIn('question_id', $quiz->questions()->pluck('id'))
                                    ->where('is_correct', '1')
                                    ->pluck('id')
                                    ->flip();

        foreach ($answers as $questionId => $optionId) {
            
            $isCorrect = $correctOptionIds->has($optionId);
            
            if ($isCorrect) {
                $correctCount++;
            }

            UserAnswer::create([
                'user_id' => $userId,
                'question_id' => (int)$questionId,
                'option_id' => (int)$optionId,
                'is_correct_at_time' => $isCorrect ? '1' : '0',
            ]);
        }

        $score = ($totalQuestions > 0) ? round(($correctCount / $totalQuestions) * 100) : 0;

        return response()->json([
            'score' => $score,
            'correctAnswers' => $correctCount,
            'totalQuestions' => $totalQuestions,
            'quizTitle' => $quiz->title,
            'courseId' => $quiz->course_id,
        ]);
    }
}