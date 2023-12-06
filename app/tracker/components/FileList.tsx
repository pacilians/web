"use client";

import { useCookies } from "react-cookie";
import { usePathname, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import Iconify from "@components/Iconify";

type FileNasabah = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  file_exist: number;
  type: string;
};

const deleteFile = (id: string, name: string, token: string) => {
  const toastId = toast.loading(`Deleting ${name}...`);

  fetch(`${process.env.SERVER}/database/file/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      toast.success(`Deleted ${name} successfully`, { id: toastId });
      window.location.reload();
    })
    .catch((error) => {
      toast.error(`Failed to delete ${name}: ${error.message}`, {
        id: toastId,
      });
    });
};

export default function FileList({
  file,
  type,
}: {
  file: FileNasabah[];
  type: any;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section>
      <table className="min-w-full overflow-hidden rounded-xl border border-base-300">
        <thead className="border-b border-base-300 bg-base-200">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-base-content-300"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-base-content-300"
            >
              Created
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-base-content-300"
            >
              Modified
            </th>
            {type === "mandatory" ? (
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-base-content-300"
              >
                Filled
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {file.map((file) => (
            <tr
              key={file.id}
              className="group cursor-pointer overflow-hidden odd:bg-base-200/60 even:bg-base-200/30"
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

              {type === "mandatory" ? (
                <td
                  className={`whitespace-nowrap px-6 py-4 text-sm font-medium ${
                    file.file_exist === 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {file.file_exist === 0 ? "No file" : "Done"}
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster />
    </section>
  );
}
