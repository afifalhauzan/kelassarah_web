<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Question; // <-- 1. TAMBAHIN INI BIAR GAK ERROR
use App\Models\Course;   // <-- Tambahin juga buat relasi 'course'
use App\Models\Essay;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'title',
        'content',
        'order',
        'is_published',
        'type',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function essays()
    {
        return $this->hasMany(Essay::class);
    }
}