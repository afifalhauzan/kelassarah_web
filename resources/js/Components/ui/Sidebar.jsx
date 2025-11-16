import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import ApplicationIcon from "@/Components/shared/ApplicationIcon";

export default function Sidebar() {
    const { auth } = usePage().props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // --- REVISI UTAMA DI SINI ---
    // 1. Kita cek route mana yang lagi aktif
    // (Nama route 'dashboard', 'courses', 'profile.edit' kita ambil dari file web.php)
    const isBerandaActive = route().current("dashboard");
    const isCoursesActive = route().current("courses");
    const isProfilActive = route().current("profile.edit");
    // --- AKHIR REVISI ---

    return (
        <>
            {/* Mobile Hamburger Button */}
            <div className="md:hidden bg-gray-50/50 backdrop-blur-md border-white/20 px-6 py-4 z-40 fixed w-full top-0 left-0">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo and Brand */}
                    <div className="flex items-center space-x-3">
                        <ApplicationIcon className="w-12 h-12 mb-2" />
                        <span className="text-lg md:text-2xl font-lilita text-blue-400">
                            Dashboard Siswa
                        </span>
                    </div>

                    <button
                        onClick={toggleMobileMenu}
                        className="p-2 bg-gray-50 rounded-lg shadow-lg text-gray-700 hover:bg-blue-50"
                    >
                        {/* ... (Icon SVG hamburger) ... */}
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40 md:hidden transition-opacity duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Desktop Sidebar */}
            <div className="hidden md:block h-screen w-64 sticky top-0 bg-white shadow-lg rounded-br-3xl rounded-tr-3xl border-r border-gray-200 z-40 ">
                <div className="flex flex-col h-full overflow-y-auto">
                    {/* Sidebar Header */}
                    <div className="flex items-center p-6 border-b border-gray-200">
                        {/* ... (Kode Header Sidebar) ... */}
                        <ApplicationIcon className="w-10 h-10 mb-2" />
                        <div className="ml-3">
                            <h2 className="text-lg font-lilita text-blue-400">
                                Kak Sarah Chatbot
                            </h2>
                        </div>
                    </div>

                    {/* User Info */}
                    {auth?.user && (
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            {/* ... (Kode User Info) ... */}
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold text-lg">
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">
                                        {auth.user.name}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        {auth.user.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- REVISI NAVIGATION LINKS (DESKTOP) --- */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        <Link
                            href={route("dashboard")} // 2. Ganti href pake route()
                            // 3. Tambahin logika active state
                            className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 group ${
                                isBerandaActive
                                    ? "bg-blue-50 text-blue-600" // <-- Style Aktif
                                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600" // Style Normal
                            }`}
                        >
                            <svg
                                className="w-5 h-5 mr-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 5a2 2 0 012-2h4a2 2 0 012 2v4H8V5z"
                                />
                            </svg>
                            <span className="font-medium">Beranda</span>
                        </Link>

                        <Link
                            href={route("courses")} // 2. Ganti href pake route()
                            // 3. Tambahin logika active state
                            className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 group ${
                                isCoursesActive
                                    ? "bg-blue-50 text-blue-600" // <-- Style Aktif
                                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600" // Style Normal
                            }`}
                        >
                            <svg
                                className="w-5 h-5 mr-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                />
                            </svg>
                            <span className="font-medium">Kursus</span>
                        </Link>

                        <Link
                            href={route("profile.edit")} // 2. Ganti href pake route()
                            // 3. Tambahin logika active state
                            className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 group ${
                                isProfilActive
                                    ? "bg-blue-50 text-blue-600" // <-- Style Aktif
                                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600" // Style Normal
                            }`}
                        >
                            <svg
                                className="w-5 h-5 mr-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            <span className="font-medium">Profil</span>
                        </Link>
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-gray-200">
                        {/* ... (Kode Logout) ... */}
                        <Link
                            method="post"
                            href={route("logout")}
                            as="button"
                            className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                            <svg
                                className="w-5 h-5 mr-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            <span className="font-medium">Log Out</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div
                className={`md:hidden fixed top-0 left-0 h-full w-80 bg-blue-600 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Mobile Sidebar Header */}
                    <div className="flex items-center justify-between p-6 border-b border-blue-500">
                        {/* ... (Kode Header Mobile) ... */}
                        <div className="flex items-center space-x-3">
                            <ApplicationIcon className="w-8 h-8 text-white" />
                            <div>
                                <h2 className="text-lg font-lilita text-white">
                                    Kak Sarah Chatbot
                                </h2>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-blue-200 hover:text-white"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile User Info */}
                    {auth?.user && (
                        <div className="px-6 py-4 border-b border-blue-500">
                            {/* ... (Kode User Info Mobile) ... */}
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 font-semibold text-lg">
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-white">
                                        {auth.user.name}
                                    </p>
                                    <p className="text-xs text-blue-200">
                                        {auth.user.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- REVISI NAVIGATION LINKS (MOBILE) --- */}
                    <nav className="flex-1 px-6 py-6 space-y-4">
                        <Link
                            href={route("dashboard")} // 2. Ganti href pake route()
                            onClick={() => setIsMobileMenuOpen(false)}
                            // 3. Tambahin logika active state
                            className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                                isBerandaActive
                                    ? "bg-blue-700 text-blue-200" // <-- Style Aktif
                                    : "text-white hover:text-blue-200 hover:bg-blue-700" // Style Normal
                            }`}
                        >
                            <svg
                                className="w-5 h-5 mr-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 5a2 2 0 012-2h4a2 2 0 012 2v4H8V5z"
                                />
                            </svg>
                            <span className="font-medium">Dashboard</span>
                        </Link>

                        <Link
                            href={route("courses")} // 2. Ganti href pake route()
                            onClick={() => setIsMobileMenuOpen(false)}
                            // 3. Tambahin logika active state
                            className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                                isCoursesActive
                                    ? "bg-blue-700 text-blue-200" // <-- Style Aktif
                                    : "text-white hover:text-blue-200 hover:bg-blue-700" // Style Normal
                            }`}
                        >
                            <svg
                                className="w-5 h-5 mr-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                />
                            </svg>
                            <span className="font-medium">Courses</span>
                        </Link>

                        <Link
                            href={route("profile.edit")} // 2. Ganti href pake route()
                            onClick={() => setIsMobileMenuOpen(false)}
                            // 3. Tambahin logika active state
                            className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                                isProfilActive
                                    ? "bg-blue-700 text-blue-200" // <-- Style Aktif
                                    : "text-white hover:text-blue-200 hover:bg-blue-700" // Style Normal
                            }`}
                        >
                            <svg
                                className="w-5 h-5 mr-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            <span className="font-medium">Profile</span>
                        </Link>
                    </nav>

                    {/* Mobile Logout Button */}
                    <div className="p-6 border-t border-blue-500">
                        {/* ... (Kode Logout Mobile) ... */}
                        <Link
                            method="post"
                            href={route("logout")}
                            as="button"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-full flex items-center px-4 py-3 text-white hover:text-blue-200 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                        >
                            <svg
                                className="w-5 h-5 mr-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            <span className="font-medium">Log Out</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
