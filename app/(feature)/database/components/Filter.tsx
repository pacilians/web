"use client";

import { Metadata } from "next";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export const metadata: Metadata = {
  title: "Database | BNI Custody System",
  description: "",
};

export default function Filter() {
  let [isOpen, setIsOpen] = useState(false);

  function closeFilter() {
    setIsOpen(false);
  }

  function openFilter() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openFilter}
          className="text-base-content"
        >
          Filter
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeFilter}>
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <main>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="flex flex-col ">
                        <div className="flex flex-col">
                          <div className="px-3 text-justify">
                            <h3 className="p-5 text-lg font-bold">Category</h3>
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              value=""
                            />
                            <label
                              htmlFor="default-checkbox"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Insurance
                            </label>
                          </div>

                          <div className="px-3 text-justify">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              value=""
                            />
                            <label
                              htmlFor="default-checkbox"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Asset
                            </label>
                          </div>

                          <div className="px-3 text-justify">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              value=""
                            />
                            <label
                              htmlFor="default-checkbox"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Management
                            </label>
                          </div>

                          <div className="px-3 text-justify">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              value=""
                            />
                            <label
                              htmlFor="default-checkbox"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Security
                            </label>
                          </div>

                          <div className="px-3 text-justify">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              value=""
                            />
                            <label
                              htmlFor="default-checkbox"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Individual
                            </label>
                          </div>

                          <div className="px-3 text-justify">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              value=""
                            />
                            <label
                              htmlFor="default-checkbox"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Bank
                            </label>
                          </div>

                          <div className="px-3 text-justify">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              value=""
                            />
                            <label
                              htmlFor="default-checkbox"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Pension Fund
                            </label>
                          </div>

                          <div className="px-3 text-justify">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              value=""
                            />
                            <label
                              htmlFor="default-checkbox"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Foundation
                            </label>
                          </div>

                          <div className="px-3 text-justify">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              value=""
                            />
                            <label
                              htmlFor="default-checkbox"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Overseas
                            </label>
                          </div>

                          <div className="px-3 text-justify">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              value=""
                            />
                            <label
                              htmlFor="default-checkbox"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Government Agency
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col ">
                        <div className="flex flex-col">
                          <div className="px-3 text-justify">
                            <h3 className="p-5 text-lg font-bold">Core</h3>
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              value=""
                            />
                            <label
                              htmlFor="default-checkbox"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Core
                            </label>
                          </div>

                          <div className="px-3 text-justify">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              value=""
                            />
                            <label
                              htmlFor="default-checkbox"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Custody
                            </label>
                          </div>

                          <div className="px-3 text-justify">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              value=""
                            />
                            <label
                              htmlFor="default-checkbox"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Trustee
                            </label>
                          </div>

                          <div className="px-3 text-justify">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              value=""
                            />
                            <label
                              htmlFor="default-checkbox"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Government Agency
                            </label>
                          </div>

                          <div className="px-3 text-justify">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              value=""
                            />
                            <label
                              htmlFor="default-checkbox"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Fund Service
                            </label>
                          </div>

                          <div className="px-3 text-justify">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              value=""
                            />
                            <label
                              htmlFor="default-checkbox"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Wali Amanat
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </main>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeFilter}
                    >
                      Done
                    </button>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
