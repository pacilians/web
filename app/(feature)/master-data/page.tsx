"use client";

import React from "react";
import Service from "./components/Service";
import Category from "./components/Category";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

type MasterDataItem = {
  id: number;
  name: string;
};


const MasterData: React.FC = () => {
  const data: MasterDataItem[] = [
    { id: 1, name: "Deed_of_Establishment.pdf" },
    { id: 2, name: "KTP_Pemilik.pdf" },
    { id: 3, name: "Client_Risk.pdf" },
  ];

  const longestName = data.reduce(
    (longest, item) =>
      item.name.length > longest.length ? item.name : longest,
    "",
  );

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <main className="flex grow rounded-tl-3xl bg-base-50 p-10 p-4 shadow-2xl gap-4">
      <div className="basis-1/2">
        <div className="w-full h-full rounded-3xl bg-base-200 p-10 shadow-2xl">
          <div className="flex items-center justify-between">
        <h1 className="mb-4 text-xl font-bold text-blue-400">Mandatory File</h1>
        <button className="bg-blue-400 text-white px-3 py-1 rounded-full">+</button>
      </div>
          <ul>
            {data.map((item) => (
              <li key={item.id} className="mb-2 flex items-center">
                <span className="mr-2">📄</span> {}
                <span
                  style={{
                    width: `${longestName.length}ch`,
                    display: "inline-block",
                  }}
                  className="mr-4"
                >
                  {item.name}
                </span>
                <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={openModal}
                      className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      ✏️
                    </button>
                  </div>
                <>
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={openModal}
                      className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      ❌
                    </button>
                  </div>

                  <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-10"
                      onClose={closeModal}
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
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                              <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                              >
                                Delete {item.name}
                              </Dialog.Title>
                              <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                  Are you sure want to delete this file?
                                </p>
                              </div>

                              <div className="mt-4 flex w-full gap-4">
                                <button
                                  type="button"
                                  className="inline-flex basis-1/2 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                  onClick={closeModal}
                                >
                                  Yes
                                </button>
                                <button
                                  type="button"
                                  className="inline-flex basis-1/2 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                  onClick={closeModal}
                                >
                                  No
                                </button>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition>
                </>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex basis-1/2 flex-col gap-4">
        <Service />

        <Category />
      </div>
    </main>
  );
};

export default MasterData;
