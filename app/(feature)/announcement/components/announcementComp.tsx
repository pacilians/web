"use client";
// import { Metadata } from "next";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Iconify from "@/Iconify";
import Loading from "@/Loading";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

interface iProps {
  title: string;
  content: string;
  id: string;
  announcement: any;
  setAnnouncement: any;
}

export default function AnnouncementComp({
  title,
  content,
  id,
  announcement,
  setAnnouncement,
}: iProps) {
  let [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleDeleteAnnouncement = async () => {
    try {
      const response = await fetch(
        `https://bnicstdy-b41ad9b84aff.herokuapp.com/announcement/${id}`,
        {
          method: "DELETE",
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
      
      setAnnouncement({
        pinned: announcement.pinned.filter((ctx: any) => ctx.id !== id),
        unpinned: announcement.unpinned.filter((ctx: any) => ctx.id !== id),
        announcements: announcement.announcements.filter((ctx: any) => ctx.id !== id),
      });
    } catch (error) {
      console.error("Error fetching announcement:", error);
    }
  };

  function closeModal() {
    setIsOpen(false);
    console.log("closemodal");
  }

  function openModal() {
    setIsOpen(true);
    console.log("openmodal");
  }
  const handleAnnouncementClick = () => {
    openModal();
  };

  return (
    <>
      <div
        className="target flex w-full flex-col rounded bg-white p-4 text-left text-[#575152]"
        onClick={openModal}
      >
        <div className="flex flex-row justify-between font-bold">
          {title}
          <div className="iconClass flex flex-row">
            <button>
              <Iconify icon="solar:pin-bold" className="text-2xl" />
            </button>
            <button
              onClick={(e) => {
                console.log("tekan delete");
                e.stopPropagation();
                handleDeleteAnnouncement();
              }}
            >
              <Iconify icon="material-symbols:delete" className="text-2xl" />
            </button>
          </div>
        </div>

        <div className="line-clamp-3">{content}</div>
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
                <Dialog.Panel className="flex w-3/4 flex-col rounded bg-white p-4 text-[#575152] ">
                  <div className="">
                    <div className="flex flex-row justify-between font-bold">
                      {title}
                    </div>

                    <div className="">{content}</div>
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
