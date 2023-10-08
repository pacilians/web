import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Announcement | BNI Custody System",
  description: "",
};

export default function EditAnnouncement({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main className="w-full grow rounded-tl-3xl bg-base-backdrop-200 p-10 shadow-2xl">
      edit announcement
    </main>
  );
}
