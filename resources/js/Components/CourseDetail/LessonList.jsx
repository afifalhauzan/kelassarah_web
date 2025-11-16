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

const CompletedIcon = () => (
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
    </svg>
);

export default function LessonList({ lessons }) {
    return (
        <div className="space-y-4">
            {lessons.map((lesson) => (
                <div key={`${lesson.lesson_type}-${lesson.id}`}>
                    {lesson.lesson_type === "quiz" && (
                        <Link
                            href={route("quiz.show", lesson.id)}
                            className={`flex w-full items-center p-4 rounded-lg shadow-md transition
                                ${
                                    lesson.is_completed
                                        ? "bg-green-600 hover:bg-green-700 text-white"
                                        : "bg-blue-600 hover:bg-blue-700 text-white"
                                }
                            `}
                        >
                            {lesson.is_completed ? (
                                <CompletedIcon />
                            ) : (
                                <QuizIcon />
                            )}

                            <span className="text-lg font-medium">
                                {lesson.title}
                            </span>

                            {lesson.is_completed && (
                                <span className="ml-auto text-xs text-green-100 font-semibold">
                                    (Selesai)
                                </span>
                            )}
                        </Link>
                    )}

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
