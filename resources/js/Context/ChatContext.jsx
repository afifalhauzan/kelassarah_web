import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { router } from '@inertiajs/react'; // <-- 1. Import Inertia's router

const ChatContext = createContext();

export function ChatProvider({ children }) {
    const [isOpen, setisOpen] = useState(false);
    const [history, setHistory] = useState([]);
    const [showResetConsent, setShowResetConsent] = useState(false);
    const [chatContextCourseld, setChatContextCourseld] = useState(1);
    const [chatStatus, setChatStatus] = useState("idle");
    const [isPolling, setIsPolling] = useState(false);
    
    const pollingIntervalRef = useRef(null);
    const lastMessageIdRef = useRef(null);
    const waitingForAssistantRef = useRef(false);
    const pollingCounterRef = useRef(0);

    const convertApiMessage = useCallback((apiMessage) => {
        return {
            id: apiMessage.id,
            role: apiMessage.role,
            message: apiMessage.content,
            timestamp: apiMessage.created_at
        };
    }, []);

    /**
     * This new function replaces BOTH fetchAllMessages and pollForNewMessages.
     * It uses Inertia's `router.get` to ask for *only* the 'messages' prop.
     */
    const refreshMessages = useCallback((courseId) => {
        pollingCounterRef.current += 1;
        console.log(`🔄 Poll #${pollingCounterRef.current} - Refreshing messages...`);

        router.get(`/chat/${courseId}`, {}, {
            // This is the magic!
            only: ['messages'], // Only fetch the 'messages' prop
            preserveState: true,
            preserveScroll: true,
            
            onSuccess: (page) => {
                const newMessages = page.props.messages;
                console.log('Refreshed messages:', newMessages.length);
                
                // Convert and update history
                const convertedMessages = newMessages.map(convertApiMessage);
                setHistory(convertedMessages);

                // Find the actual latest message
                const latestMessage = newMessages.length > 0 ? newMessages.reduce((a, b) => a.id > b.id ? a : b) : null;
                
                if (latestMessage) {
                    // Update the last message ID
                    lastMessageIdRef.current = latestMessage.id;
                    
                    // Check if the assistant has responded
                    if (waitingForAssistantRef.current && latestMessage.role === 'assistant') {
                        console.log('🎉 Assistant response detected!');
                        waitingForAssistantRef.current = false;
                        setChatStatus("completed");
                        setTimeout(() => setChatStatus("idle"), 2000);
                    }
                }
            },
            onError: (errors) => {
                console.error('💥 Error refreshing messages:', errors);
                // NOTE: Inertia will AUTOMATICALLY handle 419 errors by refreshing the page.
            }
        });
    }, [convertApiMessage]); // Added convertApiMessage dependency

    // Start polling when chat is opened
    useEffect(() => {
        if (isOpen && chatContextCourseld) {
            console.log('🔄 Starting polling for course:', chatContextCourseld);
            setIsPolling(true);
            
            // Initial load of all messages
            refreshMessages(chatContextCourseld);
            
            // Start polling (5 seconds is much saner for a server than 1)
            pollingIntervalRef.current = setInterval(() => {
                console.log('⏱️ Polling tick at', new Date().toLocaleTimeString());
                refreshMessages(chatContextCourseld);
            }, 5000); // <-- Poll every 5 seconds
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
            }
        };
    }, [isOpen, chatContextCourseld, refreshMessages]); // Swapped to refreshMessages

    /**
     * This is the new `sendMessage` using `router.post`.
     * It's simpler and doesn't need hacks.
     */
    const sendMessage = useCallback(async (newMessage) => {
        if (!chatContextCourseld) return;

        setChatStatus("pending");
        waitingForAssistantRef.current = true;
        console.log('Sending message, set waitingForAssistant to true');

        router.post(`/chat/${chatContextCourseld}`, {
            content: newMessage,
            // user_id: auth.user.id // You can pass this if needed
        }, {
            preserveState: true,
            preserveScroll: true,
            
            onSuccess: () => {
                console.log('Message sent! Inertia will refresh props.');
                // NO MORE setTimeout HACK!
                // The `redirect()->back()` from the controller forces
                // Inertia to re-fetch, which hits the `index` method.
                // This triggers our `refreshMessages` logic automatically
                // because the `messages` prop will change.
                
                // We'll manually call refreshMessages to be 100% sure
                // the new "user" message appears instantly.
                refreshMessages(chatContextCourseld);
            },
            onError: (errors) => {
                console.error('Error sending message:', errors);
                setChatStatus("error");
                waitingForAssistantRef.current = false;
                setTimeout(() => setChatStatus("idle"), 3000);
            },
        });
    }, [chatContextCourseld, refreshMessages]); // Added refreshMessages

    // Reset chat logic (now just calls refresh)
    const resetChat = useCallback(() => {
        setHistory([]);
        setChatStatus("idle");
        lastMessageIdRef.current = null;
        
        if (isOpen && chatContextCourseld) {
            refreshMessages(chatContextCourseld);
        }
    }, [isOpen, chatContextCourseld, refreshMessages]); // Added refreshMessages

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
        fetchAllMessages: refreshMessages, // Expose the new function
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