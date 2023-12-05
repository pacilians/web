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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/table";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@components/input";
import Iconify from "@components/Iconify";
import { ActionIcon, Button, Flex, Text, Tooltip } from "@mantine/core";
import { dummylist } from "./data";
import { iSecurities } from "./interface";

// export const metadata: Metadata = {
//   title: "Security Account | BNI Custody System",
//   description: "",
// };

export default function SecurityACC() {
  /**
   * States
   */
  const router = useRouter();
  const pathname = usePathname();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [securities, setSecurities] = useState([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  /**
   * Functions
   */
  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.SERVER}/security-account`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.token,
        },
      });

      if (!response.ok) {
        console.error(
          "Error fetching announcement:",
          "Network response was not ok",
        );
      }

      const res = await response.json();
      const dat = res.data.securitiesAccounts;
      setSecurities(dat);
    } catch (error) {
      console.error("Error fetching notif:", error);
    }
  };

  const handleDelete = async (data: any) => {
    const postForm = fetch(
      `http://127.0.0.1:8000/security-account/${data.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.token,
        },
      },
    ).then(async (response) => {
      if (response.status === 200) {
        const curr = securities.filter((ctx: any) => ctx.id != data.id);
        setSecurities(curr);
        // Success
      } else {
        throw new Error("Failed Marked");
      }
    });
    toast.promise(postForm, {
      loading: "Deleting security account",
      success: "Deleted securities account",
      error: "Failed delete securities acccount",
    });
  };

  /**
   * UseEffect
   */
  useEffect(() => {
    fetchData();
  }, []);

  const columns: ColumnDef<iSecurities>[] = [
    {
      header: "Action",
      cell: ({ row }) => {
        const current = row.original;
        return (
          <div className="flex flex-row gap-4">
            <div
              className="cursor-pointer"
              onClick={() => {
                router.push(`${pathname}/${current.id}`);
              }}
            >
              <Iconify icon="system-uicons:write" className="text-2xl" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                handleDelete(current);
              }}
            >
              <Iconify icon="material-symbols:delete" className="text-2xl" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                console.log(current);
                const textData = JSON.stringify(current);
                const blob = new Blob([textData], { type: "text/plain" });
                const downloadLink = document.createElement("a");
                downloadLink.download = "data.txt";
                downloadLink.href = window.URL.createObjectURL(blob);
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);
                downloadLink.click();
              }}
            >
              <Iconify icon="fluent-mdl2:generate" className="text-2xl" />
            </div>
          </div>
        );
      },
    },
    { accessorKey: "kode_bk", header: "Kode BK" },
    { accessorKey: "no_rekening_investor", header: "No Rekening Investor" },
    { accessorKey: "nama_perusahaan", header: "Nama Perusahaan" },
    { accessorKey: "nama_awal", header: "Nama Awal" },
    { accessorKey: "nama_tengah", header: "Nama Tengah" },
    { accessorKey: "nama_belakang", header: "Nama Belakang" },
    { accessorKey: "ktp", header: "KTP" },
    { accessorKey: "npwp", header: "NPWP" },
    { accessorKey: "no_paspor", header: "No Paspor" },
    { accessorKey: "no_pendaftaran_usaha", header: "No Pendaftaran Usaha" },
    { accessorKey: "tanggal_pendirian", header: "Tanggal Pendirian" },
    { accessorKey: "tempat_pendirian", header: "Tempat Pendirian" },
    { accessorKey: "tipe_investor", header: "Tipe Investor" },
    { accessorKey: "jenis_kelamin", header: "Jenis Kelamin" },
    { accessorKey: "jenis_pekerjaan", header: "Jenis Pekerjaan" },
    { accessorKey: "alamat_identitas_1", header: "Alamat Identitas 1" },
    { accessorKey: "alamat_identitas_2", header: "Alamat Identitas 2" },
    { accessorKey: "kode_kota", header: "Kode Kota" },
    { accessorKey: "kode_provinsi", header: "Kode Provinsi" },
    { accessorKey: "kode_negara", header: "Kode Negara" },
    { accessorKey: "no_telepon", header: "No Telepon" },
    { accessorKey: "no_hp", header: "No HP" },
    { accessorKey: "email", header: "Email" },

    {
      accessorKey: "created_at",
      // header: "Created At",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created At
            <Iconify
              icon="solar:sort-vertical-linear"
              className="ml-2 h-4 w-4"
            />
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: securities,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });
  return (
    <main className="grow rounded-tl-3xl bg-base-backdrop-200 p-10 shadow-2xl">
      <div className="mb-5">
        <button
          type="button"
          onClick={() => {
            router.push(`${pathname}/create`);
          }}
          className="rounded-10 flex h-12 items-center justify-center bg-[#E55300] p-5 text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Add
        </button>
      </div>

      <React.Fragment>
        <div>
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter Security Account"
              value={
                (table
                  .getColumn("no_rekening_investor")
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn("no_rekening_investor")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
          <Toaster />
        </div>
      </React.Fragment>
    </main>
  );
}
