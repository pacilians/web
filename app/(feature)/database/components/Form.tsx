"use client";

import { Metadata } from "next";
import { AiOutlineSearch } from "react-icons/ai";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export const metadata: Metadata = {
  title: "Database | BNI Custody System",
  description: "",
};

export default function Form() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-lg bg-base-200 px-8 py-2 text-base-content hover:opacity-50"
        >
          Add
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <main className="w-full grow rounded-tl-3xl bg-base-backdrop-200 p-10 shadow-2xl">
                    <div className="w-1/2 rounded-lg bg-[#D9D9D9] px-5 py-5">
                      <h2 className="text-center text-xl font-bold">
                        Add Nasabah
                      </h2>
                      <h3 className="p-5 text-lg font-bold">Company</h3>

                      <div className="grid grid-cols-2 place-content-center gap-5">
                        <div className="flex flex-row py-3">
                          <div className="flex items-center px-4">
                            Company Name
                          </div>
                          <div className="flex items-center px-4">
                            <input
                              type="text"
                              className="rounded-lg"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div className="flex flex-row py-3">
                          <div className="flex items-center px-4">DOE</div>
                          <div className="flex items-center px-4">
                            <input
                              type="text"
                              className="rounded-lg"
                              placeholder=""
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row py-3">
                        <div className="flex items-center px-4">Address</div>
                        <div className="flex items-center px-4">
                          <input
                            type="text"
                            className="rounded-lg"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-5">
                        <div className="flex flex-row py-3">
                          <div className="flex items-center px-4">Service</div>
                          <div className="flex items-center px-4">
                            <input
                              type="text"
                              className="rounded-lg"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div className="flex flex-row py-3">
                          <div className="flex items-center px-4">Category</div>
                          <div className="flex items-center px-4">
                            <input
                              type="text"
                              className="rounded-lg"
                              placeholder=""
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center px-4 py-3">
                        <button className="w-[75%] rounded-lg  bg-[#9C9697] px-8 py-2 text-[#575152] hover:opacity-50 ">
                          Add
                        </button>
                      </div>

                      <h3 className="p-5 text-lg font-bold">Key Person</h3>

                      <div className="grid grid-cols-2 gap-5">
                        <div className="flex flex-row py-3">
                          <div className="flex items-center px-4">Name</div>
                          <div className="flex items-center px-4">
                            <input
                              type="text"
                              className="rounded-lg"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div className="flex flex-row py-3">
                          <div className="flex items-center px-4">DOB</div>
                          <div className="flex items-center px-4">
                            <input
                              type="text"
                              className="rounded-lg"
                              placeholder=""
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row py-3">
                        <div className="flex items-center px-4">Phone</div>
                        <div className="flex items-center px-4">
                          <input
                            type="text"
                            className="rounded-lg"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>
                  </main>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
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
