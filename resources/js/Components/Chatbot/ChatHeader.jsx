import { useChat } from "@/Context/ChatContext";

const getBubbleText = (status) => {
    switch (status) {
        case "pending":
            return "Sedang berpikir...";
        case "completed":
            return "Pertanyaan yang bagus!";
        default:
            return "Selamat Datang!";
    }
};

const getMascotSrc = (status) => {
    switch (status) {
        case "pending":
            return "/chatbot/sarah-pending.svg";
        default:
            return "/chatbot/sarah-idle.svg";
    }
};

export default function ChatHeader({ onClose }) {
    const { chatStatus } = useChat();

    const bubbleText = getBubbleText(chatStatus);
    const mascotSrc = getMascotSrc(chatStatus);

    return (
        <div className="shrink-0 border-b px-4 pt-4">
            <div className="flex items-center justify-between">
                <button className="text-gray-500 hover:text-gray-700 hidden md:block">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                        />
                    </svg>
                </button>

                <h3 className="font-bold text-lg md:flex-1 md:text-center">
                    Kak Sarah
                </h3>

                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            <div className="mt-4 flex items-center space-x-2">
                <img
                    src={mascotSrc}
                    alt={
                        chatStatus === "pending"
                            ? "Kak Sarah sedang berpikir"
                            : "Kak Sarah"
                    }
                    className="h-20 w-auto -ml-4"
                />

                <div className="relative rounded-lg bg-slate-200 px-3 py-2 text-sm text-gray-800">
                    {bubbleText}
                    <span
                        className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 transform bg-slate-200"
                        style={{
                            clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
                        }}
                    ></span>
                </div>
            </div>
        </div>
    );
}
