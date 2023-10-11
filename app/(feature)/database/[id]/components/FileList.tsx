"use client";

import { useCookies } from "react-cookie";
import { usePathname, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import Iconify from "@/Iconify";

type FileNasabah = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  type: string;
};

const deleteFile = (id: string, name: string, token: string) => {
  const toastId = toast.loading(`Deleting ${name}...`);

  fetch(`https://bnicstdy-b41ad9b84aff.herokuapp.com/database/file/${id}`, {
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

export default function FileList({ file }: { file: FileNasabah[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [cookies, setCookie, removeCookie] = useCookies();

  let [isOpen, setIsOpen] = useState(false);
  let [fileId, setFileId] = useState("");
  let [fileName, setFileName] = useState("");

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
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-base-content-300"
            ></th>
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
                      setIsOpen(true);
                      setFileId(file.id);
                      setFileName(file.name);
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
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex w-full max-w-md transform flex-col items-center gap-5 overflow-hidden rounded-2xl bg-base-200 p-6 text-left align-middle shadow-xl">
                  <Iconify
                    icon="solar:trash-bin-trash-bold-duotone"
                    className="rounded-full bg-red-300 p-2 text-6xl text-red-700"
                  />
                  <div className="flex flex-col gap-2">
                    <Dialog.Title
                      as="h3"
                      className="text-center text-lg font-semibold leading-6 text-base-content-100"
                    >
                      Delete {fileName}?
                    </Dialog.Title>
                    <p className="text-center text-sm text-base-content-400">
                      Are you sure you want to delete this file? You won&apos;t
                      be able to undo this action.
                    </p>
                  </div>

                  <div className="mt-4 flex w-full gap-2">
                    <button
                      type="button"
                      className="inline-flex grow justify-center rounded-md border border-transparent bg-base-300 px-4 py-2 text-sm font-medium text-base-content-300 hover:bg-base-300/50"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex grow justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-red-100 hover:bg-red-600"
                      onClick={() => {
                        deleteFile(fileId, fileName, cookies.token);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
}
