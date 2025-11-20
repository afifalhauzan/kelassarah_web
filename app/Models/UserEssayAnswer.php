<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserEssayAnswer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'essay_id',
        'answer_text',
        'word_count',
        'submitted_at',
        'score',
        'feedback',
    ];

    protected $casts = [
        'submitted_at' => 'datetime',
        'score' => 'decimal:2',
    ];

    /**
     * Get the user who submitted the essay answer.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the essay question this answer belongs to.
     */
    public function essay()
    {
        return $this->belongsTo(Essay::class);
    }

    /**
     * Calculate and update word count automatically.
     */
    public function calculateWordCount()
    {
        $this->word_count = str_word_count(strip_tags($this->answer_text));
        return $this->word_count;
    }

    /**
     * Mark the essay as submitted.
     */
    public function markAsSubmitted()
    {
        $this->submitted_at = now();
        $this->calculateWordCount();
        $this->save();
    }

    /**
     * Check if the essay has been submitted.
     */
    public function isSubmitted()
    {
        return !is_null($this->submitted_at);
    }

    /**
     * Check if the essay has been graded.
     */
    public function isGraded()
    {
        return !is_null($this->score);
    }
}