// components
import Analysis from "./components/Analysis";
import Rekap from "./components/Rekap";

// libraries
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asset Management | BNI Custody System",
  description: "",
};

export default function AssetManagement() {
  return (
    <main className="flex w-full grow flex-col gap-3 rounded-tl-3xl bg-base-backdrop-200 p-8 shadow-2xl">
      <Rekap />
      <Analysis />
    </main>
  );
}
