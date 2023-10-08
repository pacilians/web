import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail User | BNI Custody System",
  description: "",
};

export default function DetailUser({ params }: { params: { id: string } }) {
  return (
    <main className="w-full grow rounded-tl-3xl bg-base-backdrop-200 p-10 shadow-2xl">
      detail user
    </main>
  );
}
