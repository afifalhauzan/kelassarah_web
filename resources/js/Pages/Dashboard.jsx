import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useState, useEffect } from 'react';
import ProgressCard from "@/Components/Dashboard/ProgressCard";
import CourseSlider from "@/Components/Dashboard/CourseSlider";
import OnboardingOverlay from "@/Components/shared/OnboardingOverlay";

// Receive 'courses' and 'showOnboarding' from props
export default function Dashboard({ courses = [], showOnboarding = false }) {
    const { auth } = usePage().props;
    
    // Create a LOCAL state to control the overlay (starts as false, then checks backend)
    // Always start with false to prevent flash, then update based on API response
    const [isShowingOnboarding, setIsShowingOnboarding] = useState(false);
    const [onboardingStatus, setOnboardingStatus] = useState(null);
    
    console.log('showOnboarding prop:', showOnboarding);
    console.log('isShowingOnboarding state:', isShowingOnboarding);

    // Fetch onboarding status from API
    useEffect(() => {
        const fetchOnboardingStatus = async () => {
            try {
                const response = await fetch('/onboarding/status', {
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setOnboardingStatus(data);
                    console.log('Fetched onboarding status:', data);
                    
                    // Update local state based on API response
                    setIsShowingOnboarding(data.should_show_onboarding);
                } else {
                    console.error('Failed to fetch onboarding status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching onboarding status:', error);
            }
        };

        fetchOnboardingStatus();
    }, []);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 md:p-8 text-gray-900">
                            <h1 className="text-3xl font-bold text-gray-800">
                                Halo {auth.user.name}!
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Selamat datang kembali di beranda
                            </p>

                            <div className="mt-8">
                                <ProgressCard
                                    title="Politik Etis dan kebangkitan kaum terpelajar"
                                    progress={65}
                                />
                            </div>

                            {/* Oper data 'courses' asli ke CourseSlider */}
                            <CourseSlider courses={courses} />
                        </div>
                    </div>
                </div>
            </div>

            {/* RENDER OVERLAY CONDITIONALLY */}
            {isShowingOnboarding && (
                <OnboardingOverlay
                    // Provide a function so the overlay can close itself
                    onClose={() => setIsShowingOnboarding(false)}
                />
            )}
        </AuthenticatedLayout>
    );
}
