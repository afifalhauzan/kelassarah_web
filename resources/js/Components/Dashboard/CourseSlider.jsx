import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import CourseCard from "./CourseCard";

// Terima 'courses' dari props
export default function CourseSlider({ courses }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: "start",
        containScroll: "trimSnaps",
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="mt-12">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Kursus tersedia
                </h2>
                <div className="flex space-x-2">
                    <button
                        onClick={scrollPrev}
                        className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition disabled:opacity-50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={scrollNext}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition disabled:opacity-50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-4">
                    {/* Mapping data 'courses' dari props */}
                    {courses.map((course) => (
                        <div key={course.id} className="pl-4 shrink-0">
                            <CourseCard course={course} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
