import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { useChat } from "@/Context/ChatContext";
import { useOnboardingStore } from "@/stores/onboardingStore";

import ChatHeader from "./ChatHeader";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";

export default function ChatWidget() {
    const { isOpen, setisOpen } = useChat();
    const { isChatHighlighted } = useOnboardingStore();
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

    // Check onboarding status from backend
    useEffect(() => {
        const checkOnboardingStatus = async () => {
            try {
                const response = await fetch('/onboarding/status', {
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                });
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('ChatWidget fetched onboarding status:', data);
                    setHasCompletedOnboarding(data.has_completed_onboarding);
                    return data.has_completed_onboarding;
                }
            } catch (error) {   
                console.error('Error checking onboarding status:', error);
                // Default to showing chat widget if there's an error
                setHasCompletedOnboarding(true);
                return true;
            }
            return false;
        };

        // Initial check
        checkOnboardingStatus().then((completed) => {
            // If not completed, start polling every 1 second
            if (!completed) {
                const interval = setInterval(async () => {
                    const isCompleted = await checkOnboardingStatus();
                    // Stop polling once onboarding is completed
                    if (isCompleted) {
                        clearInterval(interval);
                    }
                }, 1000);
                
                // Cleanup interval if component unmounts
                return () => clearInterval(interval);
            }
        });
    }, []);

    return createPortal(
        <>
            {isOpen && (
                <div
                    onClick={() => setisOpen(false)}
                    className="fixed inset-0 z-40 bg-[#C5C5C5] bg-opacity-50 transition-opacity md:hidden"
                ></div>
            )}
            <button
                onClick={() => setisOpen(true)}
                className={`fixed bottom-5 right-5 z-50
                transition-all duration-300 ease-out
                ${isOpen ? "pointer-events-none opacity-0" : "opacity-100"}
                ${!isChatHighlighted && !hasCompletedOnboarding ? "hidden" : ""}
                `}
            >
                {/* Highlight text for onboarding - only show during chat section */}
                {isChatHighlighted && !hasCompletedOnboarding && (
                    <div className="absolute top-18 -left-32 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg animate-bounce transition-opacity duration-300">
                        <div className="relative">
                            Klik di samping<br />untuk chat!
                        </div>
                    </div>
                )}

                <img
                    src="/chatbot/chatbot-bubble.svg"
                    alt="Buka Chat Kak Sarah"
                    className="h-35 w-auto"
                />
            </button>

            <div
                className={`fixed top-2 bottom-2 right-5 z-50 w-90
          rounded-2xl bg-white shadow-xl transition-all duration-300 ease-in-out
          ${isOpen
                        ? "translate-y-0 opacity-100"
                        : "translate-y-full opacity-0 pointer-events-none"
                    }`}
            >
                <div className="flex h-full flex-col">
                    <ChatHeader onClose={() => setisOpen(false)} />

                    <ChatHistory />

                    <ChatInput />
                </div>
            </div>
        </>,
        document.body
    );
}
