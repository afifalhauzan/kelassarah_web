import { Link } from "@inertiajs/react";

export default function CTA() {
    return (
        <section id="cta" className="bg-gray-50 py-16 sm:py-24 relative">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Main Content Container */}
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-[#E9F1FF] rounded-3xl p-8">
                    {/* Left Content - Text (2/3 width on md+) */}
                    <div className="w-full md:w-2/3 text-center md:text-left">
                        <h2 className="font-lilita text-4xl md:text-4xl lg:text-5xl text-blue-400 mb-6 tracking-relaxed leading-tight">
                            Siap Mulai Perjalanan Belajarmu?
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto md:mx-0">
                            Ayo, mulai belajar dengan cara baru yang seru dan interaktif bareng Kak Sarah!
                        </p>

                        {/* CTA Button - Same as Hero */}
                        <div className="flex justify-center md:justify-start">
                            <Link
                                href={route('register')}
                                className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                            >
                                Belajar Sejarah Bersama Kak Sarah
                            </Link>
                        </div>
                    </div>

                    {/* Right Content - Image (1/3 width on md+, full width at bottom on mobile) */}
                    <div className="w-full md:w-1/3 flex justify-center order-last">
                        <div className="relative max-w-md w-full">
                            {/* Image placeholder */}
                            <img
                                src="/images/cta_main.svg"
                                alt="Students ready to start learning journey"
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}