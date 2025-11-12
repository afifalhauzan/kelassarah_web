import { createContext, useContext, useState, useCallback } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
    const [isOpen, setisOpen] = useState(false);
    const [history, setHistory] = useState([]);
    const [showResetConsent, setShowResetConsent] = useState(false);
    const [chatContextCourseld, setChatContextCourseld] = useState(null);
    const [chatStatus, setChatStatus] = useState("idle");

    const sendMessage = useCallback((newMessage) => {
        const userMessage = {
            id: Date.now(),
            role: "user",
            message: newMessage,
        };
        setHistory((prev) => [...prev, userMessage]);

        setChatStatus("pending");
        const pendingMessage = {
            id: Date.now() + 1,
            role: "assistant",
            message: "Sedang berpikir...",
        };
        setHistory((prev) => [...prev, pendingMessage]);

        setTimeout(() => {
            setHistory((prev) =>
                prev.filter((msg) => msg.id !== pendingMessage.id)
            );

            const assistantMessage = {
                id: Date.now() + 2,
                role: "assistant",
                message: "Pertanyaan yang bagus!",
            };
            setHistory((prev) => [...prev, assistantMessage]);

            setChatStatus("completed");

            setTimeout(() => {
                setChatStatus("idle");
            }, 2000);
        }, 4000);
    }, []);

    const resetChat = useCallback(() => {
        setHistory([]);
        setChatStatus("idle");
    }, []);

    const value = {
        isOpen,
        setisOpen,
        history,
        setHistory,
        resetChat,
        showResetConsent,
        setShowResetConsent,
        chatContextCourseld,
        setChatContextCourseld,
        chatStatus,
        sendMessage,
    };

    return (
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    );
}

export const useChat = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};
