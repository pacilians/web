"use client";
// import { Metadata } from "next";
import { Fragment, useState, useEffect } from "react";
import AnnouncementComp from "./components/announcementComp";
import { Dialog, Transition } from "@headlessui/react";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import Loading from "@/Loading";
import { create } from "domain";

// export const metadata: Metadata = {
//   title: "Announcement | BNI Custody System",
//   description: "",
// };

export default function ListAnnouncement() {
  // const [showModal, setShowModal] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [load, setLoad] = useState(true);
  const [loader, setLoader] = useState({
    init: true,
    create: false,
  });
  const [announcement, setAnnouncement] = useState({
    pinned: [],
    unpinned: [],
    announcements: [],
  });
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const [cookies, setCookie, removeCookie] = useCookies();

  function closeModal() {
    setIsOpen(false);
  }
  const handleSubmit = async () => {
    const payload = JSON.stringify({
      title: form.title,
      content: form.content,
    });
    const postForm = fetch(
      "https://bnicstdy-b41ad9b84aff.herokuapp.com/announcement",
      // "http://127.0.0.1:8000/user/",
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
        setLoad(!load)
        closeModal();
        setForm({ content: "", title: "" });
      } else {
        throw new Error("Failed Create Announcement");
      }
    });

    toast.promise(postForm, {
      loading: "Creating announcement...",
      success: "Announement has been created",
      error: "Failed creating announement",
    });
  };

  function openModal() {
    setIsOpen(true);
  }

  const fetchAnnouncement = async () => {
    try {
      const response = await fetch(
        `https://bnicstdy-b41ad9b84aff.herokuapp.com/announcement`,
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
      setAnnouncement(ann);
      setLoader({ ...loader, init: false });
    } catch (error) {
      console.error("Error fetching announcement:", error);
    }
  };

  useEffect(() => {
    fetchAnnouncement();
  }, [load]);

  if (loader.init) return <Loading />;

  return (
    <main className="bg-base-backdrop-200 w-full grow rounded-tl-3xl p-10 shadow-2xl">
      <div className="space-y-4">
        {announcement.announcements.map((data: any, key: any) => (
          <AnnouncementComp
            key={key}
            title={data.title}
            content={data.content}
            id={data.id}
          />
        ))}
      </div>

      <>
        <div className="absolute bottom-5 right-5">
          <button
            type="button"
            onClick={openModal}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E55300] text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <span className="flex items-center justify-center text-2xl">+</span>
          </button>
        </div>
        <form>
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
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-bold leading-6 text-gray-900"
                      >
                        Add New Announcement
                      </Dialog.Title>
                      <div className="mt-4">
                        <label
                          className="mb-2 block text-sm font-semibold"
                          htmlFor="announcement"
                        >
                          Title
                        </label>
                        <input
                          id="announcement"
                          type="text"
                          className="w-full rounded-md border p-2"
                          placeholder="Enter your tile"
                          value={form.title}
                          onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                          }
                        />
                      </div>
                      <div className="mt-4">
                        <label
                          className="mb-2 block text-sm font-semibold"
                          htmlFor="announcement"
                        >
                          Description
                        </label>
                        <textarea
                          id="announcementDesc"
                          className="h-40 w-full rounded-md border p-2"
                          placeholder="Enter your announcement"
                          value={form.content}
                          onChange={(e) =>
                            setForm({ ...form, content: e.target.value })
                          }
                        ></textarea>
                      </div>

                      <div className="mt-6 flex justify-center">
                        <button
                          type="submit"
                          className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200"
                          onClick={() => {
                            handleSubmit();
                          }}
                        >
                          Post Announcement
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </form>
      </>
    </main>
  );
}
