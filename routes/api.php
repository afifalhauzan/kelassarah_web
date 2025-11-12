<?php

use App\Http\Controllers\ChatMessageController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\MaterialController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

    Route::get('/chat/{course_id}', [ChatMessageController::class, 'index']);
    Route::get('/chat/{course_id}/last', [ChatMessageController::class, 'getLastMessage']);
    Route::post('/chat/{course_id}', [ChatMessageController::class, 'store']);

