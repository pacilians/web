"use client";

// libraries
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { useMemo } from "react";

type ChecklistItem = {
  id: string;
  name: string;
  check: Record<string, boolean>;
};

type Checklist = {
  column: string[];
  checklist: ChecklistItem[];
};

export default function Table({ data }: Readonly<{ data: Checklist }>) {
  const columns = useMemo<
    MRT_ColumnDef<Pick<ChecklistItem, "name" | "check">>[]
  >(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      ...data.column.map((col) => ({
        accessorKey: `check.${col}`,
        header: col,
      })),
    ],
    [data],
  );

  const table = useMantineReactTable({
    columns,
    data: useMemo(() => data.checklist, [data]),
    mantinePaperProps: () => ({
      className: "min-w-full rounded-xl border !border-base-300",
    }),
    mantineTableHeadProps: () => ({
      className: "border-b border-base-300 bg-base-200",
    }),
    mantineTableBodyCellProps: () => ({
      className:
        "px-6 py-4 text-sm font-medium text-base-content-200 whitespace-nowrap",
    }),
    mantineTableBodyRowProps: () => ({
      className: "odd:bg-base-200/60 even:bg-base-200/30",
    }),
  });

  return (
    <section>
      <MantineReactTable table={table} />
    </section>
  );
}
