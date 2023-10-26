"use client";

// components
import Iconify from "@components/Iconify";
import CreateFileModal from "./CreateFileModal";

// libraries
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

// types
import { File } from "@customTypes/types";
import DeleteFileModal from "./DeleteFileModal";

export default function FileList({
  file,
  mandatory,
}: {
  file: File[];
  mandatory?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  return (
    <section>
      <table className="min-w-full overflow-hidden rounded-xl border border-base-300">
        <thead className="border-b border-base-300 bg-base-200">
          <tr>
            <th
              scope="col"
              className="px-6 py-2 text-left text-sm font-medium text-base-content-300"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-2 text-left text-sm font-medium text-base-content-300"
            >
              Created
            </th>
            <th
              scope="col"
              className="px-6 py-2 text-left text-sm font-medium text-base-content-300"
            >
              Modified
            </th>
            <th
              scope="col"
              className="flex justify-end px-6 py-2 text-sm font-medium text-base-content-300"
            >
              <button
                className="flex items-center gap-1.5 rounded-md bg-orange-500 px-5 py-1 text-white transition hover:bg-orange-600 active:scale-95"
                onClick={() => {
                  setCreateModal(true);
                }}
              >
                <Iconify icon="fa6-solid:plus" /> Upload
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {file.map((file) => (
            <tr
              key={file.id}
              className="group cursor-pointer overflow-hidden odd:bg-base-200/60 even:bg-base-200/30"
              onClick={() => {
                router.push(`${pathname}/${file.id}`);
              }}
            >
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-base-content-200">
                {file.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-base-content-500">
                {file.created_at}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-base-content-500">
                {file.updated_at}
              </td>
              <td className="space-x-1">
                <button
                  className="translate-x-full scale-50 rounded-md border border-base-200 bg-base-100 p-2 opacity-0 transition delay-100 duration-300 hover:border-base-300 hover:bg-base-200 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <Iconify
                    icon="solar:pen-bold-duotone"
                    className="text-base-content-100"
                  />
                </button>
                {file.type === "ADDITIONAL" ? (
                  <button
                    type="button"
                    className="translate-x-full scale-50 rounded-md border border-base-200 bg-base-100 p-2 opacity-0 transition delay-100 duration-300 hover:border-base-300 hover:bg-base-200 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
                    onClick={(event) => {
                      event.stopPropagation();
                      setDeleteModal(true);
                      setSelectedFile({
                        id: file.id,
                        id_customer: file.id_customer,
                        name: file.name,
                        type: file.type,
                        created_at: file.created_at,
                        updated_at: file.updated_at,
                      });
                    }}
                  >
                    <Iconify
                      icon="solar:trash-bin-trash-bold-duotone"
                      className="text-base-content-100"
                    />
                  </button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster />
      <CreateFileModal
        isOpen={createModal}
        setIsOpen={setCreateModal}
        mandatory={mandatory}
      />
      <DeleteFileModal
        isOpen={deleteModal}
        setIsOpen={setDeleteModal}
        selectedFile={selectedFile}
      />
    </section>
  );
}
