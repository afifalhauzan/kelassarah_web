<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_essay_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('essay_id')->constrained('essays')->onDelete('cascade');
            $table->longText('answer_text');
            $table->integer('word_count')->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->decimal('score', 5, 2)->nullable(); // 0-100 scoring
            $table->text('feedback')->nullable();
            $table->timestamps();
            
            // Ensure one answer per user per essay
            $table->unique(['user_id', 'essay_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_essay_answers');
    }
};