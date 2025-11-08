<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class MaterialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'content_text' => $this->faker->paragraph(),
            'order' => $this->faker->numberBetween(1, 50),
            'is_published' => $this->faker->boolean() ? 1 : 0,
            'type' => $this->faker->randomElement(['video', 'document']),
            'content_url' => $this->faker->url(),
            'subtitle_url' => $this->faker->optional()->url(),
            'course_id' => Course::factory(), 
        ];
    }
}
