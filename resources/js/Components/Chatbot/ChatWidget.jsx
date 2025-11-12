import { createPortal } from "react-dom";
import { useChat } from "@/Context/ChatContext";

import ChatHeader from "./ChatHeader";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";

export default function ChatWidget() {
    const { isOpen, setisOpen } = useChat();

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
        `}
            >
                <img
                    src="/chatbot/chatbot-bubble.svg"
                    alt="Buka Chat Kak Sarah"
                    className="h-24 w-auto"
                />
            </button>

            <div
                className={`fixed top-2 bottom-2 right-5 z-50 w-90
          rounded-2xl bg-white shadow-xl transition-all duration-300 ease-in-out
          ${
              isOpen
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
