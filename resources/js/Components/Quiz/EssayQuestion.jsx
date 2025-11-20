import React from "react";

export default function EssayQuestion({
    essay,
    questionNumber,
    totalQuestions,
    answer,
    onAnswerChange,
    disabled = false,
}) {
    const wordCount = answer.trim().split(/\s+/).filter(word => word.length > 0).length;
    const isOverLimit = essay.max_words && wordCount > essay.max_words;
    const isNearLimit = essay.max_words && wordCount > essay.max_words * 0.9;

    const handleChange = (e) => {
        onAnswerChange(essay.id, e.target.value);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="mb-4">
                <p className="text-sm font-semibold text-blue-600 mb-2">
                    Pertanyaan {questionNumber} dari {totalQuestions}
                </p>

                <h3 className="font-medium text-gray-900 text-lg mb-4">
                    {essay.question_text}
                </h3>

                {essay.instructions && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <p className="text-sm font-medium text-blue-800 mb-2">Petunjuk:</p>
                        <p className="text-sm text-blue-700">{essay.instructions}</p>
                    </div>
                )}

                {essay.sample_answer && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                        <p className="text-sm font-medium text-gray-800 mb-2">Contoh Jawaban:</p>
                        <p className="text-sm text-gray-600 italic">{essay.sample_answer}</p>
                    </div>
                )}
            </div>

            <div className="space-y-3">
                <textarea
                    value={answer}
                    onChange={handleChange}
                    disabled={disabled}
                    placeholder="Tulis jawaban Anda di sini..."
                    className={`w-full min-h-[200px] p-4 border rounded-lg resize-y transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
                        ${disabled ? "cursor-not-allowed opacity-70 bg-gray-50" : "bg-white"}
                        ${isOverLimit ? "border-red-300 focus:ring-red-500" : "border-gray-300"}
                    `}
                    rows={8}
                />

                <div className="flex justify-between items-center text-sm">
                    <div className={`font-medium ${
                        isOverLimit 
                            ? "text-red-600" 
                            : isNearLimit 
                                ? "text-yellow-600" 
                                : "text-gray-600"
                    }`}>
                        Jumlah kata: {wordCount}
                        {essay.max_words && (
                            <span className="ml-1">/ {essay.max_words} maksimal</span>
                        )}
                    </div>

                    {isOverLimit && (
                        <span className="text-red-600 text-xs">
                            Melebihi batas kata yang diizinkan
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}