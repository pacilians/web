"use client";

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
import * as React from "react";
import { FileUploader } from "react-drag-drop-files";
import { read } from "xlsx";

let topRows: { [key: string]: any }[] = [];
let totalAUC;
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setTopTen,
  setTotalAUC,
}: Readonly<
  DataTableProps<TData, TValue> & { setTopTen: Function; setTotalAUC: Function }
>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const readUploadFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Find the row number of "Total AUC Nasabah CORE CUSTODY"
      const searchTerm = "Total AUC Nasabah CORE CUSTODY";
      let endRow = 0;
      for (const cellAddress in worksheet) {
        if (worksheet[cellAddress].v === searchTerm) {
          endRow = parseInt(RegExp(/\d+/).exec(cellAddress)![0]) - 1;
          break;
        }
      }

      // Log the H column value for the row with "Total AUC Nasabah CORE CUSTODY"
      const totalAUCRow = worksheet["H" + (endRow + 1)];
      totalAUC = totalAUCRow.v;
      console.log(totalAUC);
      setTotalAUC(totalAUC);

      // Calculate the top 10 rows where the H column is highest within the specified range
      for (let i = 3; i < endRow; i++) {
        const eCell = worksheet["E" + i];
        const hCell = worksheet["H" + i];
        const eValue = eCell ? eCell.v : undefined;
        const hValue = hCell ? hCell.v : undefined;

        // Assuming 'topRows' is sorted in descending order based on the H column value
        if (topRows.length < 10 || hValue > topRows[9].AUC) {
          topRows.push({ company: eValue, AUC: hValue });
          topRows.sort((a, b) => b.AUC - a.AUC);
          topRows = topRows.slice(0, 10);
        }
      }
      console.log(topRows);
      setTopTen(topRows);
    };

    reader.readAsArrayBuffer(file);
  };

  const table = useReactTable({
    data,
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
    <div className="h-full grow overflow-y-scroll rounded-md border">
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="flex h-full w-full flex-col items-center justify-center gap-3 text-center"
              >
                Please upload monthly report
                <FileUploader
                  handleChange={(file: File) => readUploadFile(file)}
                  name="file"
                  required
                  types={["xlsx"]}
                  maxSize={5}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
