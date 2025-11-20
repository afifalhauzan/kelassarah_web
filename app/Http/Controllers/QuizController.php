<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Option;
use App\Models\UserAnswer;
use App\Models\UserEssayAnswer;
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
            'type' => $quiz->type,
            'published_at' => $quiz->created_at->locale('id')->isoFormat('dddd, D MMMM YYYY, HH:mm'),
        ];
        $courseData = [
            'id' => $quiz->course->id,
            'title' => $quiz->course->title,
        ];
        
        $questionsData = [];
        $essaysData = [];
        
        if ($quiz->type === 'essay') {
            $essaysData = $quiz->essays()->get()->map(fn ($essay) => [
                'id' => $essay->id,
                'question_text' => $essay->question_text,
                'sample_answer' => $essay->sample_answer,
                'max_words' => $essay->max_words,
                'instructions' => $essay->instructions,
            ]);
        } else {
            $questionsData = $quiz->questions()->with('options')->get()->map(fn ($question) => [
                'id' => $question->id,
                'question_text' => $question->question_text,
                'options' => $question->options->map(fn ($option) => [
                    'id' => $option->id,
                    'option_text' => $option->option_text,
                ]),
            ]);
        }
        
        return inertia('Quiz/Show', [
            'course' => $courseData,
            'quiz' => $quizData,
            'questions' => $questionsData,
            'essays' => $essaysData,
        ]);
    }

    public function submit(Request $request, Quiz $quiz)
    {
        $userId = Auth::id();
        
        if ($quiz->type === 'essay') {
            $essays = $request->input('essays');
            $totalEssays = $quiz->essays()->count();
            $submittedCount = 0;
            
            foreach ($essays as $essayId => $answerText) {
                if (!empty(trim($answerText))) {
                    $submittedCount++;
                    
                    UserEssayAnswer::create([
                        'user_id' => $userId,
                        'essay_id' => (int)$essayId,
                        'answer_text' => trim($answerText),
                        'submitted_at' => now(),
                    ]);
                }
            }
            
            return response()->json([
                'score' => null, // Essays need manual grading
                'submittedAnswers' => $submittedCount,
                'totalQuestions' => $totalEssays,
                'quizTitle' => $quiz->title,
                'courseId' => $quiz->course_id,
                'type' => 'essay',
                'message' => 'Jawaban essay Anda telah dikirim dan akan dinilai oleh pengajar.',
            ]);
        } else {
            $answers = $request->input('answers');
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
                'type' => 'multiple_choice',
            ]);
        }
    }
}