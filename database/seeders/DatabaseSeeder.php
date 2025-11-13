<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Material;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        
        // Seed courses first (materials might depend on courses)
        $this->call([
            CourseSeeder::class,
        ]);
        
        Material::factory(10)->create();
        // Course::factory(10)->create(); // Commented out since we're using CourseSeeder
        
    }
}
