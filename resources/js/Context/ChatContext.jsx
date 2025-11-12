import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { router } from '@inertiajs/react';

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

    // Poll for new messages
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
                
                // Only add if it's a new message
                if (lastMessage && lastMessage.id !== lastMessageIdRef.current) {
                    // Check if this message is newer than our current history
                    const isNewMessage = !history.find(msg => msg.id === lastMessage.id);
                    
                    if (isNewMessage) {
                        const convertedMessage = convertApiMessage(lastMessage);
                        setHistory(prev => [...prev, convertedMessage]);
                        lastMessageIdRef.current = lastMessage.id;
                        
                        // Update chat status if it was pending
                        if (lastMessage.role === 'assistant') {
                            setChatStatus("completed");
                            setTimeout(() => setChatStatus("idle"), 2000);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error polling for new messages:', error);
        }
    }, [history, convertApiMessage]);

    // Start polling when chat is opened
    useEffect(() => {
        if (isOpen && chatContextCourseld && !isPolling) {
            setIsPolling(true);
            
            // Initial load of all messages
            fetchAllMessages(chatContextCourseld);
            
            // Start polling every 2 seconds
            pollingIntervalRef.current = setInterval(() => {
                pollForNewMessages(chatContextCourseld);
            }, 2000);
        }

        // Stop polling when chat is closed
        if (!isOpen && pollingIntervalRef.current) {
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

    const sendMessage = useCallback((newMessage) => {
        if (!chatContextCourseld) {
            console.error('No course ID set for chat');
            return;
        }

        // Add user message immediately to UI
        const userMessage = {
            id: Date.now(), // Temporary ID until we get real ID from server
            role: "user",
            message: newMessage,
            timestamp: new Date().toISOString()
        };
        setHistory((prev) => [...prev, userMessage]);

        // Set status to pending
        setChatStatus("pending");

        // Send message to API
        router.post(`/chat/${chatContextCourseld}`, {
            content: newMessage,
        }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                console.log('Message sent successfully:', page.props);
                
                // Update the temporary message with real data if available
                // The polling system will handle adding the assistant's response
            },
            onError: (errors) => {
                console.error('Error sending message:', errors);
                setChatStatus("error");
                
                // Remove the temporary message on error
                setHistory(prev => prev.filter(msg => msg.id !== userMessage.id));
                
                setTimeout(() => setChatStatus("idle"), 3000);
            },
            onFinish: () => {
                // Keep status as pending until we get the assistant response via polling
            }
        });
    }, [chatContextCourseld]);

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
