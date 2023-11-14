"use client";
// import { Metadata } from "next";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from '@headlessui/react'

import Iconify from "@components/Iconify";
import toast, { Toaster } from "react-hot-toast";

import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

interface Props {
    // initialData: any;
}

export default function listApproval() {
    let [isOpen, setIsOpen] = useState(false)
    let [isAccept, setIsAccept] = useState(false);
    let [isReject, setIsReject] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies();
    const [loader, setLoader] = useState({
        init: true,
        create: false,
    });
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    function openModalAccept() {
        setIsAccept(true);
    }
    function closeModalAccept() {
        setIsAccept(false);
    }
    function openModalReject() {
        setIsReject(true);
    }
    function closeModalReject() {
        setIsReject(false);
    }
    const fetchListApproved = async () => {
        try {
            const response = await fetch(
                `localhost:8000/database/approval/`,
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
            const ann = res.data.announcements;
            setLoader({ create: false, init: false });
        } catch (error) {
            console.error("Error fetching announcement:", error);
        }
    };
    return (
        <>
            <div>
                
                <div className="mt-2 flex w-full flex-row items-center justify-between rounded-md pb-5 shadow-sm">
                    <div className="w-[50%]">
                        <input
                            type="text"
                            className="block w-full max-w-[75%] rounded-lg border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-base-content focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                            placeholder="Search"
                        />
                    </div>

                    <div className=" flex flex-row gap-2">
                        <div className="flex flex-row">
                            <Iconify
                                icon="zondicons:filter"
                                className={`pr-2 text-4xl text-base-content-300 transition-transform duration-500`}
                            />
                            <button className="text-base-content">Filter</button>
                        </div>

                        <div className="flex flex-row">
                            <Iconify
                                icon="bx:sort"
                                className={`pr-2 text-4xl text-base-content-300 transition-transform duration-500`}
                            />
                            <button className="text-base-content">Sort</button>
                        </div>
                    </div>
                </div>
                <table className="w-full table-fixed">
                    <thead className="bg-base-200 text-base-content">
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Service</th>
                            <th>Category</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-500 bg-base-100 text-center text-base-content"
                    onClick={openModal}>
                        <tr className="hover:bg-slate-300 ">
                            <td>Hoyoverse</td>
                            <td>Pending</td>
                            <td>Core</td>
                            <td>Assett</td>
                            <td className="flex gap-x-10 justify-center items-center p-1">
                                <button
                                    type="button" className="h-10 w-10 bg-white flex items-center justify-center rounded-full text-3xl"
                                    onClick={(e) => {
                                        // console.log("tekan delete");
                                        e.stopPropagation();
                                        // handleDeleteAnnouncement();
                                        openModalAccept();
                                    }}
                                    >
                                    <Iconify
                                        icon="fluent-mdl2:accept-medium"

                                    />
                                </button>
                                <button
                                    type="button" className="h-10 w-10 bg-white flex items-center justify-center rounded-full text-3xl "
                                    onClick={(e) => {
                                        // console.log("tekan delete");
                                        e.stopPropagation();
                                        // handleDeleteAnnouncement();
                                        openModalReject();
                                    }}
                                    >
                                    <Iconify
                                        icon="ph:x-light"

                                    />
                                </button>
                            </td>
                            
                        </tr>

                    </tbody>
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
                                                    <p>Nama</p>
                                                    <p>Hoyoverse</p>
                                                </div>
                                                <div className="alamat flex flex-col">
                                                    <p>Address</p>
                                                    <p>Jakarta</p>
                                                </div>
                                            </div>
                                            {/* company */}
                                            {/* <div ">
                                                <div className="nama flex flex-col">
                                                    <p>Nama</p>
                                                    <p>Hoyoverse</p>
                                                </div>
                                                
                                                <div></div>
                                            </div>

                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={closeModal}
                                                >
                                                    Got it, thanks!
                                                </button>
                                            </div> */}
                                        </Dialog.Panel>
                                    </Transition.Child>
                                    {/* batas bawah */}
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </table>
            </div>
                <br />

                <div>
                    <Toaster />
            </div>
            <Transition appear show={isAccept} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModalAccept}>
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
                                            // value={form.content}
                                            // onChange={(e) =>
                                            //     setForm({ ...form, content: e.target.value })
                                            // }
                                        ></textarea>
                                    </div>

                                    <div className="mt-6 flex justify-center">
                                        <button
                                            type="submit"
                                            className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200"
                                            // onClick={() => {
                                            //     handleSubmit();
                                            // }}
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
            <Transition appear show={isReject} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModalReject}>
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
                                        // value={form.content}
                                        // onChange={(e) =>
                                        //     setForm({ ...form, content: e.target.value })
                                        // }
                                        ></textarea>
                                    </div>

                                    <div className="mt-6 flex justify-center">
                                        <button
                                            type="submit"
                                            className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200"
                                        // onClick={() => {
                                        //     handleSubmit();
                                        // }}
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
