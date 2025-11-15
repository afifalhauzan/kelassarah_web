import { Link } from "@inertiajs/react";

export default function Hero() {
    return (
        <section id="hero" className="h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16 sm:py-24 flex justify-center items-center">
            <div className="justify-center items-center max-w-7xl px-6 lg:px-8">
                {/* Star decorations */}
                {/* <div className="absolute top-10 md:top-20 left-20 text-yellow-400 text-2xl animate-pulse">
                    ✨
                </div>
                <div className="absolute top-32 md:top-16 right-32 text-yellow-400 text-xl animate-pulse">
                    ⭐
                </div>
                <div className="absolute top-48 md:top-40 left-32 text-yellow-400 text-lg animate-pulse">
                    ✨
                </div>
                <div className="absolute top-20 md:top-32 right-20 text-yellow-400 text-2xl animate-pulse">
                    ⭐
                </div> */}
                
                {/* Main Content Container */}
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mt-12 md:mt-4">
                    {/* Left Content - Text */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="font-lilita text-5xl md:text-5xl lg:text-6xl text-blue-400 mb-6 tracking-wide">
                            Belajar Jadi Lebih Seru Bersama
                            <br />
                            <span className="text-blue-500">Kak Sarah!</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto md:mx-0">
                            Asisten belajar sejarah berbasis AI yang siap menemani kamu
                            dengan cara yang menyenangkan.
                        </p>
                        
                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link
                                href={route('register')}
                                className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg"
                            >
                                Mulai Belajar
                            </Link>
                        </div>
                    </div>
                    
                    {/* Right Content - Image (3/5 width on md+) */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end order-last md:order-last">
                        <div className="relative max-w-lg w-full">
                            {/* hero_circle - Background circle with lower z-index */}
                            <img 
                                src="/images/hero_circle.png" 
                                alt="Hero background circle"
                                className="scale-pulse absolute inset-0 w-full h-full object-contain z-0"
                            />
                            
                            {/* hero_main - Main hero content with higher z-index */}
                            <img 
                                src="/images/hero_main.png" 
                                alt="Students learning with AI assistant"
                                className=" relative z-10 w-full h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}