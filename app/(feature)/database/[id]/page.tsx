// apis
import { fetchNasabah } from "@api/api";

// components
import FileTabGroup from "./components/FileTabGroup";
import Company from "./components/Company";
import BankAccount from "./components/BankAccount";
import BoardOfDirectors from "./components/BoardOfDirectors";

// libraries
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Detail Nasabah | BNI Custody System",
  description: "",
};

export default async function DetailNasabah({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value ?? "";

  const data = await fetchNasabah(id, token);

  return (
    <main className="flex w-full grow flex-col gap-5 rounded-tl-3xl bg-base-backdrop-200 p-8 shadow-2xl">
      <section className="grid h-[552px] grid-cols-2 grid-rows-2 gap-3">
        <Company nasabah={data} />
        <BankAccount bankAccount={data.bank_account} />
        <BoardOfDirectors bod={data.board_of_director} />
      </section>
      <FileTabGroup
        mandatoryFile={data.mandatory_file}
        additionalFile={data.additional_file}
      />
    </main>
  );
}
