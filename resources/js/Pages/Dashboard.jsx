import { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router } from "@inertiajs/react";
import ProgressCard from "@/Components/Dashboard/ProgressCard";
import CourseSlider from "@/Components/Dashboard/CourseSlider";

export default function Dashboard() {
    const { auth, courses = [] } = usePage().props;
    const [isLoading, setIsLoading] = useState(false);

    // If courses are not passed as props or empty, fetch them
    useEffect(() => {
        if (!courses || courses.length === 0) {
            setIsLoading(true);
            router.get('/courses', {}, {
                only: ['courses'],
                onSuccess: () => {
                    setIsLoading(false);
                },
                onError: () => {
                    setIsLoading(false);
                },
                preserveState: true,
                preserveScroll: true
            });
        }
    }, [courses]);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-2">
                    <div className="overflow-hidden">
                        <div className="p-6 md:p-8 text-gray-900">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Halo {auth.user.name}!
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Selamat datang kembali di beranda
                            </p>

                            <div className="mt-8">
                                <ProgressCard
                                    title="Orientasi Jurnalis Muda - Memahami Lanskap Pergerakan"
                                    progress={65}
                                />
                            </div>

                            {isLoading ? (
                                <div className="mt-12 text-center">
                                    <p>Lagi ngambil data kursus...</p>
                                </div>
                            ) : courses && courses.length > 0 ? (
                                <CourseSlider courses={courses} /> 
                            ) : (
                                <div className="mt-12 text-center">
                                    <p className="text-gray-500">Belum ada kursus tersedia</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
