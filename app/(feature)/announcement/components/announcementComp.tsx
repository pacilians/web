"use client";
// import { Metadata } from "next";
import { Fragment, useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import Iconify from "@/app/components/Iconify";

export default function AnnouncementComp() {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    const handleAnnouncementClick = () => {
        openModal();
    };
    return (
            <>
            <div className="w-full flex flex-col bg-white rounded p-2 text-[#575152] target" onClick={openModal}>
                <div className="font-bold flex flex-row justify-between">Rapat Mingguan 
                    <div className="flex flex-row iconClass">
                        <Iconify icon="solar:pin-bold" className="text-2xl" />
                        <Iconify icon="material-symbols:delete" className="text-2xl" />
                    </div>
                </div>

                <div className="line-clamp-3">kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang
                    kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang
                    kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang
                    kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang
                    kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang
                    kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang
                    kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang
                </div>
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
                                <Dialog.Panel className="w-3/4 flex flex-col bg-white rounded p-2 text-[#575152] ">
                                    <div className="" >
                                        <div className="font-bold flex flex-row justify-between">Rapat Mingguan
                                            {/* <div className="flex flex-row iconClass">
                                                <Iconify icon="solar:pin-bold" className="text-2xl" />
                                                <Iconify icon="material-symbols:delete" className="text-2xl" />
                                            </div> */}
                                        </div>

                                        <div className="">kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang
                                            kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang
                                            kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang
                                            kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang
                                            kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang
                                            kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang
                                            kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang kerja bang
                                        </div>
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