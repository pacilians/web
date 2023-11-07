"use client";

// libraries
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

// types
import { File } from "@customTypes/types";

export default function FileList({
  file,
  mandatory,
}: Readonly<{
  file: File[];
  mandatory?: boolean;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const columns = useMemo<
    MRT_ColumnDef<Pick<File, "name" | "created_at" | "updated_at">>[]
  >(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "created_at",
        header: "Created At",
      },
      {
        accessorKey: "updated_at",
        header: "Updated At",
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data: useMemo(() => file, [file]),
    mantineTableBodyRowProps: ({ row }) => ({
      className:
        "group cursor-pointer overflow-hidden odd:bg-base-200/60 even:bg-base-200/30",
      onClick: () => {
        router.push(`${pathname}/${row.id}`);
      },
    }),
  });

  return (
    <section>
      <MantineReactTable table={table} />
    </section>
  );
}
