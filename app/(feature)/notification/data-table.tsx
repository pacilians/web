"use client";

import { Button } from "@components/button";
import { Input } from "@components/input";
import Iconify from "@components/Iconify";
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
import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition, Disclosure } from "@headlessui/react";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";

type NotificationType = {
  id: any;
  id_customer: any;
  type: any;
  id_person: any;
  name_person: any;
  created_at: any;
  message: any;
  is_read: any;
  read_by: any;
};

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const router = useRouter();
  const pathname = usePathname();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [notification, setNotification] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.SERVER}/notification`, {
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
      const dat = res.data.notifications;
      console.log(dat);
      setNotification(dat);
    } catch (error) {
      console.error("Error fetching notif:", error);
    }
  };

  const handleMarkRead = async (item: any) => {
    const postForm = fetch(
      `${process.env.SERVER}/notification/${item.id}/mark-read`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.token,
        },
      },
    ).then(async (response) => {
      if (response.status === 200) {
        // Success
      } else {
        throw new Error("Failed Marked");
      }
    });
    toast.promise(postForm, {
      loading: "Marking notif as done",
      success: "Notif marked as done",
      error: "Failed marking notif",
    });

    setTimeout(() => {
      router.push(`/database/${item.id_customer}`)
    }, 2000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns: ColumnDef<NotificationType>[] = [
    {
      accessorKey: "is_read",
      header: "Is Read",
      cell: ({ row }) => {
        console.log(row);
        const current = row.original;

        if (current.is_read === 1) {
          return (
            <div>
              <Iconify icon="ic:round-check" className="text-2xl" />
            </div>
          );
        }
        return <Iconify icon="mdi:envelope" className="text-2xl" />;
      },
    },
    {
      accessorKey: "message",
      header: "Message",
    },
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
            <Iconify icon="solar:sort-vertical-linear" className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {

      accessorKey: "read_by",
      header: "Reader",
      cell: ({ row }) => {
        const current = row.original;

        if (current.is_read === 0) {
          return (
            <div>
              <Iconify icon="dashicons:align-none" className="text-2xl" />
            </div>
          );
        }
        return <p>{current.read_by}</p>;
      },
    },
    {
      header: "Action",
      cell: ({ row }) => {
        console.log(row);
        const current = row.original;
        return (
          <div
            className="cursor-pointer"
            onClick={() => { handleMarkRead(current) }}
          >
            <Iconify icon="circum:read" className="text-2xl" />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: notification,
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
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter notification"
          value={(table.getColumn("message")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("message")?.setFilterValue(event.target.value)
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
  );
}
