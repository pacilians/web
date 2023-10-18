import { Metadata } from "next";
import { Worker } from "@react-pdf-viewer/core";

export const metadata: Metadata = {
  title: "View File | BNI Custody System",
  description: "",
};

export default function ViewFile({ params }: { params: { fileId: string } }) {
  return (
    <section>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        ...
      </Worker>
    </section>
  );
}
