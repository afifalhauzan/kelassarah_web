export default function Mascot() {
    return (
        <section id="mascot" className="bg-blue-500 py-16 sm:py-24 relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Stars Layer - z-10 */}
                {/* <div className="absolute inset-0 z-10">
                    <img
                        src="/images/mascot_stars.png"
                        alt="Decorative stars"
                        className="w-full h-full object-contain"
                    />
                </div> */}

                {/* Content Container - z-20 */}
                <div className="relative z-20">
                    {/* Title */}
                    <div className="text-center mb-10">
                        <h2 className="font-lilita text-3xl md:text-4xl lg:text-5xl text-white mb-8 tracking-relaxed">
                            Kenalan Yuk dengan Kak Sarah!
                        </h2>
                    </div>

                    {/* Background Layer - z-0 */}
                    <div className="absolute z-0 scale-100 md:scale-50 w-full md:-top-15">
                        <img
                            src="/images/mascot_bg.png"
                            alt="Mascot background"
                            className="w-full h-full object-cover opacity-20"
                        />
                    </div>

                    {/* Mascot Container */}
                    <div className="flex justify-center mb-12">
                        <div className="relative max-w-lg w-4/5 md:w-1/2 lg:w-1/3">
                            {/* Mascot Image - z-30 */}
                            <img
                                src="/images/mascot_main.svg"
                                alt="Kak Sarah mascot with speech bubbles"
                                className="w-full h-auto object-contain relative z-30"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="text-center max-w-4xl mx-auto">
                        <p className="text-md md:text-lg text-white leading-relaxed">
                            Aku Kak Sarah, AI cerdas dan ramah yang siap bantu kamu memahami pelajaran dengan
                            <br className="hidden md:block" />
                            cara seru dan personal!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}