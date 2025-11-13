import { useChat } from "@/Context/ChatContext";
import { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";

function EmptyState() {
    return (
        <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center text-center">
            <img
                src="/chatbot/chat-maskot.svg"
                alt="Maskot Kak Sarah Full"
                className="h-32 w-auto mb-4"
            />
            <p className="text-gray-700 text-lg font-semibold">
                Ayo, kita telusuri kisah hebat
            </p>
            <p className="text-gray-700 text-lg font-semibold">
                para pahlawan Nusantara!
            </p>
        </div>
    );
}

function PendingIndicator() {
    return (
        <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <img
                    src="/chatbot/chat-maskot.svg"
                    alt="Kak Sarah"
                    className="w-6 h-6"
                />
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-2 max-w-xs">
                <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
            </div>
        </div>
    );
}

function ActiveChat({ history, chatStatus }) {
    const scrollRef = useRef(null);
    
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, chatStatus]);

    return (
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {history.map((item) => (
                <ChatBubble
                    key={item.id}
                    role={item.role}
                    message={item.message}
                />
            ))}
            
            {/* Show pending indicator when waiting for assistant response */}
            {chatStatus === "pending" && <PendingIndicator />}
        </div>
    );
}

export default function ChatHistory() {
    const { history, chatStatus } = useChat();
    
    return history.length === 0 && chatStatus === "idle" ? (
        <EmptyState />
    ) : (
        <ActiveChat history={history} chatStatus={chatStatus} />
    );
}
