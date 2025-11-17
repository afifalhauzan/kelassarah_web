import { Link } from "@inertiajs/react";

export default function CourseCard({ course }) {
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
                <Link href={route("course.show", id)}>
                    <img
                        src={thumbnail}
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

                        {progress > 0 ? (
                            <>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-sm font-semibold text-green-600">
                                        {progress}%
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {modulesCompleted}/{totalModules}{" "}
                                        selesai
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                    <div
                                        className="bg-green-500 rounded-full h-1.5"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </>
                        ) : (
                            <p className="text-sm text-gray-500 mt-2 h-10 overflow-hidden line-clamp-2">
                                {description}
                            </p>
                        )}
                    </div>
                </Link>
            </div>
        </div>
    );
}
