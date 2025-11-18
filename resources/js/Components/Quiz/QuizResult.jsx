import { Link } from '@inertiajs/react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function QuizResult({ result = dummyResult }) {
    const { score, correctAnswers, totalQuestions, quizTitle, courseId } = result;

    return (
        <div className="flex flex-col items-center max-w-2xl mx-auto">
            
            <h2 className="text-xl font-semibold text-gray-700 text-center my-6">
                Kerja bagus telah menyelesaikan <span className="font-bold text-gray-900">{quizTitle}</span>
            </h2>

            <div className="w-36 h-3w-36 my-8">
                <CircularProgressbar
                    value={score}
                    text={`${score}/100`}
                    styles={buildStyles({
                        textSize: '20px',
                        pathColor: '#2563eb', 
                        textColor: '#111827', 
                        trailColor: '#e5e7eb',
                    })}
                />
            </div>

            <p className="text-lg text-gray-700">
                Jumlah jawaban benar: <span className="font-bold">{correctAnswers}</span> dari {totalQuestions} soal
            </p>
            <p className="text-sm text-gray-500 mt-2">
                Setiap percobaan adalah kesempatan untuk belajar.
            </p>

            <Link
                href={route('course.show', courseId)}
                className="mt-8 bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
            >
                Kembali ke course
            </Link>

        </div>
    );
}