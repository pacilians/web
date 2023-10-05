import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Master Data | BNI Custody System",
  description: "",
};

export default function EditMasterData({ params }: { params: { id: string } }) {
  return (
    <main className="w-full grow rounded-tl-3xl bg-base-50 p-10 shadow-2xl">
      edit master data
    </main>
  );
}
