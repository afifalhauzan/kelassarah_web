import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
    const [isOpen, setisOpen] = useState(false);
    const [history, setHistory] = useState([]);
    const [showResetConsent, setShowResetConsent] = useState(false);
    const [chatContextCourseld, setChatContextCourseld] = useState(1); // Default to course 1
    const [chatStatus, setChatStatus] = useState("idle");
    const [isPolling, setIsPolling] = useState(false);
    
    const pollingIntervalRef = useRef(null);
    const lastMessageIdRef = useRef(null);

    // Convert API message format to ChatContext format
    const convertApiMessage = useCallback((apiMessage) => {
        return {
            id: apiMessage.id,
            role: apiMessage.role,
            message: apiMessage.content,
            timestamp: apiMessage.created_at
        };
    }, []);

    // Fetch all messages for the course
    const fetchAllMessages = useCallback(async (courseId) => {
        try {
            const response = await fetch(`/chat/${courseId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
                }
            });

            if (response.ok) {
                const messages = await response.json();
                // Convert and sort messages by created_at (oldest first for chat history)
                const convertedMessages = messages
                    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                    .map(convertApiMessage);
                
                setHistory(convertedMessages);
                
                // Update last message ID for polling reference
                if (messages.length > 0) {
                    lastMessageIdRef.current = messages[messages.length - 1].id;
                }
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }, [convertApiMessage]);

    // Simple polling that just checks if there are new messages and refreshes
    const pollForNewMessages = useCallback(async (courseId) => {
        try {
            const response = await fetch(`/chat/${courseId}/last`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
                }
            });

            if (response.ok) {
                const lastMessage = await response.json();
                
                // If we have a new message (different ID from our last tracked)
                if (lastMessage && lastMessage.id !== lastMessageIdRef.current) {
                    console.log('New message detected, refreshing chat history');
                    
                    // Same logic as refresh button - refetch all messages
                    fetchAllMessages(courseId);
                    
                    // Update chat status if this is an assistant message
                    if (lastMessage.role === 'assistant') {
                        setChatStatus("completed");
                        setTimeout(() => setChatStatus("idle"), 2000);
                    }
                }
            }
        } catch (error) {
            console.error('Error polling for new messages:', error);
        }
    }, [fetchAllMessages]);

    // Start polling when chat is opened
    useEffect(() => {
        if (isOpen && chatContextCourseld && !isPolling) {
            console.log('Starting polling for course:', chatContextCourseld);
            setIsPolling(true);
            
            // Initial load of all messages
            fetchAllMessages(chatContextCourseld);
            
            // Start polling every 1 second (more aggressive to catch responses faster)
            pollingIntervalRef.current = setInterval(() => {
                pollForNewMessages(chatContextCourseld);
            }, 1000);
        }

        // Stop polling when chat is closed
        if (!isOpen && pollingIntervalRef.current) {
            console.log('Stopping polling');
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
            setIsPolling(false);
        }

        return () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
                pollingIntervalRef.current = null;
            }
        };
    }, [isOpen, chatContextCourseld, isPolling, fetchAllMessages, pollForNewMessages]);

    const sendMessage = useCallback(async (newMessage) => {
        if (!chatContextCourseld) {
            console.error('No course ID set for chat');
            return;
        }

        // Set status to pending immediately
        setChatStatus("pending");

        try {
            // Send message to API
            const response = await fetch(`/chat/${chatContextCourseld}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
                },
                body: JSON.stringify({
                    content: newMessage,
                })
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Message sent successfully:', result);
                
                // Refresh chat history - same logic as refresh button
                setTimeout(() => {
                    fetchAllMessages(chatContextCourseld);
                }, 500); // Small delay to allow backend processing
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setChatStatus("error");
            setTimeout(() => setChatStatus("idle"), 3000);
        }
    }, [chatContextCourseld, fetchAllMessages]);

    const resetChat = useCallback(() => {
        setHistory([]);
        setChatStatus("idle");
        lastMessageIdRef.current = null;
        
        // Refetch messages after reset
        if (isOpen && chatContextCourseld) {
            fetchAllMessages(chatContextCourseld);
        }
    }, [isOpen, chatContextCourseld, fetchAllMessages]);

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
        isPolling,
        fetchAllMessages,
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
