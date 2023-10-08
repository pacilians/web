import { Metadata } from "next";

import Iconify from "@/Iconify";
import FileTabGroup from "./components/FileTabGroup";

export const metadata: Metadata = {
  title: "Detail Nasabah | BNI Custody System",
  description: "",
};
interface NasabahData {
  name: string;
  dob: string;
  phone: string;
  address: string;
  expiredDate: string;
  category: string;
  service: string;
  accountNumber: string;
}

const nasabahData: NasabahData = {
  name: "ABC",
  dob: "21 Sept, 2010",
  phone: "+62 xxxx XXXx",
  address: "JI Patriot VII H/69 A RT 004/06,\nJawa Tengah",
  expiredDate: "11 Ags, 2023",
  category: "Insurance",
  service: "Trustee",
  accountNumber: "XXXXXXXX",
};

export default function DetailUser({ params }: { params: { fileId: string } }) {
  return (
    <main className="bg-base-backdrop-200 flex w-full grow flex-col gap-5 rounded-tl-3xl p-8 shadow-2xl">
      <section className="flex gap-3">
        <div className="group relative basis-1/2 overflow-hidden rounded-xl border border-base-300 px-8 py-5 text-base-content-400">
          <h3 className="mb-2 text-xl font-semibold text-base-content-200">
            Company
          </h3>
          <p className="font-bold">
            Name: <span className="font-normal">{nasabahData.name}</span>
          </p>
          <p className="font-bold">
            Date of Birth:{" "}
            <span className="font-normal">{nasabahData.dob}</span>
          </p>
          <p className="font-bold">
            Phone: <span className="font-normal">{nasabahData.phone}</span>
          </p>
          <p className="font-bold">
            Address: <span className="font-normal">{nasabahData.address}</span>
          </p>
          <p className="font-bold">
            Expired Date:{" "}
            <span className="font-normal">{nasabahData.expiredDate}</span>
          </p>
          <p className="font-bold">
            Category:{" "}
            <span className="font-normal">{nasabahData.category}</span>
          </p>
          <p className="font-bold">
            Service: <span className="font-normal">{nasabahData.service}</span>
          </p>
          <p className="font-bold">
            Account Number:{" "}
            <span className="font-normal">{nasabahData.accountNumber}</span>
          </p>
          <button className="absolute right-3 top-3 translate-x-[calc(100%+0.75rem)] translate-y-[calc(-100%-0.75rem)] scale-0 rounded-lg border border-base-200 bg-base-100 p-2 transition duration-300 ease-out hover:border-base-300 hover:bg-base-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:shadow-sm">
            <Iconify
              icon="solar:pen-bold-duotone"
              className="text-lg text-base-content-100"
            />
          </button>
        </div>
        <div className="flex basis-1/2 flex-col gap-3">
          <div className="group relative basis-1/2 overflow-hidden rounded-xl border border-base-300 px-8 py-5 text-base-content-400">
            <h3 className="mb-2 text-xl font-semibold text-base-content-200">
              Key Person
            </h3>
            <button className="absolute right-3 top-3 translate-x-[calc(100%+0.75rem)] translate-y-[calc(-100%-0.75rem)] scale-0 rounded-lg border border-base-200 bg-base-100 p-2 transition duration-300 ease-out hover:border-base-300 hover:bg-base-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:shadow-sm">
              <Iconify
                icon="solar:pen-bold-duotone"
                className="text-lg text-base-content-100"
              />
            </button>
          </div>
          <div className="group relative basis-1/2 overflow-hidden rounded-xl border border-base-300 px-8 py-5 text-base-content-400">
            <h3 className="mb-2 text-xl font-semibold text-base-content-200">
              Board of Directors
            </h3>
            <button className="absolute right-3 top-3 translate-x-[calc(100%+0.75rem)] translate-y-[calc(-100%-0.75rem)] scale-0 rounded-lg border border-base-200 bg-base-100 p-2 transition duration-300 ease-out hover:border-base-300 hover:bg-base-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:shadow-sm">
              <Iconify
                icon="solar:pen-bold-duotone"
                className="text-lg text-base-content-100"
              />
            </button>
          </div>
        </div>
      </section>
      <FileTabGroup />
    </main>
  );
}
