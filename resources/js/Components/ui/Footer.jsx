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
                                Patih AI<br />Chatbot
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Navigation Section */}
                        <div className="flex flex-col space-y-2">
                            <h3 className="text-lg font-semibold mb-3">Navigasi</h3>
                            <NavLink
                                href="#home"
                                className="text-left text-white/80 hover:text-white"
                            >
                                Home
                            </NavLink>
                            <NavLink
                                href="#mascot"
                                className="text-left text-white/80 hover:text-white"
                            >
                                Maskot
                            </NavLink>
                            <NavLink
                                href="#fitur"
                                className="text-left text-white/80 hover:text-white"
                            >
                                Manfaat
                            </NavLink>
                        </div>


                    </div>
                </div>
            </div>

            {/* Bottom Section */}

        </footer>
    );
}