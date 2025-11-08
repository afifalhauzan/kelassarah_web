<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'order' => $this->faker->numberBetween(1, 100),
            'is_published' => $this->faker->boolean(),
            'knowledge_prompt' => $this->faker->sentence(),
            'welcome_message' => $this->faker->sentence(),
        ];
    }
}
