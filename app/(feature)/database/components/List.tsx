"use client";
import { Metadata } from "next";
import { Fragment, useState, useEffect } from "react";
import Form from "../components/Form";
import Filter from "../components/Filter";
import toast, { Toaster } from "react-hot-toast";
import { iCustomer } from "../../../types/types";
import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  MantineReactTable,
  useMantineReactTable,
  MRT_TableOptions,
  type MRT_ColumnDef,
} from "mantine-react-table";
import Iconify from "@components/Iconify";
import { ActionIcon, Button, Flex, Text, Tooltip } from "@mantine/core";
import { useCookies } from "react-cookie";

export const metadata: Metadata = {
  title: "Database | BNI Custody System",
  description: "",
};

interface Props {
  initialData: any;
}

export default function Database({ initialData }: Props) {
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const [customer, setCustomer] = useState(initialData || []);
  const [cookies, setCookie, removeCookie] = useCookies();
  const pathname = usePathname();

  /**
   * Function
   */

  const fetchCustomer = async () => {
    try {
      const response = await fetch(
        "http://bnicustody.site:8000/database",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: cookies.token,
          },
        },
      );

      if (!response.ok) {
        console.error("Error fetching user:", "Network response was not ok");
      }

      const res = await response.json();
      const customer = res.data.customers;
      setCustomer(customer);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  /**
   * UseEffect
   */
  useEffect(() => {
    fetchCustomer();
  }, []);

  /**
   * Table
   */

  const columns = useMemo<MRT_ColumnDef<iCustomer>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Email",
        accessorKey: "email",
        enableEditing: false,
      },
      {
        header: "Expiry Date",
        accessorKey: "expiry_date",
        enableEditing: false,
      },
      {
        header: "Service",
        accessorKey: "service",
        enableEditing: false,
      },
      {
        header: "Business Category",
        accessorKey: "business_category",
        enableEditing: false,
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data: customer,
    state: { isLoading: loader },
    enableEditing: false,
    enableRowActions: false,
    positionActionsColumn: "last",
    initialState: { showColumnFilters: true, showGlobalFilter: true },
    mantineTableBodyRowProps: ({ row, table }) => ({
      onDoubleClick: (event) => {
        const current = table.getRow(row.id).original;
        router.push(`${pathname}/${current.id}`);
      },
      sx: {
        cursor: "pointer", //you might want to change the cursor too when adding an onClick
      },
    }),
  });

  return (
    <div>
      <div className=" ">
        <div className="mt-2 flex w-full flex-row items-center justify-between rounded-md pb-5 shadow-sm">
          <div>
            <Form
              loader={loader}
              setLoader={setLoader}
              customer={customer}
              setCutomer={setCustomer}
            />
          </div>
        </div>
        <MantineReactTable table={table} />
        {/* <table className="w-full table-fixed ">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Last Update</th>
              <th>Service</th>
              <th>Category</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-500 bg-base-100 text-center text-base-content ">
            {customer.map((ctx: iCustomer, index: any) => {
              return (
                <tr
                  className="hover:bg-slate-300"
                  key={index}
                  onClick={() => {
                    router.push(`/database/${ctx.id}`);
                  }}
                >
                  <td>{ctx.name}</td>
                  <td>{ctx.email}</td>
                  <td>4/10/2023</td>
                  <td>{ctx.service}</td>
                  <td>{ctx.business_category}</td>
                </tr>
              );
            })}
          </tbody>
        </table> */}
      </div>
      <br />

      <div>
        <Toaster />
      </div>
    </div>
  );
}
