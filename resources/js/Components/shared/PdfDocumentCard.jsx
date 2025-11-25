import { useState } from "react";
import PdfViewer from "../CourseDetail/PdfViewer";

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

export default function PdfDocumentCard({ document }) {
    const [isOpen, setIsOpen] = useState(false);

    const { title, description, file_url } = document;

    return (
        <div className="rounded-lg shadow-md overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center p-4 bg-blue-600 text-white hover:bg-blue-700 transition"
            >
                <DocumentIcon />
                <div className="text-left flex-1">
                    <span className="text-lg font-medium block">{title}</span>
                    {description && (
                        <span className="text-sm text-blue-100 block">
                            {description}
                        </span>
                    )}
                </div>
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
                    <div className="space-y-3">
                        {/* Download Button */}
                        <div className="flex justify-end">
                            <a
                                href={file_url}
                                download
                                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                            >
                                <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                Download PDF
                            </a>
                        </div>
                        
                        {/* PDF Viewer */}
                        <PdfViewer pdfUrl={file_url} />
                    </div>
                </div>
            )}
        </div>
    );
}