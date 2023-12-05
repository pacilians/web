import { Metadata } from "next";
import { cookies } from "next/headers";

import FileTabGroup from "./components/FileTabGroup";
import Company from "./components/Company";
import BankAccount from "./components/BankAccount";
import BoardOfDirectors from "./components/BoardOfDirectors";

export const metadata: Metadata = {
  title: "Detail Nasabah | BNI Custody System",
  description: "",
};

async function getData(id: string, token: string) {
  const res = await fetch(
    // `https://bnicstdy-b41ad9b84aff.herokuapp.com/database/${id}`,
    `http://bnicustody.site:8000/database/${id}`,
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

export default async function DetailNasabah({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const { id } = params;
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value ?? "";

  const data = await getData(id, token);

  return (
    <main className="flex w-full grow flex-col gap-5 rounded-tl-3xl bg-base-backdrop-200 p-8 shadow-2xl">
      <section className="flex max-h-screen gap-3">
        <Company nasabah={data} />
        <div className="flex basis-1/2 flex-col gap-3">
          <BankAccount bankAccount={data.bank_account} />
          <BoardOfDirectors bod={data.board_of_director} />
        </div>
      </section>
      <FileTabGroup
        mandatoryFile={data.mandatory_file}
        additionalFile={data.additional_file}
      />
    </main>
  );
}
