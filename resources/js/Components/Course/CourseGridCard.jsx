import { Link } from "@inertiajs/react";

export default function CourseGridCard({ course }) {
    // Kita ambil data yang relevan
    const { id, title, description, thumbnail } = course;

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
            {/* Link ke detail kursus, pake ID (sesuai route 'course.show') */}
            <Link href={route("course.show", id)}>
                {/* Gambar Thumbnail */}
                <img
                    src={thumbnail}
                    alt={title}
                    className="w-full h-40 object-cover"
                />

                <div className="p-5">
                    {/* Judul Kursus */}
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2 h-[3.25rem]">
                        {title}
                    </h3>

                    {/* REVISI: Progress diganti Deskripsi */}
                    <p className="text-sm text-gray-500 mt-2 h-10 line-clamp-2">
                        {description}
                    </p>
                </div>
            </Link>
        </div>
    );
}
