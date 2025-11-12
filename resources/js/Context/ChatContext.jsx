import { createContext, useContext, useState, useCallback } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
    const [isOpen, setisOpen] = useState(false);
    const [history, setHistory] = useState([]);
    const [showResetConsent, setShowResetConsent] = useState(false);
    const [chatContextCourseld, setChatContextCourseld] = useState(null);

    const openChat = () => setisOpen(true);

    const resetChat = useCallback(() => {
        setHistory([]);
    }, []);

    const value = {
        isOpen,
        setisOpen,
        openChat,
        history,
        setHistory,
        resetChat,
        showResetConsent,
        setShowResetConsent,
        chatContextCourseld,
        setChatContextCourseld,
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
