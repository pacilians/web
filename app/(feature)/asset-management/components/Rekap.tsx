"use client";

// components
import AddFileModal from "./AddFileModal";
import { columns } from "./columns";
import { DataTable } from "./data-table";

// libraries
import { useState } from "react";

export default function Rekap() {
  const [topTen, setTopTen] = useState([]); // [ { name: string, value: number }
  const [totalAUC, setTotalAUC] = useState(0); // number
  return (
    <section className="flex h-60 gap-3">
      <DataTable columns={columns} data={topTen} />

      <div className="flex flex-col gap-3">
        <AddFileModal setTopTen={setTopTen} setTotalAUC={setTotalAUC} />
        <div className="flex grow items-center justify-center rounded-lg border border-base-300 bg-base-200 py-10">
          {totalAUC}
        </div>
      </div>
    </section>
  );
}
