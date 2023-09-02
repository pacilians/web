"use client";

import React, { ChangeEvent, useState } from "react";
import XLSX from "xlsx";

export default function Page() {
  const [file, setFile] = useState<File>();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      console.log(workbook);
      // You can now manipulate the 'workbook' object.
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Upload
      </button>
    </div>
  );
}
