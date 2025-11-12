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
                console.log('Polling result:', {
                    lastMessageId: lastMessage?.id,
                    lastTrackedId: lastMessageIdRef.current,
                    messageRole: lastMessage?.role,
                    isNewMessage: lastMessage && lastMessage.id !== lastMessageIdRef.current
                });
                
                // Only add if it's a new message and different from our last tracked message
                if (lastMessage && lastMessage.id !== lastMessageIdRef.current) {
                    const convertedMessage = convertApiMessage(lastMessage);
                    
                    // Use functional update to avoid stale closure issues
                    setHistory(prev => {
                        // Check if this message already exists in current history
                        const messageExists = prev.find(msg => msg.id === lastMessage.id);
                        
                        if (!messageExists) {
                            console.log('Adding new message to history:', convertedMessage);
                            // Add the new message
                            lastMessageIdRef.current = lastMessage.id;
                            
                            // Update chat status if it was pending and this is an assistant message
                            if (lastMessage.role === 'assistant') {
                                setChatStatus("completed");
                                setTimeout(() => setChatStatus("idle"), 2000);
                            }
                            
                            return [...prev, convertedMessage];
                        } else {
                            console.log('Message already exists in history, skipping');
                        }
                        
                        return prev;
                    });
                }
            } else {
                console.log('Polling response not ok:', response.status);
            }
        } catch (error) {
            console.error('Error polling for new messages:', error);
        }
    }, [convertApiMessage]);

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

        // Add user message immediately to UI
        const tempId = Date.now(); // Temporary ID until we get real ID from server
        const userMessage = {
            id: tempId,
            role: "user",
            message: newMessage,
            timestamp: new Date().toISOString()
        };
        setHistory((prev) => [...prev, userMessage]);

        // Set status to pending
        setChatStatus("pending");

        try {
            // Send message to API using fetch instead of Inertia router
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
                
                // Refetch all messages to get the real IDs and ensure consistency
                setTimeout(() => {
                    fetchAllMessages(chatContextCourseld);
                }, 500); // Small delay to allow backend processing
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setChatStatus("error");
            
            // Remove the temporary message on error
            setHistory(prev => prev.filter(msg => msg.id !== tempId));
            
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
