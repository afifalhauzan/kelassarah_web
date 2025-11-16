import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import LessonList from "@/Components/CourseDetail/LessonList";
import { MdChevronRight } from "react-icons/md";

export default function Show({ course, lessons }) {
    return (
        <AuthenticatedLayout>
            <Head title={course.title} />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white rounded-2xl shadow-sm">
                        <div className="p-6 md:p-8 text-gray-900">
                            <div className="mb-4 text-sm text-gray-500 flex items-center">
                                <Link
                                    href={route("dashboard")}
                                    className="text-gray-500 hover:text-gray-700 hover:underline"
                                >
                                    Dashboard
                                </Link>

                                <MdChevronRight className="h-5 w-5" />

                                <Link
                                    href={route("courses")}
                                    className="text-gray-500 hover:text-gray-700 hover:underline"
                                >
                                    Kursus
                                </Link>

                                <MdChevronRight className="h-5 w-5" />

                                <span className="font-medium text-gray-800 truncate">
                                    {course.title}
                                </span>
                            </div>

                            <h1 className="text-3xl font-lilita text-blue-400">
                                {course.title}
                            </h1>

                            <div className="mt-4 rounded-lg border border-gray-400">
                                {/* Header Biru */}
                                <div className="bg-blue-600 text-white rounded-t-lg p-4">
                                    <h3 className="text-xl font-bold">
                                        Deskripsi singkat
                                    </h3>
                                </div>
                                {/* Konten Putih */}
                                <div className="p-4">
                                    <p className="text-gray-700 leading-relaxed">
                                        {course.description}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                    Materi & Kuis
                                </h2>

                                <LessonList lessons={lessons} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
