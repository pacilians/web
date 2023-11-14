// apis
import { fetchChecklist } from "@api/api";

// libraries
import { Metadata } from "next";
import { cookies } from "next/headers";
import Table from "./components/Table";

export const metadata: Metadata = {
  title: "Database | BNI Custody System",
  description: "",
};

export default async function Checklist() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value ?? "";

  const data = await fetchChecklist(token);

  return (
    <main className="flex w-full grow flex-col gap-5 rounded-tl-3xl bg-base-backdrop-200 p-8 shadow-2xl">
      <Table data={data} />
    </main>
  );
}
