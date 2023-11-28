import { Metadata } from "next";
import { DataTable } from "./data-table";

export const metadata: Metadata = {
  title: "Asset Management | BNI Custody System",
  description: "",
};

export default function Notification() {
  return (
    <main className="w-full grow rounded-tl-3xl bg-base-backdrop-200 p-10 shadow-2xl">
      <DataTable/>
    </main>
  );
}
