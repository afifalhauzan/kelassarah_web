import LessonAccordion from "@/Components/CourseDetail/LessonAccordion";
import { Link } from "@inertiajs/react";

const QuizIcon = () => (
    <svg
        className="w-6 h-6 mr-3 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
    </svg>
);

export default function LessonList({ lessons }) {
    return (
        <div className="space-y-4">
            {lessons.map((lesson) => (
                <div key={`${lesson.lesson_type}-${lesson.id}`}>
                    {/* --- REVISI UTAMA DI SINI --- */}

                    {/* 1. Kalo tipenya 'quiz', render sebagai <button disabled> */}
                    {lesson.lesson_type === "quiz" && (
                        <button
                            disabled // <-- Bikin tombolnya "mati"
                            className="flex w-full items-center p-4 bg-blue-600 text-white rounded-lg shadow-md transition opacity-70 cursor-not-allowed" // <-- Ganti style-nya
                        >
                            <QuizIcon />
                            <span className="text-lg font-medium">
                                {lesson.title}
                            </span>
                            <span className="ml-auto text-xs text-blue-200">
                                (Segera Hadir)
                            </span>
                        </button>
                    )}

                    {/* 2. Kalo tipenya 'material', render sebagai <LessonAccordion> */}
                    {lesson.lesson_type === "material" && (
                        <LessonAccordion lesson={lesson} />
                    )}
                </div>
            ))}

            {lessons.length === 0 && (
                <p className="text-gray-500">
                    Belum ada materi atau kuis untuk kursus ini.
                </p>
            )}
        </div>
    );
}
