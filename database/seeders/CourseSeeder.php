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
        $videoLink = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

        $coursesData = [
            [
                'title' => 'Orientasi Jurnalis Muda - Memahami Lanskap Pergerakan',
                'description' => 'Baca dan pahami materi terkait Organisasi Pergerakan berikut ini!',
                'order' => 1,
                'thumbnail_url' => 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Logo_Budi_Utomo.png',
                'text_content' => 'Budi Utomo, didirikan pada 20 Mei 1908, adalah organisasi pergerakan nasional modern pertama di Indonesia. Didirikan oleh para pelajar STOVIA di Batavia, organisasi ini awalnya berfokus pada perbaikan pendidikan dan kebudayaan bagi orang Jawa dan Madura. Meskipun awalnya bersifat sosial-budaya, kelahiran Budi Utomo menandai dimulainya era baru dalam perjuangan bangsa, yaitu perjuangan yang terorganisir dan modern, yang kemudian dikenal sebagai Hari Kebangkitan Nasional.'
            ],
            [
                'title' => 'Misi Investigasi - Menggali Perspektif Para Delegasi',
                'description' => 'Bacalah materi terkait bagaimana peran para Tokoh Pergerakan Nasional...',
                'order' => 2,
                'thumbnail_url' => 'https://upload.wikimedia.org/wikipedia/commons/7/77/Museum_Sumpah_Pemuda_01.jpg',
                'text_content' => 'Kongres Pemuda II, yang diadakan di Batavia (kini Jakarta) pada 27-28 Oktober 1928, adalah momen krusial dalam sejarah pergerakan nasional. Kongres ini dihadiri oleh berbagai organisasi pemuda dari berbagai daerah, seperti Jong Java, Jong Sumatranen Bond, Jong Ambon, dan lainnya. Tujuan utama mereka adalah untuk menemukan cara memperkuat persatuan di antara pemuda-pemudi Indonesia. Hasil paling monumental dari kongres ini adalah ikrar Sumpah Pemuda, yang menegaskan satu tanah air, satu bangsa, dan satu bahasa: Indonesia.'
            ],
            [
                'title' => 'Sarekat Islam dan Pergerakan Massa',
                'description' => 'Menyelami peran Sarekat Islam sebagai salah satu organisasi massa pertama.',
                'order' => 3,
                'thumbnail_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Logo_Sarekat_Islam.png/800px-Logo_Sarekat_Islam.png',
                'text_content' => 'Sarekat Islam (SI), awalnya Sarekat Dagang Islam (SDI) yang didirikan pada tahun 1911, dengan cepat berubah menjadi organisasi pergerakan massa terbesar di Hindia Belanda. Di bawah kepemimpinan H.O.S. Cokroaminoto, SI tidak hanya berfokus pada ekonomi tetapi juga politik dan agama. Organisasi ini berhasil menarik jutaan anggota dari berbagai lapisan masyarakat, menjadikannya kekuatan politik pertama yang secara terbuka menantang otoritas kolonial Belanda.'
            ],
            [
                'title' => 'Taman Siswa: Pendidikan sebagai Perlawanan',
                'description' => 'Peran vital Ki Hadjar Dewantara dan Taman Siswa dalam mencerdaskan bangsa.',
                'order' => 4,
                'thumbnail_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Taman_Siswa_logo.svg/1200px-Taman_Siswa_logo.svg.png',
                'text_content' => 'Didirikan oleh Ki Hadjar Dewantara pada 3 Juli 1922 di Yogyakarta, Taman Siswa adalah sebuah lembaga pendidikan yang menjadi bentuk perlawanan budaya terhadap sistem pendidikan kolonial. Dengan semboyan terkenalnya "Ing Ngarsa Sung Tuladha, Ing Madya Mangun Karsa, Tut Wuri Handayani", Taman Siswa bertujuan memberikan pendidikan yang berakar pada budaya nasional Indonesia dan menanamkan rasa kebangsaan, bukan sekadar mencetak pegawai administrasi untuk pemerintah kolonial.'
            ],
            [
                'title' => 'Indische Partij: Tiga Serangkai',
                'description' => 'Gagasan radikal Douwes Dekker, Cipto Mangunkusumo, dan Suwardi Suryaningrat.',
                'order' => 5,
                'thumbnail_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Indische_Partij_logo.svg/1024px-Indische_Partij_logo.svg.png',
                'text_content' => 'Indische Partij (IP) adalah partai politik pertama di Hindia Belanda yang secara terang-terangan menyerukan kemerdekaan penuh dari Belanda. Didirikan pada tahun 1912 oleh "Tiga Serangkai"—E.F.E. Douwes Dekker (Setiabudi), Cipto Mangunkusumo, dan Suwardi Suryaningrat (Ki Hadjar Dewantara)—IP bersifat inklusif dan menerima anggota dari semua ras. Karena gagasan-gagasannya yang dianggap radikal, IP dengan cepat dilarang oleh pemerintah kolonial dan para pemimpinnya diasingkan.'
            ],
            
            [
                'title' => 'Era VOC: Awal Kolonialisme',
                'description' => 'Memahami cikal bakal penjajahan dan monopoli dagang di Nusantara.',
                'order' => 6,
                'thumbnail_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Coat_of_arms_of_the_Dutch_East_Indies.svg/1200px-Coat_of_arms_of_the_Dutch_East_Indies.svg.png',
                'text_content' => 'Vereenigde Oostindische Compagnie (VOC) adalah sebuah kongsi dagang Belanda yang diberikan hak monopoli perdagangan di Asia oleh pemerintah Belanda. Selama dua abad, VOC beroperasi layaknya sebuah negara, memiliki tentara sendiri, mencetak uang, dan berperang. Ini adalah awal dari kolonialisme sistematis di Nusantara.'
            ],
            [
                'title' => 'Kursus Tambahan 7: Politik Etis',
                'description' => 'Deskripsi singkat tentang dampak Politik Etis.',
                'order' => 7,
                'thumbnail_url' => 'https://via.placeholder.com/320x160.png?text=Kursus+7',
                'text_content' => 'Politik Etis atau Politik Balas Budi adalah kebijakan pemerintah kolonial Belanda yang bertujuan untuk "membalas budi" kepada rakyat Hindia Belanda. Kebijakan ini berfokus pada tiga pilar: Edukasi (pendidikan), Irigasi (pengairan), dan Emigrasi (perpindahan penduduk). Ironisnya, pendidikan yang diberikan justru melahirkan kaum elite terpelajar yang kemudian memimpin pergerakan nasional.'
            ],
            [
                'title' => 'Kursus Tambahan 8: Perang Diponegoro',
                'description' => 'Deskripsi singkat tentang Perang Diponegoro.',
                'order' => 8,
                'thumbnail_url' => 'https://via.placeholder.com/320x160.png?text=Kursus+8',
                'text_content' => 'Perang Jawa atau Perang Diponegoro (1825-1830) adalah salah satu perang terbesar yang pernah dihadapi Belanda selama masa penjajahannya. Dipimpin oleh Pangeran Diponegoro, perang ini menguras kas Belanda dan mengakibatkan kerugian besar di kedua belah pihak. Perang ini sering dianggap sebagai salah satu titik balik dalam perlawanan rakyat terhadap kolonialisme.'
            ],
            [
                'title' => 'Kursus Tambahan 9: Volksraad',
                'description' => 'Deskripsi singkat tentang Dewan Rakyat (Volksraad).',
                'order' => 9,
                'thumbnail_url' => 'https://via.placeholder.com/320x160.png?text=Kursus+9',
                'text_content' => 'Volksraad ("Dewan Rakyat") didirikan pada tahun 1918 oleh pemerintah kolonial sebagai lembaga perwakilan. Awalnya, lembaga ini hanya memiliki wewenang sebagai penasihat. Namun, melalui perjuangan tokoh-tokoh pergerakan nasional di dalamnya, Volksraad menjadi arena penting untuk menyuarakan tuntutan otonomi dan, pada akhirnya, kemerdekaan.'
            ],
            [
                'title' => 'Kursus Tambahan 10: Romusha',
                'description' => 'Deskripsi singkat tentang era Romusha.',
                'order' => 10,
                'thumbnail_url' => 'https://via.placeholder.com/320x160.png?text=Kursus+10',
                'text_content' => 'Romusha adalah sistem kerja paksa yang diterapkan oleh Jepang selama masa pendudukan mereka di Indonesia (1942-1945). Jutaan rakyat Indonesia dipaksa bekerja di proyek-proyek infrastruktur militer yang berat tanpa upah yang layak. Kebijakan ini menyebabkan penderitaan yang luar biasa dan kematian ratusan ribu orang, menjadi salah satu kenangan terkelam dalam sejarah penjajahan di Indonesia.'
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
                'title' => 'Materi PDF - ' . $data['title'],
                'order' => 1,
                'is_published' => true,
                'type' => 'document',
                'content_url' => $pdfLink,
                'content_text' => null
            ]);
            
            Material::create([
                'course_id' => $course->id,
                'title' => 'Materi Teks - ' . $data['title'],
                'order' => 2,
                'is_published' => true,
                'type' => 'document',
                'content_url' => null,
                'content_text' => $data['text_content']
            ]);
            
            Material::create([
                'course_id' => $course->id,
                'title' => 'Materi Video - ' . $data['title'],
                'order' => 3,
                'is_published' => true,
                'type' => 'video',
                'content_url' => $videoLink,
                'content_text' => null
            ]);
        }
    }
}