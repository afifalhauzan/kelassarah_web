import Sidebar from "@/Components/ui/Sidebar";
import ChatWidget from "@/Components/Chatbot/ChatWidget";

export default function AuthenticatedLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100 md:flex">
            <Sidebar />
            <main className="md:flex-1 pt-16 md:pt-0 h-screen overflow-y-auto min-w-0">{children}</main>

            <ChatWidget />
        </div>
    );
}
