"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { iListMandatoryFile, iMandatoryFile } from "../interface";
import toast, { Toaster } from "react-hot-toast";

interface iProps {
  initialData: iListMandatoryFile;
}

export default function MandatoryFile({ initialData }: iProps) {
  const [data, setData] = useState<iListMandatoryFile>(initialData || []);
  const [modal, setModal] = useState({
    edit: false,
    delete: false,
    add: false,
  });

  const initialSelectedMandatory: iMandatoryFile = { id: 0, name: "" };
  const [selectedData, setSelectedData] = useState(initialSelectedMandatory);
  const [form, setForm] = useState("");

  /**
   * Functional
   */

  const handleAdd = async () => {
    const toastId = toast.loading("Creating...");

    fetch("https://bnicstdy-b41ad9b84aff.herokuapp.com/master-data/mandatory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const error = await response.json();
          toast.error("Failed add mandatory", { id: toastId });
        }

        toast.success("Success add mandatory", { id: toastId });
        const res = await response.json();
        const ids = res.data.id;
        console.log(ids);
        setData([...data, { id: ids.id, name: form }]);
        setForm("");
        setModal({ ...modal, add: false });
      })
      .catch((error) => {
        toast.error(error.message, { id: toastId });
      });
  };

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting...");
    const selected = await selectedData;
    fetch(
      `https://bnicstdy-b41ad9b84aff.herokuapp.com/master-data/mandatory/${selected.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then(async (response) => {
        if (!response.ok) {
          const error = await response.json();
          toast.error("Failed delete mandatory", { id: toastId });
        }

        toast.success("Success delete mandatory", { id: toastId });
        let now = data.filter((ctx) => ctx.id !== selected.id);
        setData(now);
        setModal({ ...modal, delete: false });
      })
      .catch((error) => {
        toast.error(error.message, { id: toastId });
      });
  };

  const handleEdit = async () => {
    // const toastId = toast.loading("Deleting...");
    // const selected = await selectedData;
    // fetch(
    //   `https://bnicstdy-b41ad9b84aff.herokuapp.com/master-data/mandatory/${selected.id}`,
    //   {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   },
    // )
    //   .then(async (response) => {
    //     if (!response.ok) {
    //       const error = await response.json();
    //       toast.error("Failed delete mandatory", { id: toastId });
    //     }
    //     toast.success("Success delete mandatory", { id: toastId });
    //     let now = data.filter((ctx) => ctx.id !== selected.id);
    //     setData(now);
    //     setModal({ ...modal, delete: false });
    //   })
    //   .catch((error) => {
    //     toast.error(error.message, { id: toastId });
    //   });
  };

  return (
    <div className="basis-1/2">
      <div className="h-full w-full rounded-3xl bg-base-200 p-10 shadow-2xl">
        <div className="flex items-center justify-between pb-2">
          <h1 className="mb-4 text-xl font-bold text-blue-400">
            Mandatory File Category
          </h1>
          <button
            type="button"
            onClick={() => {
              setModal({ ...modal, add: true });
            }}
            className="rounded-full bg-blue-400 px-3 py-1 text-white"
          >
            +
          </button>
        </div>
        <ul>
          {data.map((item) => (
            <li
              key={item.id}
              className="mb-2 flex w-full items-center justify-between"
            >
              <div className="flex">
                <span className="mr-2">📄</span> {}
                <span className="mr-4 flex justify-start">{item.name}</span>
              </div>
              <div className="flex items-end justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setModal({ ...modal, edit: true });
                    setSelectedData(item);
                  }}
                  className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  ✏️
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setModal({ ...modal, delete: true });
                    setSelectedData(item);
                  }}
                  className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  ❌
                </button>
              </div>
              <></>
            </li>
          ))}
        </ul>
      </div>

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
                    Delete {selectedData.name}
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
                      onClick={handleDelete}
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

      {/* Edit Modal */}
      <Transition appear show={modal.edit} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setModal({ ...modal, edit: false });
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
                    Edit {selectedData.name}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <form className="mt-4">
                        <div className="mb-3">
                          <label className="mb-2 block text-sm font-bold">
                            Mandatory File Name:
                          </label>
                          <input
                            type="text"
                            className="w-full rounded border p-2 text-sm"
                            placeholder="Enter mandatory file name"
                            onChange={(e) => {
                              setForm(e.target.value);
                            }}
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
                        setModal({ ...modal, edit: false });
                        window.alert("Berhasil mengubah mandatory file!");
                      }}
                    >
                      Done
                    </button>
                    <button
                      type="button"
                      className="inline-flex basis-1/2 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setModal({ ...modal, edit: false });
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
                    Add Mandatory File
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <form className="mt-4">
                        <div className="mb-3">
                          <label className="mb-2 block text-sm font-bold">
                            Mandatory File Name:
                          </label>
                          <input
                            type="text"
                            className="w-full rounded border p-2 text-sm"
                            placeholder="Enter mandatory file name"
                            onChange={(e) => {
                              setForm(e.target.value);
                            }}
                          />
                        </div>
                      </form>
                    </p>
                  </div>

                  <div className="mt-4 flex w-full gap-4">
                    <button
                      type="button"
                      className="inline-flex basis-1/2 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleAdd}
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
    </div>
  );
}
