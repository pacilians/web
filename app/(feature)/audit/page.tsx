"use client";
// import { Metadata } from "next";
import { Audit, AuditEvent } from "../../types/types";
import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition, Disclosure } from "@headlessui/react";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  MantineReactTable,
  useMantineReactTable,
  MRT_TableOptions,
  type MRT_ColumnDef,
} from "mantine-react-table";
import Iconify from "@components/Iconify";
import { ActionIcon, Button, Flex, Text, Tooltip } from "@mantine/core";

// export const metadata: Metadata = {
//   title: "Announcement | BNI Custody System",
//   description: "",
// };

export default function ListAudit() {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState({
    add: false,
    delete: false,
  });
  const [load, setLoad] = useState(true);

  const [audit, setAudit] = useState<AuditEvent[]>([]);
  const [formEvent, setFormEvent] = useState<AuditEvent>({
    id: null,
    created_at: null,
    name: "",
    start: null,
    end: null,
    audit: [],
  });
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleSubmit = async () => {
    if (formEvent.name === "" || !formEvent.start || !formEvent.end) {
      toast.error("Please fill all form.");
      return;
    }

    const payload = JSON.stringify({
      name: formEvent.name,
      start: formEvent.start,
      end: formEvent.end,
    });
    setLoad(true);

    const postForm = fetch(
      // "https://bnicstdy-b41ad9b84aff.herokuapp.com/announcement",
      "http://127.0.0.1:8000/audit/event",
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
        setOpen({ ...open, add: false });
        setAudit([...audit, newAudit]);
        setFormEvent({
          id: null,
          name: "",
          start: null,
          end: null,
          created_at: null,
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
      setLoad(false);
    }, 2000);
  };

  const handleDelete = async () => {
    setLoad(true);
    const postForm = fetch(
      // "https://bnicstdy-b41ad9b84aff.herokuapp.com/announcement",
      `http://127.0.0.1:8000/audit/event/${formEvent.id}`,
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
        let newList = audit.filter((ctx) => ctx.id !== formEvent.id);
        setAudit(newList);
        setFormEvent({
          id: null,
          name: "",
          start: null,
          end: null,
          created_at: null,
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
      setLoad(false);
    }, 2000);
  };

  const fetchAnnouncement = async () => {
    try {
      const response = await fetch(
        // `https://bnicstdy-b41ad9b84aff.herokuapp.com/audit/`,
        "http://127.0.0.1:8000/audit/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: cookies.token,
          },
        },
      );

      if (!response.ok) {
        console.error(
          "Error fetching announcement:",
          "Network response was not ok",
        );
      }

      const res = await response.json();
      const dat = res.data.audit;
      setAudit(dat);
      setLoad(!load);
    } catch (error) {
      console.error("Error fetching Audit:", error);
    }
  };

  const handleUpdate: MRT_TableOptions<AuditEvent>["onEditingRowSave"] =
    async ({ values, table, row }) => {
      const current = table.getRow(row.id).original;
      const payload = JSON.stringify({
        name: values.name,
        start: values.start,
        end: values.end,
      });
      setLoad(true);

      const postForm = fetch(
        // "https://bnicstdy-b41ad9b84aff.herokuapp.com/announcement",
        `http://127.0.0.1:8000/audit/event/${current.id}`,
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
          const newAudit = res.data.audit;
          const updatedList = audit.map((item) => {
            if (item.id === current.id) {
              return {
                ...values,
              };
            }
            return item;
          });
          setAudit(updatedList);
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
        setLoad(false);
      }, 2000);

      table.setEditingRow(null); //exit editing mode
    };

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  const columns = useMemo<MRT_ColumnDef<AuditEvent>[]>(
    () => [
      {
        header: "Event",
        accessorKey: "name",
        mantineEditTextInputProps: {
          type: "text",
          required: true,
          error: validationErrors?.name,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
        },
      },
      {
        header: "Start",
        accessorKey: "start",
        enableEditing: false,
        mantineFilterDateInputProps: {
          type: "date",
          required: true,
          error: validationErrors?.start,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              start: undefined,
            }),
        },
      },
      {
        header: "End",
        accessorKey: "end",
        enableEditing: false,
      },
    ],
    [validationErrors],
  );

  const table = useMantineReactTable({
    columns,
    data: audit,
    state: { isLoading: load },
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    enableRowActions: true,
    positionActionsColumn: "last",
    initialState: { showColumnFilters: true, showGlobalFilter: true },
    mantineTableBodyRowProps: ({ row, table }) => ({
      onDoubleClick: (event) => {
        const current = table.getRow(row.id).original;
        router.push(`${pathname}/${current.id}`);
      },
      sx: {
        cursor: "pointer", //you might want to change the cursor too when adding an onClick
      },
    }),
    renderRowActions: ({ row, table }) => (
      <>
        <Flex gap="md">
          <Tooltip label="Edit">
            <ActionIcon onClick={() => table.setEditingRow(row)}>
              <Iconify
                icon="material-symbols-light:edit-outline"
                className="text-2xl"
              />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Delete">
            <ActionIcon
              color="red"
              onClick={() => {
                const current = table.getRow(row.id).original;
                setFormEvent(current);
                setOpen({ ...open, delete: true });
              }}
            >
              <Iconify
                icon="material-symbols-light:delete-outline"
                className="text-2xl"
              />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </>
    ),
    onEditingRowSave: handleUpdate,
  });
  return (
    <main className="w-full grow rounded-tl-3xl bg-base-backdrop-200 p-10 shadow-2xl">
      <React.Fragment>
        <div className="mb-5">
          <button
            type="button"
            onClick={() => {
              setOpen({ ...open, add: true });
            }}
            className="rounded-10 flex h-12 items-center justify-center bg-[#E55300] p-5 text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Add Audit
          </button>
        </div>

        {/* Modal Add */}
        <form>
          <Transition appear show={open.add} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => {
                setOpen({ ...open, add: false });
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
                        Add Audit Event
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
                          placeholder="Enter your event name"
                          value={formEvent.name}
                          onChange={(e) =>
                            setFormEvent({ ...formEvent, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="mt-4">
                        <label
                          className="mb-2 block text-base text-sm font-semibold"
                          htmlFor="start"
                        >
                          Start
                        </label>
                        <input
                          className="focus:shadow-outline w-full appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                          id="npp"
                          type="date"
                          value={formEvent.start}
                          onChange={(e) =>
                            setFormEvent({
                              ...formEvent,
                              start: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="mt-4">
                        <label
                          className="mb-2 block text-base text-sm font-semibold"
                          htmlFor="start"
                        >
                          End
                        </label>
                        <input
                          className="focus:shadow-outline w-full appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                          id="npp"
                          type="date"
                          value={formEvent.end}
                          onChange={(e) =>
                            setFormEvent({
                              ...formEvent,
                              end: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="mt-6 flex justify-center">
                        <button
                          type="submit"
                          className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200"
                          onClick={() => {
                            handleSubmit();
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

        {/* Modal Delete */}
      </React.Fragment>

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
                      Are you sure want to delete event
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

      <div className="space-y-4">
        <MantineReactTable table={table} />
      </div>
      <Toaster />
    </main>
  );
}
