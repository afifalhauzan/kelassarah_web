<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Material;
use App\Models\Course;
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
        Material::factory(10)->create();
        Course::factory(10)->create();
    }
}
