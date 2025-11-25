<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Informasi extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'title',
        'description',
        'type',
        'file_url',
        'order',
        'is_published',
        'access',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];
}
