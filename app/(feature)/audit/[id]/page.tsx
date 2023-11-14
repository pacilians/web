"use client";

import { Audit, AuditEvent } from "../../../types/types";
import React, { useState, useEffect, Fragment, useMemo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { usePathname, useRouter } from "next/navigation";
import {
  MantineReactTable,
  useMantineReactTable,
  MRT_TableOptions,
  type MRT_ColumnDef,
} from "mantine-react-table";
import Iconify from "@components/Iconify";
import { ActionIcon, Button, Flex, Text, Tooltip } from "@mantine/core";

const Status = ["Open", "On Review", "Approve"];

export default function DetailAudit() {
  /**
   * States
   */
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const pathname = usePathname();
  const [open, setOpen] = useState({
    item: false,
    file: false,
    delete: false,
  });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AuditEvent>({
    name: "None",
    start: "None",
    end: "None",
    audit: [],
  });
  const [audit, setAudit] = useState<Audit[]>([]);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [form, setForm] = useState<Audit>({
    id: 0,
    name: "",
    status: "",
  });
  const path = pathname.split("/");
  const id = path[path.length - 1];

  /**
   * Function
   */
  const handleFetch = async () => {
    try {
      const response = await fetch(
        // `https://bnicstdy-b41ad9b84aff.herokuapp.com/audit/`,
        `http://127.0.0.1:8000/audit/event/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: cookies.token,
          },
        },
      );

      if (!response.ok) {
        console.error("Error fetching id:", "Network response was not ok");
      }

      const res = await response.json();
      const data = res.data.audit;
      setData(data);
      setAudit(data.audit);
      setLoading(!loading);
    } catch (error) {
      console.error("Error fetching Audit:", error);
    }
  };
  const handleAddAudit = () => {
    if (form.name === "") {
      toast.error("Please fill all form.");
      return;
    }

    const payload = JSON.stringify({
      name: form.name,
      id_audit_event: id,
      status: "Open",
    });
    setLoading(true);

    const postForm = fetch(
      // "https://bnicstdy-b41ad9b84aff.herokuapp.com/announcement",
      "http://127.0.0.1:8000/audit/item",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.token,
        },
        body: payload,
      },
    ).then(async (response) => {
      if (response.status === 200) {
        const res = await response.json();
        const newAudit = res.data.audit;
        setOpen({ ...open, item: false });
        setAudit([...audit, { ...newAudit, file: null }]);
        setForm({
          id: 0,
          name: "",
          status: "",
        });
      } else {
        throw new Error("Failed Create Audit");
      }
    });
    toast.promise(postForm, {
      loading: "Creating audit...",
      success: "Audit has been created",
      error: "Failed creating audit",
    });

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleUpdateStatus = async (status: any, id: any) => {
    const payload = JSON.stringify({
      status: status,
    });
    setLoading(true);

    const postForm = fetch(
      // "https://bnicstdy-b41ad9b84aff.herokuapp.com/announcement",
      `http://127.0.0.1:8000/audit/item/status/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.token,
        },
        body: payload,
      },
    ).then(async (response) => {
      if (response.status === 200) {
        const res = await response.json();
        setValidationErrors({});
      } else {
        throw new Error("Failed Create Audit");
      }
    });
    toast.promise(postForm, {
      loading: "Updating audit...",
      success: "Audit has been updated",
      error: "Failed updating audit",
    });

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    table.setEditingRow(null); //exit editing mode
  };

  const handleDelete = async () => {
    setLoading(true);
    const postForm = fetch(
      // "https://bnicstdy-b41ad9b84aff.herokuapp.com/announcement",
      `http://127.0.0.1:8000/audit/item/${form.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.token,
        },
      },
    ).then(async (response) => {
      if (response.status === 200) {
        setOpen({ ...open, delete: false });
        let newList = audit.filter((ctx) => ctx.id !== form.id);
        setAudit(newList);
        setForm({
          id: 0,
          name: "",
          status: "",
        });
      } else {
        throw new Error("Failed Delete Audit");
      }
    });
    toast.promise(postForm, {
      loading: "Deleting audit...",
      success: "Audit has been deleted",
      error: "Failed delete audit",
    });

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleUploadFile = async (file: any) => {
    const formData = new FormData();
    console.log("FIle:", file);
    formData.append("file", file, "a.pdf");
    setLoading(true);

    const postForm = fetch(
      // "https://bnicstdy-b41ad9b84aff.herokuapp.com/audit/item/status/${id}",
      `http://127.0.0.1:8000/audit/item/file/${form.id}`,
      {
        method: "PUT",
        body: formData,
        redirect: "follow",
      },
    ).then(async (response) => {
      if (response.status === 200) {
        const res = await response.json();
        setValidationErrors({});
        let newList = audit.map((item) => {
          if (item.id === form.id) {
            item.file = {
              data: file,
            };
          }
          return item;
        });
        setAudit(newList);
        setForm({
          id: 0,
          name: "",
          status: "",
        });
      } else {
        throw new Error("Failed Upload File");
      }
    });
    toast.promise(postForm, {
      loading: "Uploading file...",
      success: "File has been uploaded",
      error: "Failed upload file",
    });

    setTimeout(() => {
      setLoading(false);
      setOpen({ ...open, file: false });
    }, 2000);
  };

  /**
   * UseEffect
   */
  useEffect(() => {
    handleFetch();
  }, []);

  /**
   * Table Specification
   */

  const columns = useMemo<MRT_ColumnDef<Audit>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        enableEditing: false,
      },
      {
        header: "Status",
        accessorKey: "status",
        editVariant: "select",
        mantineEditSelectProps: ({ row, table }) => ({
          data: Status,
          onChange: (value: any) => {
            const current = table.getRow(row.id).original;
            setTimeout(() => {
              handleUpdateStatus(value, current.id);
            }, 2000);
          },
        }),
      },
      {
        header: "File",
        accessorKey: "file",
        enableEditing: false,
        Cell: ({ cell, row, table }) => {
          const current: any = table.getRow(row.id).original;

          if (!current.file) {
            return (
              <div>
                <Iconify icon="bx:file" className="text-2xl" /> None
              </div>
            );
          } else {
            return (
              <div>
                <Iconify icon="bx:file" className="text-2xl" /> Available
              </div>
            );
          }
        },
        minSize: 50, //min size enforced during resizing
        maxSize: 100,
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data: audit,
    state: { isLoading: loading },
    createDisplayMode: "row",
    editDisplayMode: "cell",
    enableEditing: true,
    enableRowActions: true,
    positionActionsColumn: "last",
    initialState: { showColumnFilters: true, showGlobalFilter: true },
    mantineTableBodyRowProps: ({ row, table }) => ({
      sx: {
        cursor: "pointer", //you might want to change the cursor too when adding an onClick
      },
    }),
    renderRowActions: ({ row, table }) => (
      <>
        <Flex gap="md">
          <Tooltip label="Delete">
            <ActionIcon
              color="red"
              onClick={() => {
                const current: any = table.getRow(row.id).original;
                setForm(current);
                setOpen({ ...open, delete: true });
              }}
            >
              <Iconify
                icon="material-symbols-light:delete-outline"
                className="text-2xl"
              />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Upload">
            <ActionIcon
              color="green"
              onClick={() => {
                const current = table.getRow(row.id).original;
                console.log(current);
                setForm({
                  id: current.id,
                  name: current.name,
                  status: "",
                });
                setOpen({ ...open, file: true });
              }}
            >
              <Iconify
                icon="material-symbols-light:upload-sharp"
                className="text-2xl"
              />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Download">
            <ActionIcon
              color="blue"
              onClick={() => {
                const current = table.getRow(row.id).original;

                if (!current.file) {
                  toast.error("No file available");
                  return;
                }

                const bufferData = new Uint8Array(current.file.data);

                const fileName = current.name + ".pdf";
                const fileType = "pdf";

                const blob = new Blob([bufferData], { type: fileType });
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                return () => {
                  URL.revokeObjectURL(link.href);
                };
              }}
            >
              <Iconify
                icon="material-symbols-light:download-sharp"
                className="text-2xl"
              />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </>
    ),
  });
  return (
    <main className="w-full grow rounded-tl-3xl bg-base-backdrop-200 p-10 shadow-2xl">
      {/* Audit Detail */}
      {/* <div className="">
        <p><span className="bold">Name</span> : {audit.name}</p>
        <p>Start : {audit.start}</p>
        <p>End : {audit.end}</p>
      </div> */}
      <div className="mb-5 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 text-white shadow-lg">
        <div className="mb-4">
          <p className="text-lg font-bold">Audit Details</p>
          <p>
            <span className="font-bold">Name</span>: {data.name}
          </p>
          <p>
            <span className="font-bold">Start</span>: {data.start}
          </p>
          <p>
            <span className="font-bold">End</span>: {data.end}
          </p>
        </div>
        {/* Additional content or styling can be added here */}
      </div>

      {/* Audit List */}
      <div className="mb-5 flex justify-end">
        <button
          type="button"
          onClick={() => {
            setOpen({ ...open, item: true });
          }}
          className="rounded-10 flex h-12 items-center justify-end bg-[#E55300] p-5 text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Add Item
        </button>
      </div>
      <MantineReactTable table={table} />

      {/* Modal for Audit */}

      <form>
        <Transition appear show={open.item} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => {
              setOpen({ ...open, item: false });
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-base-100 p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-base text-lg font-bold leading-6 "
                    >
                      Add Audit
                    </Dialog.Title>
                    <div className="mt-4">
                      <label
                        className="mb-2 block text-base text-sm font-semibold"
                        htmlFor="announcement"
                      >
                        Name
                      </label>
                      <input
                        id="announcement"
                        type="text"
                        className="w-full rounded-md border bg-base-100 p-2"
                        placeholder="Enter item name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="mt-6 flex justify-center">
                      <button
                        type="submit"
                        className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200"
                        onClick={() => {
                          handleAddAudit();
                        }}
                      >
                        Post Event
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </form>

      {/* Modal for File */}
      <form>
        <Transition appear show={open.file} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => {
              setOpen({ ...open, file: false });
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-base-100 p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-base text-lg font-bold leading-6 "
                    >
                      Upload File
                    </Dialog.Title>
                    <div className="mt-4">
                      <label
                        className="mb-2 block text-base text-sm font-semibold"
                        htmlFor="file"
                      >
                        file
                      </label>
                      <input
                        id="file"
                        type="file"
                        className="w-full rounded-md border bg-base-100 p-2"
                        placeholder="Enter item name"
                        onChange={(e) => {
                          if (!e.target.files) return;
                          const file = e.target.files[0];
                          console.log(e.target.files);
                          handleUploadFile(file);
                        }}
                      />
                    </div>
                    <div className="mt-6 flex justify-center"></div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </form>

      {/* Modal for Delete */}
      <form>
        <Transition appear show={open.delete} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => {
              setOpen({ ...open, delete: false });
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-base-100 p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Description
                      as="h3"
                      className="text-base text-lg font-bold leading-6 "
                    >
                      Are you sure want to delete item
                    </Dialog.Description>

                    <div className="mt-6 flex justify-center">
                      <button
                        type="submit"
                        className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200"
                        onClick={() => {
                          handleDelete();
                        }}
                      >
                        Delete Event
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </form>
      <Toaster />
    </main>
  );
}
