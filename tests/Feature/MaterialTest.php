<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Material;
use App\Models\Course;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MaterialTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function bisa_mendapatkan_daftar_material_dari_suatu_course()
    {
        $course = Course::factory()->create(['is_published' => 1]);
        Material::factory()->count(3)->create(['course_id' => $course->id, 'is_published' => 1]);

        $response = $this->getJson("/course/{$course->id}/material");

        $response->assertStatus(200)
                 ->assertJsonCount(3);
    }

    /** @test */
    public function bisa_membuat_material_baru_di_suatu_course()
    {
        $course = Course::factory()->create();

        $data = [
            'title' => 'Materi Baru',
            'content_text' => 'Ini isi materi.',
            'order' => 1,
            'is_published' => true,
            'type' => 'video',
            'content_url' => 'https://example.com/video.mp4',
            'subtitle_url' => 'https://example.com/subtitle.vtt',
        ];

        $response = $this->postJson("/course/{$course->id}/material", $data);

        $response->assertStatus(201)
                 ->assertJsonFragment(['title' => 'Materi Baru']);

        $this->assertDatabaseHas('materials', [
            'title' => 'Materi Baru',
            'course_id' => $course->id,
        ]);
    }

    /** @test */
    public function bisa_melihat_detail_material()
    {
        $course = Course::factory()->create();
        $material = Material::factory()->create(['course_id' => $course->id]);

        $response = $this->getJson("/course/{$course->id}/material/{$material->id}");

        $response->assertStatus(200)
                 ->assertJsonFragment(['id' => $material->id]);
    }

    /** @test */
    public function bisa_memperbarui_material()
    {
        $course = Course::factory()->create();
        $material = Material::factory()->create(['course_id' => $course->id]);

        $response = $this->putJson("/course/{$course->id}/material/{$material->id}", [
            'title' => 'Materi Diperbarui',
        ]);

        $response->assertStatus(200)
                 ->assertJsonFragment(['title' => 'Materi Diperbarui']);

        $this->assertDatabaseHas('materials', ['title' => 'Materi Diperbarui']);
    }

    /** @test */
    public function bisa_menghapus_material()
    {
        $course = Course::factory()->create();
        $material = Material::factory()->create(['course_id' => $course->id]);

        $response = $this->deleteJson("/course/{$course->id}/material/{$material->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('materials', ['id' => $material->id]);
    }
}
