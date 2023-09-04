"use client";

import React, { useEffect } from "react";
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";

export default function FileInput() {
  useEffect(() => {
    // Initialize dropzone
    const myDropzone = new Dropzone("#fileInput", { url: "/upload" });

    // Listen for file added event
    myDropzone.on("addedfile", (file) => {
      console.log("File added:", file);
    });
  }, []);

  return (
      <form id="fileInput" className="dropzone">
        <div className="dz-message">Drop files here or click to upload.</div>
      </form>
  );
}
