import { useState, useMemo } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CourseGridCard from "@/Components/Course/CourseGridCard";
import SearchInput from "@/Components/Course/SearchInput";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Courses({ courses = [] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [gridRef] = useAutoAnimate();

    const filteredCourses = useMemo(() => {
        const coursesToFilter = courses;

        if (!searchTerm) {
            return coursesToFilter;
        }
        return coursesToFilter.filter((course) =>
            course.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, courses]);

    return (
        <AuthenticatedLayout>
            <Head title="Kursus Saya" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <div className="p-6 md:p-8 text-gray-900">
                            <div className="mb-8 md:flex md:items-center md:justify-between">
                                <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                                    Kursus Tersedia
                                </h1>

                                <SearchInput
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    placeholder="Cari kursus..."
                                />
                            </div>

                            <div
                                ref={gridRef}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {filteredCourses.map((course) => (
                                    <CourseGridCard
                                        key={course.id}
                                        course={course}
                                    />
                                ))}
                            </div>

                            {filteredCourses.length === 0 && (
                                <div className="text-center py-12 text-gray-500">
                                    {searchTerm ? (
                                        <>
                                            <h3 className="text-xl font-semibold">
                                                Tidak ada kursus
                                            </h3>
                                            <p>
                                                Kursus dengan judul "
                                                {searchTerm}" tidak ditemukan.
                                            </p>
                                        </>
                                    ) : (
                                        <h3 className="text-xl font-semibold">
                                            Belum ada kursus
                                        </h3>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
