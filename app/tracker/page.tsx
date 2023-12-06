import { Metadata } from "next";
import { cookies } from "next/headers";

import FileTabGroup from "./components/FileTabGroup";
import Company from "./components/Company";
import BankAccount from "./components/BankAccount";
import BoardOfDirectors from "./components/BoardOfDirectors";

export const metadata: Metadata = {
  title: "Tracker | BNI Custody System",
  description: "",
};

async function getData(token: string) {
  const res = await fetch(
    `${process.env.SERVER}/database/tracker`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  const data = await res.json();
  return data.data.track
}

export default async function Tracker() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value ?? "";
  const data = await getData(token)

  return (
    <section className="flex w-full px-40 py-10 flex-col grow h-full text-base-content-200">
      <p className="text-xl font-bold">Welcome {data.detail.name}</p>
      {/* <p> {data}</p> */}
      <div className="bg-base-100 flex flex-col gap-3 p-5 rounded-3xl">
        <div className="flex flex-row gap-5 basis-3/4">
          <Company nasabah={data.detail} />
          <div className="flex basis-1/2 flex-col gap-3">
            <BankAccount bankAccounts={data.detail.bank_account} />
            <BoardOfDirectors bod={data.detail.board_of_director} />
          </div>
        </div>
        <div className="bg-red">

          <p className="whitespace-nowrap px-6 py-4 text-sm font-medium text-base-content-200">
            Mandatory file status:
            <span className={data.mandatory_status === 0 ? 'text-red-500' : 'text-green-500'}>
              {data.mandatory_status === 0 ? ' Not Complete' : ' Complete'}
            </span>
          </p>
        </div>
        <FileTabGroup
          mandatoryFile={data.mandatory}
          additionalFile={data.additional}
        />
      </div>

    </section>

  );
}
