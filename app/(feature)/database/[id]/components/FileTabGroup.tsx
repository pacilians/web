"use client";

// components
import Iconify from "@components/Iconify";
import { Button } from "@components/button";
import { DataTable } from "./DataTable";
import DeleteFileModal from "./DeleteFileModal";

// libraries
import { Tab } from "@headlessui/react";
import { ColumnDef } from "@tanstack/react-table";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export type FileNasabah = {
  id: string;
  id_customer: string;
  name: string;
  created_at: string;
  updated_at: string;
  type: string;
};

const columns: ColumnDef<FileNasabah>[] = [
  {
    accessorKey: "name",
    header: "File name",
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created at
          <Iconify icon="solar:sort-vertical-linear" className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last modified
          <Iconify icon="solar:sort-vertical-linear" className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const file = row.original;

      return (
        <div className="flex gap-1">
          <DeleteFileModal file={file}/>
        </div>
      );
    },
  },
];

export default function FileTabGroup({
  mandatoryFile,
  additionalFile,
}: Readonly<{
  mandatoryFile: FileNasabah[];
  additionalFile: FileNasabah[];
}>) {
  
  return (
    <Tab.Group>
      <Tab.List className="flex gap-1 rounded-xl bg-base-backdrop-100 p-1 shadow-inner">
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-base-content-300",
              selected
                ? "border border-base-200 bg-base-backdrop-200 shadow"
                : "hover:bg-base-100/60 hover:text-base-content-100",
            )
          }
        >
          Mandatory
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-base-content-300",
              selected
                ? "border border-base-200 bg-base-backdrop-200 shadow"
                : "hover:bg-base-100/60 hover:text-base-content-100",
            )
          }
        >
          Others
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <DataTable columns={columns} data={mandatoryFile} mandatory/>
          {/* <FileList file={mandatoryFile} /> */}
        </Tab.Panel>
        <Tab.Panel>
          <DataTable columns={columns} data={additionalFile} />
          {/* <FileList file={additionalFile} /> */}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
