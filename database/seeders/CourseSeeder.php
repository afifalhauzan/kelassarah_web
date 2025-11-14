<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = [
            [
                'title' => 'Orientasi Jurnalis Muda - Memahami Lanskap Pergerakan',
                'description' => 'Baca dan pahami materi terkait Organisasi Pergerakan berikut ini! Jika sudah, coba tanyakan Asisten Kak Sarah terkait awal perjalanan Anda dalam mempelajari Sejarah Indonesia lebih lanjut, Anda bisa memulai percakapan dengan mengirimkan pesan \'Halo\' di kolom chat.',
                'order' => 1,
                'is_published' => true,
                'knowledge_prompt' => 'System prompt for AI assistant. Define the assistant\'s role, expertise, and behavior for this course.',
                'welcome_message' => 'Welcome message that students will see when they start this course.',
            ],
            [
                'title' => 'Misi Investigasi - Menggali Perspektif Para Delegasi',
                'description' => 'Bacalah materi terkait bagaimana peran para Tokoh Pergerakan Nasional dalam merancang Sumpah Pemuda yang kita kenal saat ini! Selanjutnya, coba tanyakan Kak Sarah untuk terkait materi ini, Anda juga bisa berdialog dengan tokoh-tokoh tertentu untuk menggali informasi lebih dalam!',
                'order' => 2,
                'is_published' => true,
                'knowledge_prompt' => 'Another system prompt for AI. Customize based on course subject matter.',
                'welcome_message' => 'Welcome to the second course! Here\'s what you need to know to get started.',
            ],
            [
                'title' => 'Momen Krusial - Menjadi Saksi Mata di Kongres',
                'description' => 'Bacalah materi tentang proses kongres pemuda dan hasil dari kongres tersebut pada materi berikut ini! Jika sudah membaca materi, Anda bisa dapat melanjutkan bertanya ke Kak Sarah dan merasakan suasana yang imersif dalam momen-momen puncak Kongres Pemuda II.',
                'order' => 3,
                'is_published' => false,
                'knowledge_prompt' => 'System prompt for unpublished course.',
                'welcome_message' => 'Welcome message for when this course goes live.',
            ],
            [
                'title' => 'Proyek Akhir - Artikel Sejarah',
                'description' => 'Sebagai seorang jurnalis muda, integrasikan seluruh materi yang Anda peroleh dan pengalaman bersama pendampingan Guru dan Kak Sarah yang Anda dapatkan untuk merangkai sebuah karya tulis. Tuliskan sebuah artikel berita sepanjang minmal 200 kata untuk surat kabarmu yang merangkum hasil dan semangat dari Kongres Pemuda II.',
                'order' => 3,
                'is_published' => false,
                'knowledge_prompt' => 'System prompt for unpublished course.',
                'welcome_message' => 'Welcome message for when this course goes live.',
            ]
        ];

        foreach ($courses as $courseData) {
            Course::create($courseData);
        }
    }
}
