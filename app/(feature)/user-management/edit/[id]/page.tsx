import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit User | BNI Custody System",
  description: "",
};

export default function EditUser({ params }: { params: { id: string } }) {
  return (
    <main className="w-full grow rounded-tl-3xl bg-base-backdrop-200 p-10 shadow-2xl">
      edit user
    </main>
  );
}
