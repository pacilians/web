// "use client"
import { Metadata } from "next";
import dynamic from "next/dynamic";
// const ViewDocs = dynamic(() => import("./ViewDocs"), {
//   ssr: false,
// });
import { cookies } from "next/headers";
import ViewDocs from "./ViewDocs";

async function getData(id: string, token: string) {
  const res = await fetch(
    `https://bnicstdy-b41ad9b84aff.herokuapp.com/database/file/${id}`,
    // `http://127.0.0.1:8000/database/file/${id}`,
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
  return data.data.files;
}

export default async function ViewFile({ params }: { params: { file_id: string } }) {
  console.log(params);
  const { file_id } = params;
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value ?? "";

  const data = await getData(file_id, token);
  return (
    <main className="flex w-full grow flex-col gap-5 rounded-tl-3xl bg-base-backdrop-200 p-8 shadow-2xl">
      <ViewDocs data={data}/>
    </main>
  );
}
