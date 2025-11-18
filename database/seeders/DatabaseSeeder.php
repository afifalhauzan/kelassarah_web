<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Material;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\UserSiswaSeeder;
use Database\Seeders\CourseSeeder;
use Database\Seeders\QuizSeeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CourseSeeder::class,
            QuizSeeder::class,
            UserSiswaSeeder::class,
        ]);
    }
}