import { useState } from "react";
import QuizQuestion from "./QuizQuestion";
import QuizSidebar from "./QuizSidebar";
import axios from "axios";

export default function QuizActive({ course, quiz, questions, onFinish }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const totalQuestions = questions.length;
    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

    const goToNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const goToPrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const goToQuestion = (index) => {
        setCurrentQuestionIndex(index);
    };

    const handleOptionSelect = (questionId, optionId) => {
        if (isSubmitting) return;

        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: optionId,
        }));
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        axios
            .post(route("quiz.submit", quiz.id), { answers })
            .then((response) => {
                const result = response.data;
                onFinish(result);
            })
            .catch((error) => {
                console.error("Gagal submit kuis:", error);
                alert("Gagal mengirim jawaban, coba lagi.");
                setIsSubmitting(false);
            });
    };

    return (
        <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="w-full md:w-3/5">
                <QuizQuestion
                    question={currentQuestion}
                    questionNumber={currentQuestionIndex + 1}
                    totalQuestions={totalQuestions}
                    selectedOption={answers[currentQuestion.id] || null}
                    onOptionSelect={handleOptionSelect}
                    disabled={isSubmitting}
                />

                <div className="flex justify-between mt-8">
                    <button
                        onClick={goToPrev}
                        disabled={currentQuestionIndex === 0 || isSubmitting}
                        className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                        &larr; Sebelumnya
                    </button>

                    {isLastQuestion ? (
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                            {isSubmitting ? "Mengirim..." : "Akhiri Tes"}
                        </button>
                    ) : (
                        <button
                            onClick={goToNext}
                            disabled={isSubmitting}
                            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            Selanjutnya &rarr;
                        </button>
                    )}
                </div>
            </div>

            <QuizSidebar
                questions={questions}
                answers={answers}
                currentQuestionIndex={currentQuestionIndex}
                onQuestionSelect={goToQuestion}
                totalTimeMinutes={90}
                disabled={isSubmitting}
            />
        </div>
    );
}
