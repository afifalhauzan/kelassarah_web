import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// --- PENTING: Setting 'worker' buat react-pdf ---
const workerUrl = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

export default function PdfViewer({ pdfUrl }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber((prevPage) => prevPage + offset);
    }

    function prevPage() {
        if (pageNumber > 1) changePage(-1);
    }

    function nextPage() {
        if (pageNumber < numPages) changePage(1);
    }

    const fileUrl = pdfUrl || null;

    return (
        <div className="pdf-viewer border rounded-lg overflow-hidden">
            <div className="flex items-center justify-center p-2 bg-gray-200 space-x-4">
                <button
                    onClick={prevPage}
                    disabled={pageNumber <= 1}
                    className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-50"
                >
                    -
                </button>

                <span>
                    Page {pageNumber} / {numPages || "--"}
                </span>

                <button
                    onClick={nextPage}
                    disabled={pageNumber >= numPages}
                    className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-50"
                >
                    +
                </button>
            </div>

            <div className="h-[70vh] overflow-y-auto bg-gray-100 flex justify-center">
                <Document
                    file={fileUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={
                        <div className="p-4 text-center">Loading PDF...</div>
                    }
                    error={
                        <div className="p-4 text-center text-red-500">
                            Gagal memuat PDF.
                        </div>
                    }
                >
                    <Page
                        pageNumber={pageNumber}
                        width={800} // Ini bisa diatur
                    />
                </Document>
            </div>
        </div>
    );
}
