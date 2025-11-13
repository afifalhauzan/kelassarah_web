import { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import ProgressCard from "@/Components/dashboard/ProgressCard";
import CourseSlider from "@/Components/dashboard/CourseSlider";

export default function Dashboard() {
    const { auth } = usePage().props;
    // const [courses, setCourses] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     axios
    //         .get(route("courses.index"))
    //         .then((response) => {
    //             setCourses(response.data);
    //             setIsLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error("Gagal ngambil data courses:", error);
    //             setIsLoading(false);
    //         });
    // }, []);
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
                                    title="Politik Etis dan kebangkitan kaum terpelajar"
                                    progress={65}
                                />
                            </div>

                            {/* {isLoading ? (
                                <div className="mt-12 text-center">
                                    <p>Lagi ngambil data kursus...</p>
                                </div>
                            ) : (
                                <CourseSlider courses={courses} /> 
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
