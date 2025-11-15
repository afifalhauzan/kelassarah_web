import { MdQuiz } from "react-icons/md";
import { GiSpellBook } from "react-icons/gi";
import { FaLightbulb } from "react-icons/fa";

export default function Features() {
    return (
        <section id="fitur" className="bg-gray-50 py-24 sm:py-32 relative">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Star decorations */}
                <div className="absolute top-15 md:top-25 left-80 text-yellow-400 text-4xl">
                    ✨
                </div>
                <div className="absolute top-45 md:top-35 md:right-50 text-yellow-400 text-4xl">
                    ✨
                </div>

                {/* Title */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-lilita text-blue-400 mb-8">
                        Kenapa Belajar Bareng Kak Sarah?
                    </h2>
                </div>

                {/* Features Grid */}
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl">
                        {/* Feature Card 1 */}
                        <div className="bg-white rounded-xl p-8 box-shadow-default text-center hover:shadow-xl transition-shadow duration-300">
                            <div className="h-20 mb-8 flex justify-center">
                                <FaLightbulb className="w-50 h-20 text-blue-300" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                                Pembelajaran Sokratik
                            </h3>
                            <p className="text-sm text-gray-900 mb-2">
                                Kamu tidak akan "disalahkan". Kak Sarah akan membimbingmu menemukan jawaban yang tepat melalui pertanyaan terpandu.
                            </p>
                        </div>

                        {/* Feature Card 2 */}
                        <div className="bg-white rounded-xl p-8 box-shadow-default text-center hover:shadow-xl transition-shadow duration-300">
                            <div className="h-20 mb-8 flex justify-center">
                                <MdQuiz className="w-50 h-20 text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                                Umpan Balik Personal
                            </h3>
                            <p className="text-sm text-gray-900 mb-2">
                                Kak Sarah merespons analisismu secara instan, menyesuaikan dengan jawaban spesifik darimu.
                            </p>
                        </div>

                        {/* Feature Card 3 */}
                        <div className="bg-white rounded-xl p-8 box-shadow-default text-center hover:shadow-xl transition-shadow duration-300">
                            <div className="h-20 mb-8 flex justify-center">
                                <GiSpellBook className="w-50 h-20 text-blue-300" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                                Pembelajaran Imersif
                            </h3>
                            <p className="text-sm text-gray-900 mb-2">
                                Bukan sekadar menghafal fakta. Kamu akan diajak ikut "merasakan" emosi dan suasana krusial di balik peristiwa sejarah.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}