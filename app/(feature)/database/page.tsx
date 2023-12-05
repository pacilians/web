import { Metadata } from "next";
import { cookies } from "next/headers";
import List from "./components/List";
import Loading from "@components/Loading";

export const metadata: Metadata = {
  title: "Database | BNI Custody System",
  description: "",
};

async function getData(token: string) {
  const res = await fetch(
    // `https://bnicstdy-b41ad9b84aff.herokuapp.com/database`,
    `http://127.0.0.1:8000/database`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  const data = await res.json();
  return data.data.customer;
}

export default async function Database() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value ?? "";

  const data = await getData(token);

  return (
    <main className="w-full grow rounded-tl-3xl bg-base-backdrop-200 p-10 shadow-2xl">
      <List initialData={data} />
    </main>
  );
}
