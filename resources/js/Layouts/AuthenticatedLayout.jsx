import Sidebar from "@/Components/ui/Sidebar";
import { ChatProvider } from "@/Context/ChatContext";
import ChatWidget from "@/Components/Chatbot/ChatWidget";

function AuthenticatedApp({ children }) {
    return (
        <div className="min-h-screen bg-gray-100 md:flex">
            <Sidebar />
            <main className="md:flex-1 pt-16 md:pt-0">{children}</main>

            <ChatWidget />
        </div>
    );
}

export default function AuthenticatedLayout({ children }) {
    return (
        <ChatProvider>
            <AuthenticatedApp>{children}</AuthenticatedApp>
        </ChatProvider>
    );
}
