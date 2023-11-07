"use client";

// apis
import { fetchMasterData } from "@api/api";

// libraries
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import CategoryCombobox from "./CategoryCombobox";

export default function CreateFileModal({
  isOpen,
  setIsOpen,
  mandatory,
}: Readonly<{
  isOpen: boolean;
  setIsOpen: Function;
  mandatory?: boolean;
}>) {
  const [file, setFile] = useState(null);
  const [masterData, setMasterData] = useState({
    business: [],
    service: [],
    mandatory: [],
  });

  // using useEffect because await cannot be used in non async components
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchMasterData();
      setMasterData(result || { business: [], service: [], mandatory: [] });
    };

    fetchData();
  }, []);

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
              <Dialog.Panel
                as="form"
                className="flex w-full max-w-md transform flex-col gap-5 overflow-hidden rounded-2xl bg-base-backdrop-200 p-6 text-left align-middle shadow-xl"
              >
                <div className="flex flex-col gap-2">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-base-content-100"
                  >
                    Upload new file
                  </Dialog.Title>
                </div>
                {mandatory ? (
                  <CategoryCombobox
                    items={masterData.mandatory}
                    name={"upload-mandatory"}
                  />
                ) : null}
                <FileUploader
                  handleChange={(file: any) => setFile(file)}
                  name="file"
                  required
                  types={["pdf"]}
                  maxSize={5}
                />
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
                    className="inline-flex justify-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-orange-100 hover:bg-orange-600"
                    onClick={() => {}}
                  >
                    Upload
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
