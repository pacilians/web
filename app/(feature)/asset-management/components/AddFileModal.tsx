"use client";

// apis

// libraries
import { Button } from "@components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/dialog";
import { FileUploader } from "react-drag-drop-files";
import { read } from "xlsx";

let topRows: { [key: string]: any }[] = [];
let totalAUC;

export default function CreateFileModal({
  setTopTen,
  setTotalAUC,
}: {
  setTopTen: Function;
  setTotalAUC: Function;
}) {
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Upload monthly report</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Monthly Asset Report</DialogTitle>
          <DialogDescription>
            Upload an excel file of this month&apos;s asset report.
          </DialogDescription>
          <FileUploader
            handleChange={(file: File) => readUploadFile(file)}
            name="file"
            required
            types={["xlsx"]}
            maxSize={5}
          />
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4"></div>
          <div className="grid grid-cols-4 items-center gap-4"></div>
        </div>
        <DialogFooter>
          <Button type="submit">Analyze</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    // <Transition appear show={isOpen} as={Fragment}>
    //   <Dialog
    //     as="div"
    //     className="relative z-10"
    //     onClose={() => {
    //       setIsOpen(false);
    //     }}
    //   >
    //     <Transition.Child
    //       as={Fragment}
    //       enter="ease-out duration-300"
    //       enterFrom="opacity-0"
    //       enterTo="opacity-100"
    //       leave="ease-in duration-200"
    //       leaveFrom="opacity-100"
    //       leaveTo="opacity-0"
    //     >
    //       <div className="fixed inset-0 bg-white/40 backdrop-blur dark:bg-black/40" />
    //     </Transition.Child>

    //     <div className="fixed inset-0 overflow-y-auto">
    //       <div className="flex min-h-full items-center justify-center p-4 text-center">
    //         <Transition.Child
    //           as={Fragment}
    //           enter="ease-out duration-300"
    //           enterFrom="opacity-0 scale-95"
    //           enterTo="opacity-100 scale-100"
    //           leave="ease-in duration-200"
    //           leaveFrom="opacity-100 scale-100"
    //           leaveTo="opacity-0 scale-95"
    //         >
    //           <Dialog.Panel
    //             as="form"
    //             className="flex w-full max-w-md transform flex-col gap-5 overflow-hidden rounded-2xl bg-base-backdrop-200 p-6 text-left align-middle shadow-xl"
    //           >
    //             <div className="flex flex-col gap-2">
    //               <Dialog.Title
    //                 as="h3"
    //                 className="text-lg font-semibold leading-6 text-base-content-100"
    //               >
    //                 Upload new file
    //               </Dialog.Title>
    //             </div>
    //             <FileUploader
    //               handleChange={(file: any) => setFile(file)}
    //               name="file"
    //               required
    //               types={["pdf"]}
    //               maxSize={5}
    //             />
    //             <div className="mt-4 flex w-full gap-2">
    //               <button
    //                 type="button"
    //                 className="inline-flex justify-center rounded-md border border-transparent bg-base-300 px-4 py-2 text-sm font-medium text-base-content-300 hover:bg-base-300/50"
    //                 onClick={() => {
    //                   setIsOpen(false);
    //                 }}
    //               >
    //                 Cancel
    //               </button>
    //               <button
    //                 type="button"
    //                 className="inline-flex justify-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-orange-100 hover:bg-orange-600"
    //                 onClick={() => {}}
    //               >
    //                 Upload
    //               </button>
    //             </div>
    //           </Dialog.Panel>
    //         </Transition.Child>
    //       </div>
    //     </div>
    //   </Dialog>
    // </Transition>
  );
}
