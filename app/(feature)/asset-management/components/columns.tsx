"use client";

import Iconify from "@components/Iconify";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@components/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TopTenNasabah = {
  company: string;
  AUC: number;
};

export const columns: ColumnDef<TopTenNasabah>[] = [
  {
    accessorKey: "company",
    header: "Company"
  },
  {
    accessorKey: "AUC",
    header: "AUC",
  },
];
