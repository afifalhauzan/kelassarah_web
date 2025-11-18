import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import ProgressCard from "@/Components/Dashboard/ProgressCard";
import CourseSlider from "@/Components/Dashboard/CourseSlider";

// Terima 'courses' dari props, kasih default array kosong
export default function Dashboard({ courses = [] }) {
    const { auth } = usePage().props;

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
        </AuthenticatedLayout>
    );
}
