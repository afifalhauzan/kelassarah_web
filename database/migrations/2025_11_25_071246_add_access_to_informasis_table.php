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
        Schema::table('informasis', function (Blueprint $table) {
            $table->string('access')->nullable(); // null for all users, 'guru' for teachers only
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('informasis', function (Blueprint $table) {
            $table->dropColumn('access');
        });
    }
};
