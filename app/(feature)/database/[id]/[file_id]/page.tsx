// api
import { fetchFile } from "../api";

// components
import PDFViewer from "./components/PDFViewer";

// libraries
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "File Nasabah | BNI Custody System",
  description: "",
};

export default async function ViewFile({
  params,
}: Readonly<{
  params: { file_id: string };
}>) {
  const { file_id } = params;
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value ?? "";
  const data = await fetchFile(file_id, token);

  return (
    <main className="flex w-full grow flex-col gap-5 rounded-tl-3xl bg-base-backdrop-200 p-8 shadow-2xl">
      <PDFViewer data={data} />
    </main>
  );
}
