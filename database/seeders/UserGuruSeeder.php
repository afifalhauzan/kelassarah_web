<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserGuruSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create teacher users
        $teachers = [
            [
                'name' => 'Bu Sarah Guru',
                'username' => 'guru.sarah',
                'email' => 'guru@kelassarah.id',
                'password' => Hash::make('password'),
                'role' => 'guru',
                'has_completed_onboarding' => true,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Pak Ahmad Hidayat',
                'username' => 'guru.ahmad',
                'email' => 'ahmad.guru@kelassarah.id',
                'password' => Hash::make('password'),
                'role' => 'guru',
                'has_completed_onboarding' => true,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Bu Siti Nurhaliza',
                'username' => 'guru.siti',
                'email' => 'siti.guru@kelassarah.id',
                'password' => Hash::make('password'),
                'role' => 'guru',
                'has_completed_onboarding' => true,
                'email_verified_at' => now(),
            ],
        ];

        foreach ($teachers as $teacher) {
            User::create($teacher);
        }

        $this->command->info('Teacher users created successfully!');
    }
}
