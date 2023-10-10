import React, { Fragment, useState } from "react";
// import { Fragment, useState } from "react";
// import { iListMandatoryFile, iMandatoryFile } from "./interface";
import { Dialog, Transition } from "@headlessui/react";
import { iBusiness } from "../interface";

interface iProps {
  initialData: iBusiness[];
}

export default function Category({}: iProps) {
  const [showForm, setShowForm] = useState(false);

  const [modal, setModal] = useState({
    delete: false,
    add: false,
  });

  return (
    <section className="basis-1/2 rounded-3xl bg-base-200 p-10 shadow-2xl">
      <div className="flex items-center justify-between pb-2">
        <h1 className="mb-4 text-xl font-bold text-blue-400">
          Business Category
        </h1>
        <button
          className="rounded-full bg-blue-400 px-3 py-1 text-white"
          onClick={() => {
            setModal({ ...modal, add: true });
          }}
        >
          +
        </button>
      </div>
      {/* {showForm && (
        
      )} */}
      <div className="group badge badge-outline relative hover:text-transparent">
        Government Agency
        <button
          className="absolute inset-0 flex h-full w-full items-center justify-center rounded-2xl border border-gray-300 text-xs text-gray-600 opacity-0 group-hover:opacity-100"
          onClick={() => {
            setModal({ ...modal, delete: true });
          }}
        >
          x
        </button>
      </div>
      <div className="group badge badge-primary badge-outline relative hover:text-transparent">
        Fund Service
        <button
          className="absolute inset-0 flex h-full w-full items-center justify-center rounded-2xl border border-blue-500 text-xs text-blue-500 opacity-0 group-hover:opacity-100"
          onClick={() => {
            setModal({ ...modal, delete: true });
          }}
        >
          x
        </button>
      </div>
      <div className="group badge badge-secondary badge-outline relative hover:text-transparent">
        Core
        <button
          className="absolute inset-0 flex h-full w-full items-center justify-center rounded-2xl border border-gray-500 text-xs text-gray-500 opacity-0 group-hover:opacity-100"
          onClick={() => {
            setModal({ ...modal, delete: true });
          }}
        >
          x
        </button>
      </div>
      <div className="group badge badge-accent badge-outline relative hover:text-transparent">
        Custody
        <button
          className="absolute inset-0 flex h-full w-full items-center justify-center rounded-2xl border border-red-500 text-xs text-red-500 opacity-0 group-hover:opacity-100"
          onClick={() => {
            setModal({ ...modal, delete: true });
          }}
        >
          x
        </button>
      </div>

      {/* Add Modal */}
      <Transition appear show={modal.add} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setModal({ ...modal, add: false });
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
                    Add
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <form className="mt-4">
                        <div className="mb-3">
                          <label className="mb-2 block text-sm font-bold">
                            Business Category Name:
                          </label>
                          <input
                            type="text"
                            className="w-full rounded border p-2 text-sm"
                            placeholder="Enter business category name"
                          />
                        </div>
                      </form>
                    </p>
                  </div>

                  <div className="mt-4 flex w-full gap-4">
                    <button
                      type="button"
                      className="inline-flex basis-1/2 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setModal({ ...modal, add: false });
                        window.alert("Berhasil menambahkan business category!");
                      }}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="inline-flex basis-1/2 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setModal({ ...modal, add: false });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Delete Modal */}
      <Transition appear show={modal.delete} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setModal({ ...modal, delete: false });
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
                    Delete
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure want to delete this Category?
                    </p>
                  </div>

                  <div className="mt-4 flex w-full gap-4">
                    <button
                      type="button"
                      className="inline-flex basis-1/2 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setModal({ ...modal, delete: false });
                        window.alert("Berhasil menghapus business category!");
                      }}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="inline-flex basis-1/2 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setModal({ ...modal, delete: false });
                      }}
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
    </section>
  );
}
