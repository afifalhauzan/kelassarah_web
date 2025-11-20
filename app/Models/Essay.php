<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Essay extends Model
{
    use HasFactory;

    protected $fillable = [
        'quiz_id',
        'question_text',
        'sample_answer',
        'max_words',
        'instructions',
    ];

    /**
     * Get the quiz that owns the essay.
     */
    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    /**
     * Get all user essay answers for this essay.
     */
    public function userEssayAnswers()
    {
        return $this->hasMany(UserEssayAnswer::class);
    }

    /**
     * Get a specific user's essay answer.
     */
    public function getUserAnswer($userId)
    {
        return $this->userEssayAnswers()->where('user_id', $userId)->first();
    }
}
