export default function ChatBubble({ role, message, user }) {
    const isUser = role === "user";
    const isLoading = message === "Sedang berpikir...";

    const label = isUser ? (user?.name || "Pengguna") : "Kak Sarah";

    return (
        <div
            className={`flex w-full ${
                isUser ? "justify-end" : "justify-start"
            }`}
        >
            <div className="flex flex-col max-w-[75%]">
                <span
                    className={`text-xs text-gray-500 mb-1 
            ${isUser ? "text-right" : "text-left"}
          `}
                >
                    {label}
                </span>

                <div
                    className={`rounded-lg px-3 py-2 text-sm
            ${
                isUser
                    ? "bg-[#007BC3] text-white" 
                    : "bg-gray-100 text-gray-800" 
            } 
            ${isLoading ? "italic" : ""}`}
                >
                    {isLoading ? "..." : message}
                </div>
            </div>
        </div>
    );
}
