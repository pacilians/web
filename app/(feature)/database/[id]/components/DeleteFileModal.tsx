"use client";

// apis
import { deleteFile } from "@api/api";

// components
import Iconify from "@components/Iconify";

// libraries
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useCookies } from "react-cookie";

// types
import { File } from "@customTypes/types";

export default function DeleteFileModal({
  isOpen,
  setIsOpen,
  selectedFile,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  selectedFile: File | undefined;
}) {
  const [cookies, setCookie, removeCookie] = useCookies();

  return (
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
          <div className="fixed inset-0 bg-white/40 dark:bg-black/40 backdrop-blur" />
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
              <Dialog.Panel className="flex w-full max-w-md transform flex-col items-center gap-5 overflow-hidden rounded-2xl bg-base-backdrop-200 p-6 text-left align-middle shadow-xl">
                <Iconify
                  icon="solar:trash-bin-trash-bold-duotone"
                  className="rounded-full bg-red-300 p-2 text-6xl text-red-700"
                />
                <div className="flex flex-col gap-2">
                  <Dialog.Title
                    as="h3"
                    className="text-center text-lg font-semibold leading-6 text-base-content-100"
                  >
                    Delete {selectedFile?.name}?
                  </Dialog.Title>
                  <p className="text-center text-sm text-base-content-400">
                    Are you sure you want to delete this file? You won&apos;t be
                    able to undo this action.
                  </p>
                </div>
                <div className="mt-4 flex w-full gap-2">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-base-300 px-4 py-2 text-sm font-medium text-base-content-300 hover:bg-base-300/50"
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
                      deleteFile(
                        selectedFile!.id,
                        selectedFile!.name,
                        cookies.token,
                      );
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
  );
}
