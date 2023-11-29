"use client";
import { Metadata } from "next";
import { cookies } from "next/headers";

import { SecuritiesAccount } from "../../types/types";
import React, { Fragment, useState, useEffect, useMemo } from "react";
import { Dialog, Transition, Disclosure } from "@headlessui/react";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import {
  MantineReactTable,
  useMantineReactTable,
  MRT_TableOptions,
  type MRT_ColumnDef,
} from "mantine-react-table";
import Iconify from "@components/Iconify";
import { ActionIcon, Button, Flex, Text, Tooltip } from "@mantine/core";
import { dummylist } from "./data";

// export const metadata: Metadata = {
//   title: "Security Account | BNI Custody System",
//   description: "",
// };

export default function SecurityACC() {
  const columns = useMemo<MRT_ColumnDef<SecuritiesAccount>[]>(
    () => [
      {
        header: "Kode BK",
        accessorKey: "kode_bk",
      },
      {
        header: "No Rekening",
        accessorKey: "no_rekening_investor",
        enableEditing: false,
      },
      {
        header: "Nama Perusahaan",
        accessorKey: "nama_perusahaan",
        enableEditing: false,
      },
      {
        header: "Kode BK",
        accessorKey: "kode_bk",
      },
      {
        header: "KTP",
        accessorKey: "ktp",
      },
      {
        header: "NPWP",
        accessorKey: "npwp",
      },
      {
        header: "No Paspor",
        accessorKey: "no_paspor",
      },
      {
        header: "No Pendaftaran Usaha",
        accessorKey: "no_pendaftaran_usaha",
      },
      {
        header: "Tanggal Pendirian",
        accessorKey: "tanggal_pendirian",
      },
      {
        header: "Tempat Pendirian",
        accessorKey: "tempat_penidiran",
      },
      {
        header: "Tipe Investor",
        accessorKey: "tipe_investor",
      },
      {
        header: "Jenis Kelamin",
        accessorKey: "jenis_kelamin",
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data: dummylist,
    state: { isLoading: false },
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    enableRowActions: true,
    positionActionsColumn: "last",
    initialState: { showColumnFilters: true, showGlobalFilter: true },
    mantineTableBodyRowProps: ({ row, table }) => ({
      onDoubleClick: (event) => {
        const current = table.getRow(row.id).original;
        // router.push(`${pathname}/${current.id}`);
      },
      sx: {
        cursor: "pointer", //you might want to change the cursor too when adding an onClick
      },
    }),
    renderRowActions: ({ row, table }) => (
      <>
        <Flex gap="md">
          <Tooltip label="Edit">
            <ActionIcon onClick={() => table.setEditingRow(row)}>
              <Iconify
                icon="material-symbols-light:edit-outline"
                className="text-2xl"
              />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Delete">
            <ActionIcon
              color="red"
              onClick={() => {
                const current = table.getRow(row.id).original;
              }}
            >
              <Iconify
                icon="material-symbols-light:delete-outline"
                className="text-2xl"
              />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </>
    ),
  });
  return (
    <main className="w-full grow rounded-tl-3xl bg-base-backdrop-200 p-10 shadow-2xl">
      <div className="mb-5">
        <button
          type="button"
          onClick={() => {
            // setOpen({ ...open, add: true });
          }}
          className="rounded-10 flex h-12 items-center justify-center bg-[#E55300] p-5 text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Add
        </button>
      </div>

      <React.Fragment>
        <MantineReactTable table={table} />
      </React.Fragment>
    </main>
  );
}
