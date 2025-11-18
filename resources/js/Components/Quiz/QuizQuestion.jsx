import React from "react";

export default function QuizQuestion({
    question,
    questionNumber,
    totalQuestions,
    selectedOption,
    onOptionSelect,
    disabled = false,
}) {
    return (
        <div>
            <p className="text-sm font-semibold text-blue-600 mb-2">
                Pertanyaan {questionNumber} dari {totalQuestions}
            </p>

            <p className="font-medium text-gray-900 text-lg mb-6">
                {question.question_text}
            </p>

            <div className="space-y-3">
                {question.options.map((opt, index) => {
                    const letter = String.fromCharCode(65 + index);
                    const isSelected = selectedOption === opt.id;

                    return (
                        <button
                            key={opt.id}
                            onClick={() => onOptionSelect(question.id, opt.id)}
                            disabled={disabled}
                            className={`flex w-full items-center p-4 rounded-lg border text-left transition-colors
                                ${
                                    isSelected
                                        ? "bg-blue-600 text-white border-blue-600" 
                                        : "bg-white hover:bg-gray-50 text-gray-800 border-gray-300"
                                }
                                ${
                                    disabled
                                        ? "cursor-not-allowed opacity-70"
                                        : ""
                                }
                            `}
                        >
                            <span
                                className={`font-semibold mr-4 ${
                                    isSelected ? "text-white" : "text-gray-600"
                                }`}
                            >
                                {letter}.
                            </span>

                            <span className="flex-1">{opt.option_text}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
