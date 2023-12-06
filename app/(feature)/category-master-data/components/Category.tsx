"use client";
import React, { Fragment, useState } from "react";
// import { Fragment, useState } from "react";
// import { iListMandatoryFile, iMandatoryFile } from "./interface";
import { Dialog, Transition } from "@headlessui/react";
import { iBusiness } from "../interface";
import toast, { Toaster } from "react-hot-toast";

interface iProps {
  initialData: iBusiness[];
}

export default function Category({ initialData }: iProps) {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState<iBusiness[]>(initialData);
  const [form, setForm] = useState("");
  const [selectedData, setSelectedData] = useState<iBusiness>({
    id: 0,
    name: "",
  });

  const handleAdd = async () => {
    if (form === "") {
      toast.error("Please fill the field");
      return;
    }

    const toastId = toast.loading("Creating...");

    fetch(`http://bnicustody.site:8000/master-data/business`, {
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
          toast.error("Failed add business category", { id: toastId });
        }

        toast.success("Success add business category", { id: toastId });
        const res = await response.json();
        const ids = res.data.id;
        setData([...data, { id: ids, name: form }]);
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
      `http://bnicustody.site:8000/master-data/business/${selected.id}`,
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
          toast.error("Failed delete business category", { id: toastId });
        }

        toast.success("Success delete business category", { id: toastId });
        let now = data.filter((ctx) => ctx.id !== selected.id);
        setData(now);
        setModal({ ...modal, delete: false });
      })
      .catch((error) => {
        toast.error(error.message, { id: toastId });
      });
  };

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

      {data.map((ctx: iBusiness, index: number) => {
        return (
          <div
            className="group badge badge-outline relative hover:text-transparent"
            key={index}
          >
            {ctx.name}
            <button
              className="absolute inset-0 flex h-full w-full items-center justify-center rounded-2xl border border-gray-300 text-xs text-gray-600 opacity-0 group-hover:opacity-100"
              onClick={() => {
                setModal({ ...modal, delete: true });
                setSelectedData(ctx);
              }}
            >
              x
            </button>
          </div>
        );
      })}

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
    </section>
  );
}
