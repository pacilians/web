"use client";
// import { Metadata } from "next";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Iconify from "@components/Iconify";
import Loading from "@components/Loading";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

interface iProps {
  title: string;
  content: string;
  id: string;
  announcement: any;
  setAnnouncement: any;
  is_pinned: any;
  created_at: any;
  // setLoad: any;
  // load:boolean;
}

export default function AnnouncementComp({
  title,
  content,
  id,
  announcement,
  setAnnouncement,
  is_pinned,
  created_at,
} // setLoad,
// load,
: iProps) {
  let [isOpen, setIsOpen] = useState(false);
  let [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleDeleteAnnouncement = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/announcement/${id}`,
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
      setIsConfirmDelete(false);
      console.log("masuk delete 1");

      setAnnouncement({
        pinned: announcement.pinned.filter((ctx: any) => ctx.id !== id),
        unpinned: announcement.unpinned.filter((ctx: any) => ctx.id !== id),
        announcements: announcement.announcements.filter(
          (ctx: any) => ctx.id !== id,
        ),
      });
    } catch (error) {
      console.error("Error fetching announcement:", error);
    }
  };

  const handlePinAnnouncement = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/announcement/pin/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: cookies.token,
          },
        },
      );

      if (!response.ok) {
        console.error("Error pin announcement:", "Network response was not ok");
      }

      // setLoad(!load);

      announcement.announcements.map((ctx: any) => {
        if (ctx.id === id && ctx.is_pinned === 1) {
          ctx.is_pinned = 0;
          setAnnouncement({
            ...announcement,
            unpinned: [...announcement.unpinned, ctx],
            pinned: announcement.pinned.filter((ctx: any) => {
              return ctx.id !== id;
            }),
          });
        } else if (ctx.id === id && ctx.is_pinned === 0) {
          ctx.is_pinned = 1;
          setAnnouncement({
            ...announcement,
            pinned: [...announcement.pinned, ctx],
            unpinned: announcement.unpinned.filter((ctx: any) => {
              return ctx.id !== id;
            }),
          });
        }
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
  function openModalConfirm() {
    setIsConfirmDelete(true);
  }
  function closeModalConfirm() {
    console.log("masuk modal 1");
    setIsConfirmDelete(false);
  }
  const handleAnnouncementClick = () => {
    openModal();
  };

  return (
    <>
      <div
        className="target flex w-full flex-col rounded bg-base-200 p-4 text-left text-base"
        onClick={openModal}
      >
        <div className="flex flex-row justify-between font-bold">
          {title}
          <div className="iconClass flex flex-row">
            <div className="pr-2 font-normal">
              {is_pinned == 1 ? `Pinned` : ""}
            </div>
            <button
              onClick={(e) => {
                console.log("tekan pin");
                e.stopPropagation();
                handlePinAnnouncement();
              }}
            >
              <Iconify
                icon={
                  is_pinned == 1
                    ? "fluent:pin-12-filled"
                    : "fluent:pin-12-regular"
                }
                className="text-2xl"
              />
            </button>
            <button
              onClick={(e) => {
                // console.log("tekan delete");
                e.stopPropagation();
                // handleDeleteAnnouncement();
                openModalConfirm();
              }}
            >
              <Iconify icon="material-symbols:delete" className="text-2xl" />
            </button>
          </div>
        </div>

        <div className="line-clamp-3">{content}</div>
        <div className="pt-2 ">
          <p className="items-center text-right">{created_at}</p>
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
                <Dialog.Panel className="flex w-3/4 flex-col rounded bg-base-200 p-4 text-base ">
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

      <Transition appear show={isConfirmDelete} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModalConfirm}>
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
                <Dialog.Panel className="flex w-1/4 flex-col rounded bg-white p-4 text-center text-[#575152] ">
                  <div className="">
                    <div className="flex flex-row justify-center font-bold">
                      Are you sure you want to delete this announcement?
                    </div>
                    <div className="flex flex-row items-center justify-center gap-2 pt-2">
                      <button
                        className="w-20 rounded bg-[#FA6E76] p-2"
                        onClick={(e) => {
                          // console.log("tekan delete");
                          handleDeleteAnnouncement();
                          console.log("masuk 1");
                          // handleDeleteAnnouncement();
                          // closeModalConfirm;
                          console.log("masuk 1");
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="w-20 rounded bg-[#E2E3E9] p-2"
                        onClick={closeModalConfirm}
                      >
                        Cancel
                      </button>
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
