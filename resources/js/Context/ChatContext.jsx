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
    const waitingForAssistantRef = useRef(false); // Track if we're waiting for assistant response
    const pollingCounterRef = useRef(0); // Add counter to track polling attempts

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
            router.get(`/chat/${courseId}`, {}, {
                only: ['messages'],
                onSuccess: (page) => {
                    const messages = page.props.messages;
                    handleFetchedMessages(messages);
                },
                onError: (error) => {
                    console.error('Error fetching messages:', error);
                },
                preserveState: true,
                preserveScroll: true
            });
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }, [handleFetchedMessages]);

    // Helper function to process fetched messages
    const handleFetchedMessages = useCallback((messages) => {
                // Debug: Log all message IDs to understand the pattern
                console.log('All message IDs:', messages.map(m => `${m.id}(${m.role})`).join(', '));
                
                // Find the actual latest message by ID (highest ID number)
                const latestMessage = messages.length > 0 ? messages.reduce((latest, current) => 
                    current.id > latest.id ? current : latest
                ) : null;
                
                // Sort by created_at for display
                const sortedMessages = [...messages].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                
                console.log('Fetched messages:', messages.length);
                console.log('Latest ID by sort:', sortedMessages.length > 0 ? sortedMessages[sortedMessages.length - 1].id : 'none');
                console.log('Actual Latest ID by max:', latestMessage?.id || 'none');
                console.log('Latest message role:', latestMessage?.role || 'none');
                
                // Convert sorted messages for display
                const convertedMessages = sortedMessages.map(convertApiMessage);
                
                setHistory(convertedMessages);
                
                // Use the actual latest message ID (highest ID) for polling reference
                if (latestMessage) {
                    const oldRef = lastMessageIdRef.current;
                    lastMessageIdRef.current = latestMessage.id;
                    console.log('Updated lastMessageIdRef from:', oldRef, 'to:', lastMessageIdRef.current);
                }
    }, [convertApiMessage]);

    // Helper function to handle polling response
    const handlePollingResponse = useCallback((lastMessage, courseId) => {
        // If we're waiting for assistant and got a new message
        if (waitingForAssistantRef.current && lastMessage && lastMessage.id !== lastMessageIdRef.current) {
            console.log('🎉 New message detected while waiting for assistant, refreshing chat history');
            
            // Reset waiting flag
            waitingForAssistantRef.current = false;
            
            // Same logic as refresh button - refetch all messages
            fetchAllMessages(courseId);
            
            // Update chat status if this is an assistant message
            if (lastMessage.role === 'assistant') {
                setChatStatus("completed");
                setTimeout(() => setChatStatus("idle"), 2000);
            }
        }
        // Normal polling - check for any new message
        else if (!waitingForAssistantRef.current && lastMessage && lastMessage.id !== lastMessageIdRef.current) {
            console.log('🔄 New message detected in normal polling, refreshing chat history');
            fetchAllMessages(courseId);
        }
    }, [fetchAllMessages, chatStatus]);

    // Simple polling that just checks if there are new messages and refreshes
    const pollForNewMessages = useCallback(async (courseId) => {
        pollingCounterRef.current += 1;
        console.log(`🔄 Poll #${pollingCounterRef.current} - Checking for new messages...`);
        
        try {
            const response = await fetch(`/chat/${courseId}/last`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
                }
            });

            if (response.ok) {
                const lastMessage = await response.json();
                
                console.log('Polling check:', {
                    lastMessageId: lastMessage?.id,
                    lastMessageRole: lastMessage?.role,
                    lastTrackedId: lastMessageIdRef.current,
                    isNewMessage: lastMessage && lastMessage.id !== lastMessageIdRef.current,
                    idComparison: lastMessage ? `${lastMessage.id} !== ${lastMessageIdRef.current}` : 'no message',
                    chatStatus: chatStatus,
                    waitingForAssistant: waitingForAssistantRef.current
                });
                
                handlePollingResponse(lastMessage, courseId);
            } else {
                console.log('❌ Polling response not ok:', response.status);
            }
        } catch (error) {
            console.error('💥 Error polling for new messages:', error);
        }
    }, [handlePollingResponse]);

    // Start polling when chat is opened
    useEffect(() => {
        // Start polling when chat opens
        if (isOpen && chatContextCourseld) {
            console.log('🔄 Starting polling for course:', chatContextCourseld);
            setIsPolling(true);
            
            // Initial load of all messages
            fetchAllMessages(chatContextCourseld);
            
            // Start polling every 1 second (more aggressive to catch responses faster)
            pollingIntervalRef.current = setInterval(() => {
                console.log('⏱️ Polling tick at', new Date().toLocaleTimeString());
                pollForNewMessages(chatContextCourseld);
            }, 1000);
        }

        // Stop polling when chat is closed
        if (!isOpen && pollingIntervalRef.current) {
            console.log('⏹️ Stopping polling');
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
    }, [isOpen, chatContextCourseld, fetchAllMessages, pollForNewMessages]);

    const sendMessage = useCallback(async (newMessage) => {
        if (!chatContextCourseld) {
            console.error('No course ID set for chat');
            return;
        }

        // Set status to pending immediately
        setChatStatus("pending");
        
        // Set waiting flag to track assistant response
        waitingForAssistantRef.current = true;
        console.log('Sending message, set waitingForAssistant to true');

        try {
            // Send message to API
            router.post(`/chat/${chatContextCourseld}`, {
                content: newMessage,
            }, {
                only: ['messages', 'status'],
                onSuccess: (page) => {
                    console.log('Message sent successfully:', page.props.status);
                    
                    // The messages will be automatically updated via the response
                    const messages = page.props.messages;
                    if (messages) {
                        handleFetchedMessages(messages);
                    }
                },
                onError: (error) => {
                    console.error('Error sending message:', error);
                    setChatStatus("error");
                    waitingForAssistantRef.current = false;
                    setTimeout(() => setChatStatus("idle"), 3000);
                },
                preserveState: true,
                preserveScroll: true
            });
        } catch (error) {
            console.error('Error sending message:', error);
            setChatStatus("error");
            waitingForAssistantRef.current = false;
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