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

function ActiveChat({ history }) {
    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    return (
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {history.map((item) => (
                <ChatBubble
                    key={item.id}
                    role={item.role}
                    message={item.message}
                />
            ))}
        </div>
    );
}

export default function ChatHistory() {
    const { history } = useChat();
    
    return history.length === 0 ? (
        <EmptyState />
    ) : (
        <ActiveChat history={history} />
    );
}
