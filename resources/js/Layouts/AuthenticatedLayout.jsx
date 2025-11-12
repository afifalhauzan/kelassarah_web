import Sidebar from '@/Components/ui/Sidebar';

export default function AuthenticatedLayout({ header, children }) {
    return (
        <div className="min-h-screen bg-gray-100 md:flex">
            <Sidebar />
            <main className="md:flex-1 pt-16 md:pt-0">
                {children}
            </main>
        </div>
    );
}
