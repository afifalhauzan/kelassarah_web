import { Link } from '@inertiajs/react';
import ApplicationIcon from '@/Components/shared/ApplicationIcon';
import NavLink from '@/Components/shared/NavLink';

export default function Footer() {
    return (
        <footer className="bg-blue-500 text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-8 md:space-y-0">
                    <div>
                        {/* Logo and Brand Section */}
                        <div className="flex items-center space-x-3">
                            <ApplicationIcon className="w-18 h-18 mb-3 text-white" />
                            <span className="text-2xl font-lilita text-white">
                                Kak Sarah<br />Chatbot
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Navigation Section */}
                        <div className="flex flex-col space-y-2">
                            <h3 className="text-lg font-semibold mb-3">Navigasi</h3>
                            <NavLink
                                href="home"
                                className="text-left text-white/80 hover:text-white"
                            >
                                Home
                            </NavLink>
                            <NavLink
                                href="maskot"
                                className="text-left text-white/80 hover:text-white"
                            >
                                Maskot
                            </NavLink>
                            <NavLink
                                href="manfaat"
                                className="text-left text-white/80 hover:text-white"
                            >
                                Manfaat
                            </NavLink>
                        </div>

                        {/* Social Media Section */}
                        <div className="flex flex-col space-y-2">
                            <h3 className="text-lg font-semibold mb-3">Sosial Media</h3>
                            <a
                                href="#"
                                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                                <span>Karya Kak Sarah</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-blue-500 bg-blue-600">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="text-center">
                        <a
                            href="#"
                            className="text-white/80 hover:text-white transition-colors duration-200"
                        >
                            Kak Sarah Chatbot Team, 2025
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}