<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Quiz;
use App\Models\Question;
use App\Models\Option;
use App\Models\Course;

class QuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = Course::whereIn('order', [1, 4])->get();

        foreach ($courses as $course) {

            $quiz = Quiz::create([
                'course_id' => $course->id,
                'title' => $course->id == 1 ? 'Pre Test - ' . $course->title : 'Post Test - ' . $course->title,
                'content' => 'Uji pemahamanmu tentang materi ' . $course->title,
                'order' => 99,
                'is_published' => '1',
            ]);

            // -------- Soal 1 --------
            $q1 = Question::create([
                'quiz_id' => $quiz->id,
                'question_text' => 'Faktor eksternal yang membuktikan bahwa bangsa Asia bisa mengalahkan bangsa Barat, sehingga membangkitkan nasionalisme di Asia, adalah...',
            ]);
            Option::create(['question_id' => $q1->id, 'option_text' => 'Kemenangan Jepang atas Rusia (1905)', 'is_correct' => '1']);
            Option::create(['question_id' => $q1->id, 'option_text' => 'Pergerakan Mahatma Gandhi di India', 'is_correct' => '0']);
            Option::create(['question_id' => $q1->id, 'option_text' => 'Revolusi Sun Yat Sen di Cina', 'is_correct' => '0']);
            Option::create(['question_id' => $q1->id, 'option_text' => 'Lahirnya Komunitas Jawi di Makkah', 'is_correct' => '0']);

            // -------- Soal 2 --------
            $q2 = Question::create([
                'quiz_id' => $quiz->id,
                'question_text' => 'Organisasi yang didirikan pada 20 Mei 1908 oleh para pelajar STOVIA di Batavia dan dipimpin oleh R. Soetomo adalah...',
            ]);
            Option::create(['question_id' => $q2->id, 'option_text' => 'Sarekat Islam (SI)', 'is_correct' => '0']);
            Option::create(['question_id' => $q2->id, 'option_text' => 'Boedi Oetomo', 'is_correct' => '1']);
            Option::create(['question_id' => $q2->id, 'option_text' => 'Indische Partij', 'is_correct' => '0']);
            Option::create(['question_id' => $q2->id, 'option_text' => 'Perhimpoenan Peladjar-Peladjar Indonesia (PPPI)', 'is_correct' => '0']);

            // -------- Soal 3 --------
            $q3 = Question::create([
                'quiz_id' => $quiz->id,
                'question_text' => 'Sarekat Dagang Islam (SDI) awalnya didirikan oleh Haji Samanhudi di Solo dengan tujuan utama...',
            ]);
            Option::create(['question_id' => $q3->id, 'option_text' => 'Mencapai kemerdekaan Hindia dari kolonial', 'is_correct' => '0']);
            Option::create(['question_id' => $q3->id, 'option_text' => 'Mengangkat derajat bangsa melalui pendidikan', 'is_correct' => '0']);
            Option::create(['question_id' => $q3->id, 'option_text' => 'Menggalang kerja sama pedagang Islam bumiputera', 'is_correct' => '1']);
            Option::create(['question_id' => $q3->id, 'option_text' => 'Menyatukan pemuda dari berbagai daerah', 'is_correct' => '0']);

            // -------- Soal 4 --------
            $q4 = Question::create([
                'quiz_id' => $quiz->id,
                'question_text' => 'Siapakah "Tiga Serangkai" yang mendirikan Indische Partij (IP), partai politik pertama di Hindia Belanda yang berideologi nasionalisme?',
            ]);
            Option::create(['question_id' => $q4->id, 'option_text' => 'Soetomo, Wahidin Soedirohoesodo, dan Samanhudi', 'is_correct' => '0']);
            Option::create(['question_id' => $q4->id, 'option_text' => 'Mohammad Yamin, Soegondo Djojopoespito, dan M. Tabrani', 'is_correct' => '0']);
            Option::create(['question_id' => $q4->id, 'option_text' => 'Poernomowoelan, Sarmidi Mangoensarkoro, dan Soenario', 'is_correct' => '0']);
            Option::create(['question_id' => $q4->id, 'option_text' => 'Douwes Dekker, Tjipto Mangunkusumo, dan Suwardi Suryaningrat', 'is_correct' => '1']);

            // -------- Soal 5 --------
            $q5 = Question::create([
                'quiz_id' => $quiz->id,
                'question_text' => 'Apa yang menjadi akar masalah utama kegagalan Kongres Pemuda I pada tahun 1926 dalam upaya menyatukan organisasi pemuda?',
            ]);
            Option::create(['question_id' => $q5->id, 'option_text' => 'Ego kedaerahan yang masih sangat kuat', 'is_correct' => '1']);
            Option::create(['question_id' => $q5->id, 'option_text' => 'Larangan keras dari pemerintah kolonial Belanda', 'is_correct' => '0']);
            Option::create(['question_id' => $q5->id, 'option_text' => 'Perdebatan mengenai lokasi kongres', 'is_correct' => '0']);
            Option::create(['question_id' => $q5->id, 'option_text' => 'Kekurangan dana penyelenggaraan', 'is_correct' => '0']);

            // -------- Soal 6 --------
            $q6 = Question::create([
                'quiz_id' => $quiz->id,
                'question_text' => 'Apa perbedaan fundamental antara fokus perjuangan Boedi Oetomo (BO) saat awal berdiri dengan Indische Partij (IP)?',
            ]);
            Option::create(['question_id' => $q6->id, 'option_text' => 'Budi Oetomo fokus pada agama Islam, sedangkan IP fokus pada perdagangan.', 'is_correct' => '0']);
            Option::create(['question_id' => $q6->id, 'option_text' => 'Budi Oetomo bersifat moderat dan kultural (Jawa), sedangkan IP bersifat politik radikal (menuntut kemerdekaan Hindia).', 'is_correct' => '1']);
            Option::create(['question_id' => $q6->id, 'option_text' => 'Budi Oetomo ingin membentuk parlemen (Volksraad), sedangkan IP ingin memajukan pendidikan.', 'is_correct' => '0']);
            Option::create(['question_id' => $q6->id, 'option_text' => 'Budi Oetomo didirikan oleh kaum terpelajar (STOVIA), sedangkan IP didirikan oleh pedagang (SDI).', 'is_correct' => '0']);

            // -------- Soal 7 --------
            $q7 = Question::create([
                'quiz_id' => $quiz->id,
                'question_text' => 'Siapakah tokoh dari Jong Sumatranen Bond yang terlibat aktif dalam perdebatan mengenai istilah "Bahasa Indonesia" (bukan Bahasa Melayu) sejak Kongres Pemuda I?',
            ]);
            Option::create(['question_id' => $q7->id, 'option_text' => 'Soegondo Djojopoespito', 'is_correct' => '0']);
            Option::create(['question_id' => $q7->id, 'option_text' => 'Mohammad Yamin', 'is_correct' => '1']);
            Option::create(['question_id' => $q7->id, 'option_text' => 'M. Tabrani', 'is_correct' => '0']);
            Option::create(['question_id' => $q7->id, 'option_text' => 'Wage Rudolf Supratman', 'is_correct' => '0']);

            // -------- Soal 8 --------
            $q8 = Question::create([
                'quiz_id' => $quiz->id,
                'question_text' => 'Dalam pidatonya di Rapat Pertama Kongres Pemuda II, Mohammad Yamin menguraikan lima faktor yang dapat memperkuat persatuan. Berikut ini yang bukan termasuk lima faktor tersebut adalah...',
            ]);
            Option::create(['question_id' => $q8->id, 'option_text' => 'Sejarah dan Hukum Adat', 'is_correct' => '0']);
            Option::create(['question_id' => $q8->id, 'option_text' => 'Pendidikan dan Kemauan bersatu', 'is_correct' => '0']);
            Option::create(['question_id' => $q8->id, 'option_text' => 'Hukum dan Bahasa', 'is_correct' => '0']);
            Option::create(['question_id' => $q8->id, 'option_text' => 'Kekuatan militer dan ekonomi', 'is_correct' => '1']);

            // -------- Soal 9 --------
            $q9 = Question::create([
                'quiz_id' => $quiz->id,
                'question_text' => 'Mengapa peran Soegondo Djojopoespito (PPPI) sebagai ketua Kongres Pemuda II dianggap sangat krusial jika dilihat dari kegagalan Kongres Pemuda I?',
            ]);
            Option::create(['question_id' => $q9->id, 'option_text' => 'Karena ia yang menulis naskah Sumpah Pemuda dari awal hingga akhir.', 'is_correct' => '0']);
            Option::create(['question_id' => $q9->id, 'option_text' => 'Karena ia adalah anggota PPPI, organisasi pemuda paling kaya saat itu.', 'is_correct' => '0']);
            Option::create(['question_id' => $q9->id, 'option_text' => 'Karena ia berperan sebagai negosiator untuk meredam ego kedaerahan yang menggagalkan kongres sebelumnya.', 'is_correct' => '1']);
            Option::create(['question_id' => $q9->id, 'option_text' => 'Karena ia satu-satunya yang berani berpidato menentang pemerintah kolonial.', 'is_correct' => '0']);

            // -------- Soal 10 --------
            $q10 = Question::create([
                'quiz_id' => $quiz->id,
                'question_text' => 'Rapat Kedua Kongres Pemuda II (Minggu pagi, 28 Oktober 1928) yang dilaksanakan di Gedung Oost-Java Bioscoop memiliki agenda utama membahas...',
            ]);
            Option::create(['question_id' => $q10->id, 'option_text' => 'Persoalan pendidikan demokratis bagi anak.', 'is_correct' => '1']);
            Option::create(['question_id' => $q10->id, 'option_text' => 'Persoalan pendidikan demokratis bagi anak.', 'is_correct' => '0']); // Opsi B identik dengan A di PDF
            Option::create(['question_id' => $q10->id, 'option_text' => 'Gerakan kepanduan.', 'is_correct' => '0']);
            Option::create(['question_id' => $q10->id, 'option_text' => 'Pembacaan ikrar Sumpah Pemuda.', 'is_correct' => '0']);
        }
    }
}