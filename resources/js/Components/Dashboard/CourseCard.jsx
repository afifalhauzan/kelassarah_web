import { Link } from "@inertiajs/react";

export default function CourseCard({ course }) {
    const { id, title, description } = course;

    return (
        <div className="shrink-0 w-80">
            {" "}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                <Link href={route("course.show", id)}>
                    {/* <img
                        src={thumbnail}
                        alt={title}
                        className="w-full h-40 object-cover"
                    /> */}
                    <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-800 truncate">
                            {title}
                        </h3>
                        {description && (
                            <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                                {description}
                            </p>
                        )}
                    </div>
                </Link>
            </div>
        </div>
    );
}
