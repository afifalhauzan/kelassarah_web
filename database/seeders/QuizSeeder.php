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
        $courses = Course::all();

        foreach ($courses as $course) {
            
            $quiz = Quiz::create([
                'course_id' => $course->id,
                'title' => 'Kuis - ' . $course->title,
                'content' => 'Uji pemahamanmu tentang materi ' . $course->title,
                'order' => 99, 
                'is_published' => '1',
            ]);

            $q1 = Question::create([
                'quiz_id' => $quiz->id,
                'question_text' => 'Manakah yang merupakan fokus utama dari Budi Utomo pada awal berdirinya?',
            ]);
            Option::create(['question_id' => $q1->id, 'option_text' => 'Pendidikan dan Kebudayaan Jawa', 'is_correct' => '1']);
            Option::create(['question_id' => $q1->id, 'option_text' => 'Perang Bersenjata Melawan Belanda', 'is_correct' => '0']);
            Option::create(['question_id' => $q1->id, 'option_text' => 'Reformasi Agraria', 'is_correct' => '0']);
            Option::create(['question_id' => $q1->id, 'option_text' => 'Persatuan Pedagang Islam', 'is_correct' => '0']);

            $q2 = Question::create([
                'quiz_id' => $quiz->id,
                'question_text' => 'Sumpah Pemuda dicetuskan pada Kongres Pemuda ke berapa?',
            ]);
            Option::create(['question_id' => $q2->id, 'option_text' => 'Kongres Pemuda I', 'is_correct' => '0']);
            Option::create(['question_id' => $q2->id, 'option_text' => 'Kongres Pemuda II', 'is_correct' => '1']);
            Option::create(['question_id' => $q2->id, 'option_text' => 'Kongres Nasional', 'is_correct' => '0']);
            Option::create(['question_id' => $q2->id, 'option_text' => 'Sidang BPUPKI', 'is_correct' => '0']);

            $q3 = Question::create([
                'quiz_id' => $quiz->id,
                'question_text' => 'Siapa salah satu dari "Tiga Serangkai" pendiri Indische Partij?',
            ]);
            Option::create(['question_id' => $q3->id, 'option_text' => 'H.O.S. Cokroaminoto', 'is_correct' => '0']);
            Option::create(['question_id' => $q3->id, 'option_text' => 'Soekarno', 'is_correct' => '0']);
            Option::create(['question_id' => $q3->id, 'option_text' => 'Cipto Mangunkusumo', 'is_correct' => '1']);
            Option::create(['question_id' => $q3->id, 'option_text' => 'Mohammad Hatta', 'is_correct' => '0']);

            $q4 = Question::create([
                'quiz_id' => $quiz->id,
                'question_text' => 'Apa semboyan terkenal dari Taman Siswa?',
            ]);
            Option::create(['question_id' => $q4->id, 'option_text' => 'Merdeka atau Mati', 'is_correct' => '0']);
            Option::create(['question_id' => $q4->id, 'option_text' => 'Bhinneka Tunggal Ika', 'is_correct' => '0']);
            Option::create(['question_id' => $q4->id, 'option_text' => 'Sekali Merdeka Tetap Merdeka', 'is_correct' => '0']);
            Option::create(['question_id' => $q4->id, 'option_text' => 'Tut Wuri Handayani', 'is_correct' => '1']);
        }
    }
}