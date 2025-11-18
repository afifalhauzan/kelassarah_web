import { Head, usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function CourseIndex() {
    const { courses = [] } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Courses" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-2">
                    <div className="overflow-hidden">
                        <div className="p-6 md:p-8 text-gray-900">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                All Courses
                            </h1>
                            <p className="text-gray-600 mb-8">
                                Browse all available courses
                            </p>

                            {courses && courses.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {courses.map((course) => (
                                        <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                                    {course.title}
                                                </h3>
                                                {course.description && (
                                                    <p className="text-gray-600 mb-4">
                                                        {course.description}
                                                    </p>
                                                )}
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-500">
                                                        Order: {course.order}
                                                    </span>
                                                    <Link 
                                                        href={route('course.show', course.id)}
                                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                                                    >
                                                        View Course
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">
                                        No courses available yet.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}