export default function Hero() {
    return (
        <section id="fitur" className="bg-gray-100 py-24 sm:py-32 relative">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Star decorations */}
                <div className="absolute top-15 md:top-25 left-80 text-yellow-400 text-4xl">
                    ✨
                </div>
                <div className="absolute top-45 md:top-35 right-80 text-yellow-400 text-4xl">
                    ✨
                </div>
                
                {/* Title */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-lilita text-blue-400 mb-8">
                        Kenapa Belajar Bareng Kak Sarah?
                    </h2>
                </div>
                
                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {/* Feature Card 1 */}
                    <div className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="mb-6 flex justify-center">
                            {/* Placeholder icon */}
                            <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
                                📚
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                            Strategi Pembelajaran Berbasis Narasi
                        </h3>
                    </div>

                    {/* Feature Card 2 */}
                    <div className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="mb-6 flex justify-center">
                            {/* Placeholder icon */}
                            <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
                                📚
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                            Strategi Pembelajaran Berbasis Narasi
                        </h3>
                    </div>

                    {/* Feature Card 3 */}
                    <div className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="mb-6 flex justify-center">
                            {/* Placeholder icon */}
                            <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
                                📚
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                            Strategi Pembelajaran Berbasis Narasi
                        </h3>
                    </div>

                    {/* Feature Card 4 */}
                    <div className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="mb-6 flex justify-center">
                            {/* Placeholder icon */}
                            <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
                                📚
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                            Strategi Pembelajaran Berbasis Narasi
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    );
}