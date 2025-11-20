import { useState } from "react";
import EssayQuestion from "./EssayQuestion";
import axios from "axios";

export default function EssayActive({ course, quiz, essays, onFinish }) {
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAnswerChange = (essayId, answerText) => {
        if (isSubmitting) return;

        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [essayId]: answerText,
        }));
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        axios
            .post(route("quiz.submit", quiz.id), { essays: answers })
            .then((response) => {
                const result = response.data;
                onFinish(result);
            })
            .catch((error) => {
                console.error("Gagal submit essay:", error);
                alert("Gagal mengirim jawaban, coba lagi.");
                setIsSubmitting(false);
            });
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
                {essays.map((essay, index) => (
                    <EssayQuestion
                        key={essay.id}
                        essay={essay}
                        questionNumber={index + 1}
                        totalQuestions={essays.length}
                        answer={answers[essay.id] || ""}
                        onAnswerChange={handleAnswerChange}
                        disabled={isSubmitting}
                    />
                ))}
            </div>

            <div className="mt-12 flex justify-center">
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-green-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-green-700 disabled:opacity-50 transition"
                >
                    {isSubmitting ? "Mengirim..." : "Submit Jawaban"}
                </button>
            </div>
        </div>
    );
}