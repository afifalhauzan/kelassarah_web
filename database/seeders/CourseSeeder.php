<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Material;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $pdfLink = 'https://pdfjs-express.s3-us-west-2.amazonaws.com/docs/choosing-a-pdf-viewer.pdf';
        $videoLink = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
        $pdfLinkMateri1 = asset('pdf/Materi_1.pdf');
        $pdfLinkMateri2 = asset('pdf/Materi_2.pdf');
        $pdfLinkMateri3 = asset('pdf/Materi_3.pdf');
        $videoLink2 = asset('videos/video_sample.mp4');
        $subtitle_url = asset('subtitles/video_sample.vtt');

        $coursesData = [
            [
                'title' => 'Orientasi Jurnalis Muda - Memahami Lanskap Pergerakan',
                'description' => 'Baca dan pahami materi terkait Organisasi Pergerakan berikut ini! Jika sudah, coba tanyakan Asisten Kak Sarah terkait awal perjalanan Anda dalam mempelajari Sejarah Indonesia lebih lanjut, Anda bisa memulai percakapan dengan mengirimkan pesan \'Halo\' di kolom chat.',
                'order' => 1,
                'thumbnail_url' => '/images/course_1.jpg',
                'text_content' => 'Budi Utomo, didirikan pada 20 Mei 1908, adalah organisasi pergerakan nasional modern pertama di Indonesia. Didirikan oleh para pelajar STOVIA di Batavia, organisasi ini awalnya berfokus pada perbaikan pendidikan dan kebudayaan bagi orang Jawa dan Madura. Meskipun awalnya bersifat sosial-budaya, kelahiran Budi Utomo menandai dimulainya era baru dalam perjuangan bangsa, yaitu perjuangan yang terorganisir dan modern, yang kemudian dikenal sebagai Hari Kebangkitan Nasional.'
            ],
            [
                'title' => 'Misi Investigasi - Menggali Perspektif Para Delegasi',
                'description' => 'Bacalah materi terkait bagaimana peran para Tokoh Pergerakan Nasional dalam merancang Sumpah Pemuda yang kita kenal saat ini! Selanjutnya, coba tanyakan Kak Sarah untuk terkait materi ini, Anda juga bisa berdialog dengan tokoh-tokoh tertentu untuk menggali informasi lebih dalam!',
                'order' => 2,
                'thumbnail_url' => '/images/course_2.jpg',
                'text_content' => 'Kongres Pemuda II, yang diadakan di Batavia (kini Jakarta) pada 27-28 Oktober 1928, adalah momen krusial dalam sejarah pergerakan nasional. Kongres ini dihadiri oleh berbagai organisasi pemuda dari berbagai daerah, seperti Jong Java, Jong Sumatranen Bond, Jong Ambon, dan lainnya. Tujuan utama mereka adalah untuk menemukan cara memperkuat persatuan di antara pemuda-pemudi Indonesia. Hasil paling monumental dari kongres ini adalah ikrar Sumpah Pemuda, yang menegaskan satu tanah air, satu bangsa, dan satu bahasa: Indonesia.'
            ],
            [
                'title' => 'Momen Krusial - Menjadi Saksi Mata di Kongres',
                'description' => 'Bacalah materi tentang proses kongres pemuda dan hasil dari kongres tersebut pada materi berikut ini! Jika sudah membaca materi, Anda bisa dapat melanjutkan bertanya ke Kak Sarah dan merasakan suasana yang imersif dalam momen-momen puncak Kongres Pemuda II.',
                'order' => 3,
                'thumbnail_url' => '/images/course_1.jpg',
                'text_content' => 'Sarekat Islam (SI), awalnya Sarekat Dagang Islam (SDI) yang didirikan pada tahun 1911, dengan cepat berubah menjadi organisasi pergerakan massa terbesar di Hindia Belanda. Di bawah kepemimpinan H.O.S. Cokroaminoto, SI tidak hanya berfokus pada ekonomi tetapi juga politik dan agama. Organisasi ini berhasil menarik jutaan anggota dari berbagai lapisan masyarakat, menjadikannya kekuatan politik pertama yang secara terbuka menantang otoritas kolonial Belanda.'
            ],
            [
                'title' => 'Proyek Akhir - Artikel Sejarah',
                'description' => 'Menyelami peran Sarekat Islam sebagai salah satu organisasi massa pertama.Sebagai seorang jurnalis muda, integrasikan seluruh materi yang Anda peroleh dan pengalaman bersama pendampingan Guru dan Kak Sarah yang Anda dapatkan untuk merangkai sebuah karya tulis. Tuliskan sebuah artikel berita sepanjang minmal 200 kata untuk surat kabarmu yang merangkum hasil dan semangat dari Kongres Pemuda II.',
                'order' => 4,
                'thumbnail_url' => '/images/course_2.jpg',
                'text_content' => 'Sarekat Islam (SI), awalnya Sarekat Dagang Islam (SDI) yang didirikan pada tahun 1911, dengan cepat berubah menjadi organisasi pergerakan massa terbesar di Hindia Belanda. Di bawah kepemimpinan H.O.S. Cokroaminoto, SI tidak hanya berfokus pada ekonomi tetapi juga politik dan agama. Organisasi ini berhasil menarik jutaan anggota dari berbagai lapisan masyarakat, menjadikannya kekuatan politik pertama yang secara terbuka menantang otoritas kolonial Belanda.'
            ],
        ];

        foreach ($coursesData as $data) {
            $course = Course::create([
                'title' => $data['title'],
                'description' => $data['description'],
                'order' => $data['order'],
                'is_published' => true,
                'knowledge_prompt' => 'System prompt for ' . $data['title'],
                'welcome_message' => 'Welcome to ' . $data['title'],
                'thumbnail_url' => $data['thumbnail_url'],
            ]);

            Material::create([
                'course_id' => $course->id,
                'title' => 'Materi Teks - Orientasi Jurnalis Muda - Memahami Lanskap Pergerakan',
                'order' => 2,
                'is_published' => true,
                'type' => 'document',
                'content_url' => null,
                'content_text' => $data['text_content']
            ]);

            Material::create([
                'course_id' => $course->id,
                'title' => 'Materi Video - ',
                'order' => 3,
                'is_published' => true,
                'type' => 'video',
                'content_url' => $videoLink2,
                'subtitle_url' => $subtitle_url,
                'content_text' => null
            ]);
        }

        Material::create([
            'course_id' => 1,
            'title' => 'Materi PDF - Orientasi Jurnalis Muda - Memahami Lanskap Pergerakan',
            'order' => 1,
            'is_published' => true,
            'type' => 'document',
            'content_url' => $pdfLinkMateri1,
            'content_text' => null
        ]);

        Material::create([
            'course_id' => 2,
            'title' => 'Materi PDF - Misi Investigasi - Menggali Perspektif Para Delegasi',
            'order' => 1,
            'is_published' => true,
            'type' => 'document',
            'content_url' => $pdfLinkMateri2,
            'content_text' => null
        ]);

        Material::create([
            'course_id' => 3,
            'title' => 'Materi PDF - Momen Krusial - Menjadi Saksi Mata di Kongres',
            'order' => 1,
            'is_published' => true,
            'type' => 'document',
            'content_url' => $pdfLinkMateri3,
            'content_text' => null
        ]);
    }
}