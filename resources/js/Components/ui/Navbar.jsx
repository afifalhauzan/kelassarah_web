import { Link } from '@inertiajs/react';
import { useState } from 'react';
import ApplicationIcon from '@/Components/shared/ApplicationIcon';
import NavLink from '@/Components/shared/NavLink';

export default function Navbar({ auth }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleNavClick = (item) => {
        // Close mobile menu when nav item is clicked
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <nav className="bg-gray-50/50 backdrop-blur-md border-white/20 px-6 py-4 z-50 fixed w-full top-0 left-0">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo and Brand */}
                    <div className="flex items-center space-x-3">
                        <ApplicationIcon className="w-12 h-12 mb-2" />
                        <span className="text-lg md:text-2xl font-lilita text-blue-400">
                            Kak Sarah Chatbot
                        </span>
                    </div>

                    {/* Navigation Links - Desktop */}
                    <div className="hidden md:flex items-center space-x-10">
                        <NavLink
                            href="#hero"
                            className="text-gray-700 hover:text-blue-600"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            href="#mascot"
                            className="text-gray-700 hover:text-blue-600"
                        >
                            Maskot
                        </NavLink>
                        <NavLink
                            href="#fitur"
                            className="text-gray-700 hover:text-blue-600"
                        >
                            Manfaat
                        </NavLink>
                    </div>

                    {/* Auth Actions - Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        {auth?.user ? (
                            <>
                                <span className="text-gray-700 font-medium">
                                    Hello, {auth.user.name}
                                </span>
                                <Link
                                    href={route('dashboard')}
                                    className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                                >
                                    Dashboard
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                                >
                                    Daftar
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-gray-700 hover:text-blue-600 p-2 focus:outline-none"
                        >
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
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-50 md:hidden transition-opacity duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-80 bg-blue-600 shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between p-6 border-b border-blue-500">
                        <div className="flex items-center space-x-3">
                            <ApplicationIcon className="w-8 h-8" />
                            <span className="text-lg font-lilita text-white">
                                Kak Sarah Chatbot
                            </span>
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-blue-200 hover:text-white"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Navigation Links */}
                    <div className="flex-1 px-6 py-4 space-y-4">
                        <NavLink
                            href="#hero"
                            onClick={() => handleNavClick('home')}
                            className="block w-full text-left py-3 px-4 text-white hover:text-blue-200 hover:bg-blue-700 rounded-lg"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            href="#mascot"
                            onClick={() => handleNavClick('maskot')}
                            className="block w-full text-left py-3 px-4 text-white hover:text-blue-200 hover:bg-blue-700 rounded-lg"
                        >
                            Maskot
                        </NavLink>
                        <NavLink
                            href="#fitur"
                            onClick={() => handleNavClick('manfaat')}
                            className="block w-full text-left py-3 px-4 text-white hover:text-blue-200 hover:bg-blue-700 rounded-lg"
                        >
                            Manfaat
                        </NavLink>
                    </div>

                    {/* Mobile Auth Actions */}
                    <div className="border-t border-blue-500 p-6 space-y-4">
                        {auth?.user ? (
                            <>
                                <div className="text-white font-medium mb-4">
                                    Hello, {auth.user.name}
                                </div>
                                <Link
                                    href={route('dashboard')}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block w-full text-center bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                                >
                                    Dashboard
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block w-full text-center py-3 px-4 text-white hover:text-blue-200 hover:bg-blue-700 rounded-lg font-medium transition-all duration-200"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block w-full text-center bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                                >
                                    Daftar
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}