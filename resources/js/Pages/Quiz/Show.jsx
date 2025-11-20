import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { MdChevronRight } from "react-icons/md";
import QuizActive from "@/Components/Quiz/QuizActive";
import EssayActive from "@/Components/Quiz/EssayActive";
import QuizResult from "@/Components/Quiz/QuizResult";

function QuizStartScreen({ quiz, onStartClick }) {
    const isEssay = quiz.type === 'essay';
    
    return (
        <div>
            <p className="text-sm text-gray-500 mb-6">
                Dibuka: {quiz.published_at}
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {isEssay ? "Selamat Datang di Essay Quiz!" : "Selamat Datang, Jurnalis Muda!"}
                </h2>
                <div className="prose max-w-none text-gray-700">
                    {isEssay ? (
                        <>
                            <p>
                                Anda akan mengerjakan soal essay yang memerlukan pemahaman mendalam dan kemampuan analisis. 
                                Jawablah dengan lengkap dan jelas sesuai dengan pertanyaan yang diberikan.
                            </p>
                            <ul className="list-disc pl-5">
                                <li>Bacalah setiap pertanyaan dengan teliti sebelum menjawab.</li>
                                <li>Berikan jawaban yang komprehensif dan terstruktur.</li>
                                <li>Perhatikan batas jumlah kata yang ditetapkan (jika ada).</li>
                                <li>Jawaban Anda akan dinilai oleh pengajar.</li>
                            </ul>
                        </>
                    ) : (
                        <>
                            <p>
                                Sebelum memulai petualanganmu sebagai seorang jurnalis
                                sejarah, mari kita lihat sejauh mana pemahaman awalmu
                                tentang peristiwa bersejarah ini. Tes ini tidak akan
                                memengaruhi nilaimu, jadi kerjakan dengan jujur dan
                                santai, ya!
                            </p>
                            <ul className="list-disc pl-5">
                                <li>
                                    Bacalah setiap pertanyaan dengan teliti sebelum
                                    menjawab.
                                </li>
                                <li>
                                    Pilihlah satu jawaban yang kamu anggap paling benar.
                                </li>
                                <li>
                                    Kerjakan secara mandiri untuk mengukur pemahamanmu
                                    sendiri.
                                </li>
                            </ul>
                        </>
                    )}
                    <p>Semangat!</p>
                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <button
                    onClick={onStartClick}
                    className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
                >
                    Mulai Sekarang
                </button>
            </div>
        </div>
    );
}

export default function Show({ course, quiz, questions, essays }) {
    const [quizStatus, setQuizStatus] = useState("not_started");
    const [quizResult, setQuizResult] = useState(null);

    const handleQuizFinish = (result) => {
        setQuizResult(result);
        setQuizStatus("finished");
    };

    const isEssay = quiz.type === 'essay';

    return (
        <AuthenticatedLayout>
            <Head title={quiz.title} />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 md:p-8 text-gray-900">
                            <div className="mb-2 text-sm text-gray-500 flex items-center flex-nowrap overflow-hidden">
                                <Link
                                    href={route("dashboard")}
                                    className="text-gray-500 hover:text-gray-700 hover:underline shrink-0"
                                >
                                    Dashboard
                                </Link>

                                <MdChevronRight className="h-5 w-5 shrink-0" />

                                <Link
                                    href={route("courses")}
                                    className="text-gray-500 hover:text-gray-700 hover:underline shrink-0"
                                >
                                    Kursus
                                </Link>

                                <MdChevronRight className="h-5 w-5 shrink-0" />

                                <span className="font-medium text-gray-800 truncate min-w-0">
                                    {course.title}
                                </span>
                                <MdChevronRight className="h-5 w-5" />
                                <span className="font-medium text-gray-800 truncate min-w-0">
                                    {quiz.title}
                                </span>
                            </div>

                            {quizStatus !== "finished" && (
                                <h1 className="text-3xl font-bold text-blue-600 text-center my-6 max-w-2xl mx-auto">
                                    {quiz.title}
                                </h1>
                            )}

                            {quizStatus === "not_started" && (
                                <QuizStartScreen
                                    quiz={quiz}
                                    onStartClick={() => setQuizStatus("active")}
                                />
                            )}

                            {quizStatus === "active" && isEssay && (
                                <EssayActive
                                    course={course}
                                    quiz={quiz}
                                    essays={essays}
                                    onFinish={handleQuizFinish}
                                />
                            )}

                            {quizStatus === "active" && !isEssay && (
                                <QuizActive
                                    course={course}
                                    quiz={quiz}
                                    questions={questions}
                                    onFinish={handleQuizFinish}
                                />
                            )}

                            {quizStatus === "finished" && (
                                <QuizResult result={quizResult} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
