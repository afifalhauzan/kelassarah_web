<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
    ];

    public function messages()
    {
        return $this->hasMany(ChatMessage::class);
    }

    public function materials()
    {
        return $this->hasMany(Material::class);
    }
}
