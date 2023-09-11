"use client";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { PDFDocument } from "pdf-lib";
import React, { useEffect } from "react";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function FillForm() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const fetchPDFAndPrintFields = async () => {
    const response = await fetch("/01_opening_account.pdf");
    const pdfBytes = await response.arrayBuffer();

    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();

    const fields = form.getFields();
    fields.forEach((field) => {
      const name = field.getName();
      const type = field.constructor.name;
      console.log(`Field name: ${name}, Field type: ${type}`);
    });
  };

  // Call the function when the component is mounted
  useEffect(() => {
    fetchPDFAndPrintFields();
  }, []);

  return (
    <main className="flex h-screen items-stretch">
      <div className="grow bg-slate-100 px-20 py-10">
        <div className="h-full rounded-xl shadow-xl">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
            <Viewer
              fileUrl="/01_opening_account.pdf"
              plugins={[defaultLayoutPluginInstance]}
            />
          </Worker>
        </div>
      </div>
      <div className="w-0.25 bg-slate-300" />
      <div className="flex grow justify-center bg-white p-20">
        <div className="w-full rounded-xl border border-slate-300 p-20">
          <h1>Form</h1>
        </div>
      </div>
    </main>
  );
}
