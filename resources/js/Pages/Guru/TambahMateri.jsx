import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useState, useEffect } from 'react';
import ProgressCard from "@/Components/Dashboard/ProgressCard";
import CourseSlider from "@/Components/Dashboard/CourseSlider";
import OnboardingOverlay from "@/Components/shared/OnboardingOverlay";

// Receive 'courses' and 'showOnboarding' from props
export default function TambahMateri({ courses = [], showOnboarding = false }) {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="TambahMateri" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 md:p-8 text-gray-900">
                            <h1 className="text-3xl font-bold text-gray-800">
                                Halo {auth.user.name}!
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Tambah Materi
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
