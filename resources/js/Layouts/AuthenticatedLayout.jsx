import Sidebar from "@/Components/ui/Sidebar";
import ChatWidget from "@/Components/Chatbot/ChatWidget";
import { usePage } from "@inertiajs/react";

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;
    
    // Check if user is a teacher (guru)
    const isTeacher = auth?.user?.role === 'guru';
    console.log('User role:', auth?.user?.role);

    return (
        <div className="min-h-screen bg-gray-100 md:flex">
            <Sidebar />
            <main className="md:flex-1 pt-16 md:pt-0 h-screen overflow-y-auto min-w-0">{children}</main>

            {/* Only show ChatWidget for students (non-guru users) */}
            {!isTeacher && <ChatWidget />}
        </div>
    );
}
