import { useState } from "react";
import PdfViewer from "./PdfViewer";
import VideoJsPlayer from "./VideoJsPlayer";

const VideoIcon = () => (
    <svg
        className="w-6 h-6 mr-3 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
    </svg>
);
const DocumentIcon = () => (
    <svg
        className="w-6 h-6 mr-3 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
    </svg>
);

export default function LessonAccordion({ lesson }) {
    const [isOpen, setIsOpen] = useState(false);

    const { title, material_type, content_text, content_url, subtitle_url } =
        lesson;

    console.log("Subtitle URL:", subtitle_url);

    const icon = material_type === "video" ? <VideoIcon /> : <DocumentIcon />;

    return (
        <div className="rounded-lg shadow-md overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center p-4 bg-blue-600 text-white hover:bg-blue-700 transition"
            >
                {icon}
                <span className="text-lg font-medium text-left">{title}</span>
                <svg
                    className={`w-5 h-5 ml-auto transform transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                    {material_type === "video" && (
                        <div className="w-full aspect-video rounded-lg">
                            <VideoJsPlayer
                                videoUrl={content_url}
                                subtitleUrl={subtitle_url}
                                title={title}
                            />
                        </div>
                    )}

                    {material_type === "document" &&
                        (content_text ? (
                            <div className="prose max-w-none">
                                <p>{content_text}</p>
                            </div>
                        ) : (
                            <PdfViewer pdfUrl={content_url} />
                        ))}
                </div>
            )}
        </div>
    );
}
