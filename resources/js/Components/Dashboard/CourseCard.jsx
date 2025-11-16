import { Link } from "@inertiajs/react";

export default function CourseCard({ course }) {
    // 1. Ambil data LENGKAP yang udah disiapin web.php
    const {
        id,
        title,
        description,
        slug,
        thumbnail,
        progress,
        modulesCompleted,
        totalModules,
    } = course;

    return (
        <div className="shrink-0 w-80">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                {/* 2. Kita pake <Link> (Inertia) dan 'slug' (atau 'id')
                  Sesuai web.php (baris 112), route 'course.show' nerima '{course}' (ID)
                */}
                <Link href={route("course.show", id)}>
                    <img
                        src={thumbnail} // <-- Pake thumbnail dari props
                        alt={title}
                        className="w-full h-40 object-cover"
                    />

                    <div className="p-5">
                        <h3
                            className="text-lg font-bold text-gray-800 truncate"
                            title={title}
                        >
                            {title}
                        </h3>

                        <p className="text-sm text-gray-500 mt-2 h-10 overflow-hidden line-clamp-2">
                            {description}
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
