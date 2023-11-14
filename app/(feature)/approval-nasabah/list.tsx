"use client";
// import { Metadata } from "next";
import { Fragment, useState, useEffect, useMemo } from "react";
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
import { iCustomer } from "../../types/types";

export default function ListApproval() {
  /**
   * States
   */
  const [customer, setCustomer] = useState<iCustomer[]>([]);
  const [open, setOpen] = useState({
    accept: false,
    reject: false,
    detail: false,
  });
  const [cookies, setCookie, removeCookie] = useCookies();
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<iCustomer>({
    id: 0,
    name: "",
    business_category: "",
    service: "",
    email: "",
    expiry_date: "",
    comment: ""
  })

  /**
   * Functions
   */
  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/database/approval/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.token,
        },
      });

      if (!response.ok) {
        console.error("Error fetching approval", "Network response was not ok");
      }

      const res = await response.json();
      const cust = res.data.customers;
      setCustomer(cust);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching approval:", error);
    }
  };

  const handleApprove = async () => {
    if (!selected.comment) {
      toast.error("Please fill all form.");
      return;
    }

    const payload = JSON.stringify({
      comment: selected.comment,
      status: 2
    });
    setLoading(true);

    const postForm = fetch(
      // "https://bnicstdy-b41ad9b84aff.herokuapp.com/announcement",
      `http://127.0.0.1:8000/database/approval/${selected.id}`,
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
        setOpen({ ...open, accept: false });
        let newList = customer.filter((item)=>item.id !== selected.id)
        setCustomer(newList)
        setSelected({
          id: 0,
          name: "",
          business_category: "",
          service: "",
          email: "",
          expiry_date: "",
          comment: ""
        });
      } else {
        throw new Error("Failed Create Audit");
      }
    });
    toast.promise(postForm, {
      loading: "Updating nasabah ...",
      success: "Nasabah has been aproved",
      error: "Failed approving nasabah",
    });

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleReject = async () => {
    if (!selected.comment) {
      toast.error("Please fill all form.");
      return;
    }

    const payload = JSON.stringify({
      comment: selected.comment,
      status: 1
    });
    setLoading(true);

    const postForm = fetch(
      // "https://bnicstdy-b41ad9b84aff.herokuapp.com/announcement",
      `http://127.0.0.1:8000/database/approval/${selected.id}`,
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
        setOpen({ ...open, accept: false });
        let outlist = customer.filter((item)=> item.id !== selected.id)
        outlist.push({...selected, status:1})
        setCustomer(outlist)
        setSelected({
          id: 0,
          name: "",
          business_category: "",
          service: "",
          email: "",
          expiry_date: "",
          comment: ""
        });
      } else {
        throw new Error("Failed Create Audit");
      }
    });
    toast.promise(postForm, {
      loading: "Updating nasabah ...",
      success: "Nasabah has been aproved",
      error: "Failed approving nasabah",
    });

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };


  /**
   * Use Effect
   */
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Tables
   */

  const columns = useMemo<MRT_ColumnDef<iCustomer>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        enableEditing: false,
      },
      {
        header: "Status",
        accessorKey: "status",
        enableEditing: false,
        Cell: ({ cell, row, table }) => {
          const current: any = table.getRow(row.id).original;

          if (current.status === 0) {
            return (
              <div>
                <p className="font-bold text-yellow-500">Pending</p>
              </div>
            );
          }

          if (current.status === 1) {
            return (
              <div>
                <p className="font-bold text-red-500">Denied</p>
              </div>
            );
          }

          if (current.status === 2) {
            return (
              <div>
                <p className="font-bold text-green-500">Approved</p>
              </div>
            );
          }
        },
        minSize: 10, //min size enforced during resizing
        maxSize: 30,
      },
      {
        header: "Business ",
        accessorKey: "business_category",
      },
      {
        header: "Service ",
        accessorKey: "service",
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data: customer,
    state: { isLoading: loading },
    createDisplayMode: "row",
    editDisplayMode: "cell",
    enableRowActions: true,
    positionActionsColumn: "last",
    initialState: { showColumnFilters: true, showGlobalFilter: true },
    mantineTableBodyRowProps: ({ row, table }) => ({
      sx: {
        cursor: "pointer", //you might want to change the cursor too when adding an onClick
      },
      onDoubleClick: (event:any) => {
        const current = table.getRow(row.id).original;
        setSelected({...selected, ...current})
        setOpen({...open, detail:true})
      },
    }),

    renderRowActions: ({ row, table }) => (
      <>
        <Flex gap="md">
          <Tooltip label="Approve">
            <ActionIcon
              color="green"
              onClick={() => {
                const current = table.getRow(row.id).original;
                setSelected({...selected, ...current})
                setOpen({...open, accept: true});
              }}
            >
              <Iconify icon="ic:round-check" className="text-2xl" />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Reject">
            <ActionIcon
              color="red"
              onClick={() => {
                const current = table.getRow(row.id).original;
                setSelected({...selected, ...current})
                setOpen({...open, reject: true});
              }}
            >
              <Iconify icon="system-uicons:cross" className="text-2xl" />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </>
    ),
  });
  return (
    <>
      <MantineReactTable table={table} />
      <div>
        <Toaster />
      </div>

      <Transition appear show={open.detail} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setOpen({ ...open, detail: false });
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
            <div className="fixed inset-0 bg-black/25" />
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
                  <div className="">
                    <div className="nama flex flex-col">
                      <p>Nama : {selected.name}</p>
                      <p>Status : {selected.status}</p>
                    </div>
                    <div className="alamat flex flex-col">
                      <p>Bisnis: {selected.business_category}</p>
                      <p>Service: {selected.service}</p>
                    </div>

                    <br/>
                    <div className="alamat flex flex-col">
                      <p>Comment:</p>
                      <p>{selected.comment}</p>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              {/* batas bawah */}
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Accept Modal */}
      <Transition appear show={open.accept} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setOpen({ ...open, accept: false });
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
            <div className="flex min-h-full items-center justify-center p-4 text-left">
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
                    Accept Nasabah
                  </Dialog.Title>
                  <div className="mt-4">
                    <textarea
                      id="announcementDesc"
                      className="h-40 w-full rounded-md border bg-base-100 p-2"
                      placeholder="Enter your comment"
                      value={selected.comment}
                      onChange={(e) =>
                         setSelected({...selected, comment: e.target.value})
                      }
                    ></textarea>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <button
                      type="submit"
                      className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200"
                      onClick={() => {
                          handleApprove();
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Reject Modal */}
      <Transition appear show={open.reject} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setOpen({ ...open, reject: false });
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
            <div className="flex min-h-full items-center justify-center p-4 text-left">
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
                    Reject Nasabah
                  </Dialog.Title>
                  <div className="mt-4">
                    <textarea
                      id="announcementDesc"
                      className="h-40 w-full rounded-md border bg-base-100 p-2"
                      placeholder="Enter your comment"
                      value={selected.comment}
                      onChange={(e) =>
                        setSelected({...selected, comment: e.target.value})
                     }
                    ></textarea>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <button
                      type="submit"
                      className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200"
                      onClick={() => {
                          handleReject();
                      }}
                    >
                      Submit
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
