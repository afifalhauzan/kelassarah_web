<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Quiz;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'order',
        'is_published',
        'knowledge_prompt',
        'welcome_message',
        'thumbnail_url',
        'is_game_enabled',
        'game_data',
    ];

    protected $casts = [
        'is_game_enabled' => 'boolean',
        'game_data' => 'array',
    ];

    public function messages()
    {
        return $this->hasMany(ChatMessage::class);
    }

    public function materials()
    {
        return $this->hasMany(Material::class);
    }

    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'course_user')
            ->withPivot('progress', 'last_accessed_at')
            ->withTimestamps();
    }
}