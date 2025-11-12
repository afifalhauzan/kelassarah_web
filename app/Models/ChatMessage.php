<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatMessage extends Model
{
    protected $fillable = [
        'course_id',
        'user_id',
        'content',
        'status',
        'role',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    } 

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
