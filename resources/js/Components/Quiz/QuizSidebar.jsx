import React from "react";
import QuizTimer from "./QuizTimer";

export default function QuizSidebar({
    questions,
    answers,
    currentQuestionIndex,
    onQuestionSelect,
    totalTimeMinutes = 90,
    disabled = false,
}) {
    return (
        <div className="w-full md:w-2/5 mt-8 md:mt-0">
            <QuizTimer totalMinutes={totalTimeMinutes} />

            <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-5 gap-2">
                    {questions.map((q, index) => {
                        const isCurrent = index === currentQuestionIndex;
                        const isAnswered = answers[q.id];
                        
                        let buttonStyle =
                            "bg-white hover:bg-gray-50 border-gray-300 text-gray-700";

                        if (isAnswered) {
                            buttonStyle =
                                "bg-blue-100 border-blue-200 text-blue-700";
                        }

                        if (isCurrent) {
                            buttonStyle =
                                "bg-blue-600 border-blue-600 text-white";
                        }

                        return (
                            <button
                                key={q.id}
                                onClick={() => onQuestionSelect(index)}
                                disabled={disabled}
                                className={`h-10 w-10 rounded-lg border transition ${buttonStyle} ${
                                    disabled
                                        ? "opacity-70 cursor-not-allowed"
                                        : ""
                                }`}
                            >
                                {index + 1}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
