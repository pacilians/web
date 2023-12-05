"use client";

// components
import { columns } from "./columns";
import { DataTable } from "./data-table";

// libraries
import { useState } from "react";

export default function Rekap() {
  const [topTen, setTopTen] = useState([]); // [ { name: string, value: number }
  const [totalAUC, setTotalAUC] = useState(0); // number
  return (
    <section className="flex h-60 gap-3">
      <div className="flex grow flex-col gap-3">
        <DataTable
          columns={columns}
          data={topTen}
          setTopTen={setTopTen}
          setTotalAUC={setTotalAUC}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-base-300 bg-base-200 px-8 py-10 text-center">
        <p className="text-xl font-semibold">Total monthly AUC:</p>
        {totalAUC.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 3,
        })}
      </div>
    </section>
  );
}
