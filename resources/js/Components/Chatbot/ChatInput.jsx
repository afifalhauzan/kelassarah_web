import { useState } from "react";
import { useChat } from "@/Context/ChatContext";

export default function ChatInput() {
    const { sendMessage, chatStatus } = useChat();
    const [inputValue, setInputValue] = useState("");
    
    const isLoading = chatStatus === "pending";

    const handleSubmit = (e) => {
        e.preventDefault();

        const message = inputValue.trim();
        if (!message || isLoading) {
            return;
        }

        sendMessage(message);
        setInputValue("");
    };

    return (
        <div className="shrink-0 border-t p-4">
            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    placeholder={isLoading ? "Menunggu respons..." : "Tanyakan apa saja"}
                    className={`w-full pl-10 pr-12 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={isLoading}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                
                {/* Send button */}
                <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors ${
                        !inputValue.trim() || isLoading
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-blue-500 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                >
                    {isLoading ? (
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                        </svg>
                    )}
                </button>
            </form>
            
            {/* Status indicator */}
            {chatStatus === "error" && (
                <div className="mt-2 text-xs text-red-500 text-center">
                    Terjadi kesalahan. Silakan coba lagi.
                </div>
            )}
        </div>
    );
}
