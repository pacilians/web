import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Nasabah | BNI Custody System",
  description: "",
};

export default function DetailUser({ params }: { params: { fileId: string } }) {
  return (
    <main className="w-full grow rounded-tl-3xl bg-base-200 p-10 shadow-2xl">
      file nasabah
    </main>
  );
}
