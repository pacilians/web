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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company
          <Iconify icon="solar:sort-vertical-linear" className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "AUC",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          AUC
          <Iconify icon="solar:sort-vertical-linear" className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
