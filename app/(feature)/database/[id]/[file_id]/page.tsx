import { Metadata } from "next";

export const metadata: Metadata = {
  title: "File Nasabah | BNI Custody System",
  description: "",
};

export default async function ViewFile({ params }: { params: { file_id: string } }) {
  return (
    <main className="flex w-full grow flex-col gap-5 rounded-tl-3xl bg-base-backdrop-200 p-8 shadow-2xl">
      {params.file_id}
    </main>
  );
}
