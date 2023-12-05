"use client";

import Iconify from "@components/Iconify";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PDFViewer({ data }: any) {
  console.log(data);
  const bufferData = new Uint8Array(data.file.data);
  const fileURL = URL.createObjectURL(new Blob([bufferData], { type: "pdf" }));
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1); // start on first page
  const [loading, setLoading] = useState(true);
  const [pageWidth, setPageWidth] = useState(0);

  const handleDownload = () => {

    const fileName = "test.pdf";
    const fileType = "pdf";

    const blob = new Blob([bufferData], { type: fileType });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return () => {
      URL.revokeObjectURL(link.href);
    };
  };

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: {
    numPages: number;
  }) {
    setNumPages(nextNumPages);
  }

  function onPageLoadSuccess() {
    setPageWidth(window.innerWidth);
    setLoading(false);
  }

  const options = {
    cMapUrl: "cmaps/",
    cMapPacked: true,
    standardFontDataUrl: "standard_fonts/",
  };

  // Go to next page
  function goToNextPage() {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  }

  function goToPreviousPage() {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  }

  return (
    <>
      <button onClick={handleDownload}>Download PDF</button>

      <Nav pageNumber={pageNumber} numPages={numPages} />
      <div hidden={loading} className="flex h-[calc(100vh-4rem)] items-center">
        <div
          className={`absolute z-10 flex w-full items-center justify-between px-2`}
        >
          <button
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
            className="relative h-[calc(100vh-4rem)] px-2 py-24 text-gray-400 hover:text-gray-50 focus:z-20"
          >
            <span className="sr-only">Previous</span>
            <Iconify
              icon="solar:alt-arrow-left-bold"
              className="text-4xl"
              aria-hidden="true"
            />
          </button>
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="relative h-[calc(100vh-4rem)] px-2 py-24 text-gray-400 hover:text-gray-50 focus:z-20"
          >
            <span className="sr-only">Next</span>
            <Iconify
              icon="solar:alt-arrow-right-bold"
              className="text-4xl"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="mx-auto flex h-full justify-center">
          <Document
            file={fileURL}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
            renderMode="canvas"
            className=""
          >
            <Page
              className=""
              key={pageNumber}
              pageNumber={pageNumber}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              onLoadSuccess={onPageLoadSuccess}
              onRenderError={() => setLoading(false)}
              width={Math.max(pageWidth * 0.8, 390)}
            />
          </Document>
        </div>
      </div>
    </>
  );
}

function Nav({
  pageNumber,
  numPages,
}: Readonly<{
  pageNumber: number;
  numPages: number;
}>) {
  return (
    <nav className="bg-black">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <p className="text-2xl font-bold tracking-tighter text-white">
                Papermark
              </p>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">
              <span>{pageNumber}</span>
              <span className="text-gray-400"> / {numPages}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
