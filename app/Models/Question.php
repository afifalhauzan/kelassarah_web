<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Option;
use App\Models\Quiz;
use App\Models\UserAnswer;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'quiz_id',
        'question_text',
    ];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function options()
    {
        return $this->hasMany(Option::class);
    }

    /**
     * Dapetin semua jawaban user buat pertanyaan ini.
     */
    public function userAnswers()
    {
        return $this->hasMany(UserAnswer::class);
    }
}