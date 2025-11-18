import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { usePage } from '@inertiajs/react';

export default function OnboardingOverlay({ onClose }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const { setIsChatHighlighted, setOnboardingStatus } = useOnboardingStore();
    const { auth } = usePage().props;

    // Monitor step changes to trigger chat highlight
    useEffect(() => {
        // Step 3 is "Chat dengan Sarah"
        setIsChatHighlighted(currentStep === 3);
        
        // Set onboarding status to active when component mounts
        setOnboardingStatus(true);
        
        // Cleanup when component unmounts
        return () => {
            setIsChatHighlighted(false);
            setOnboardingStatus(false);
        };
    }, [currentStep, setIsChatHighlighted, setOnboardingStatus]);

    const steps = [
        {
            title: "Selamat Datang di Kelas Sarah!",
            content: "Halo! Saya Kak Sarah. Mari saya kenalkan platform pembelajaran sejarah yang interaktif ini.",
            image: "/chatbot/chat-maskot.svg"
        },
        {
            title: "Jelajahi Kursus Sejarah",
            content: "Kamu dapat menjelajahi berbagai materi sejarah dengan mengakses fitur Kursus",
        },
        {
            title: "Chat dengan Sarah",
            content: "Butuh bantuan? Saya siap membantu kamu 24/7! Kamu dapat mengakses fitur chat dibawah ini kapan saja!",
        },
        {
            title: "Siap Belajar?",
            content: "Sekarang kamu siap memulai perjalanan belajar sejarah yang penuh eksplorasi!",
        }
    ];

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleFinishOnboarding = () => {
        setIsLoading(true);
        console.log('calling onboarding.complete route');

        // Call the 'onboarding.complete' route
        router.post(route('onboarding.complete'), {}, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                // Close the overlay on the frontend
                console.log('user id:', auth.user.id);
                console.log('onboarding.complete success, closing overlay');
                onClose();
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    };

    const handleSkip = () => {
        handleFinishOnboarding();
    };

    const currentStepData = steps[currentStep - 1];

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-in fade-in-0 zoom-in-95 duration-300">
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                            {steps.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-colors ${index + 1 <= currentStep
                                            ? 'bg-blue-500'
                                            : 'bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={handleSkip}
                            className="text-gray-400 hover:text-gray-600 text-sm font-medium transition-colors"
                            disabled={isLoading}
                        >
                            Lewati
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                    {/* Placeholder for image */}
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center">
                        {currentStepData.image ? (
                            <img 
                                src={currentStepData.image} 
                                alt={currentStepData.title}
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <span className="text-7xl">{
                                currentStep === 1 ? '👋' :
                                    currentStep === 2 ? '📚' :
                                        currentStep === 3 ? '💬' : '🚀'
                            }</span>
                        )}
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 mb-3">
                        {currentStepData.title}
                    </h2>

                    <p className="text-gray-600 leading-relaxed mb-6">
                        {currentStepData.content}
                    </p>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100">
                    <div className="flex justify-between gap-3">
                        {currentStep > 1 ? (
                            <button
                                onClick={handlePrev}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                                disabled={isLoading}
                            >
                                Sebelumnya
                            </button>
                        ) : (
                            <div></div>
                        )}

                        {currentStep < steps.length ? (
                            <button
                                onClick={handleNext}
                                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors shadow-sm"
                                disabled={isLoading}
                            >
                                Selanjutnya
                            </button>
                        ) : (
                            <button
                                onClick={handleFinishOnboarding}
                                disabled={isLoading}
                                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin h-4 w-4 border-2 border-white/20 border-t-white rounded-full"></div>
                                        Memproses...
                                    </>
                                ) : (
                                    'Mulai Belajar'
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}