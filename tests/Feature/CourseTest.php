<?php

namespace Tests\Feature;

use App\Models\Course;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CourseTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function bisa_mendapatkan_daftar_course_yang_dipublikasikan()
    {
        Course::factory()->count(2)->create(['is_published' => true]);
        Course::factory()->create(['is_published' => false]);

        $response = $this->getJson('/course');

        $response->assertStatus(200)
                 ->assertJsonCount(2); // hanya yang published
    }

    /** @test */
    public function bisa_membuat_course_baru()
    {
        $data = [
            'title' => 'Pemrograman Web',
            'description' => 'Belajar membuat aplikasi web modern',
            'order' => 1,
            'is_published' => true,
            'knowledge_prompt' => 'Apa itu HTML?',
            'welcome_message' => 'Selamat datang di kursus ini!',
        ];

        $response = $this->postJson('/course', $data);

        $response->assertStatus(201)
                 ->assertJsonFragment(['title' => 'Pemrograman Web']);

        $this->assertDatabaseHas('courses', ['title' => 'Pemrograman Web']);
    }

    /** @test */
    public function gagal_membuat_course_jika_title_kosong()
    {
        $response = $this->postJson('/course', [
            'order' => 1,
            'is_published' => true,
        ]);

        $response->assertStatus(422); // validation error
        $response->assertJsonValidationErrors(['title']);
    }

    /** @test */
    public function bisa_melihat_detail_course()
    {
        $course = Course::factory()->create([
            'title' => 'Database Dasar',
        ]);

        $response = $this->getJson("/course/{$course->id}");

        $response->assertStatus(200)
                 ->assertJsonFragment(['title' => 'Database Dasar']);
    }

    /** @test */
    public function bisa_update_course()
    {
        $course = Course::factory()->create([
            'title' => 'Pemrograman Lama',
        ]);

        $data = ['title' => 'Pemrograman Baru'];

        $response = $this->putJson("/course/{$course->id}", $data);

        $response->assertStatus(200)
                 ->assertJsonFragment(['title' => 'Pemrograman Baru']);

        $this->assertDatabaseHas('courses', ['title' => 'Pemrograman Baru']);
    }

    /** @test */
    public function bisa_menghapus_course()
    {
        $course = Course::factory()->create();

        $response = $this->deleteJson("/course/{$course->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('courses', ['id' => $course->id]);
    }
}
