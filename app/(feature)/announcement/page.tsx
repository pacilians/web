"use client";
// import { Metadata } from "next";
import { Fragment, useState } from "react";
import AnnouncementComp from "./components/announcementComp";
import { Dialog, Transition } from '@headlessui/react'
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";

// export const metadata: Metadata = {
//   title: "Announcement | BNI Custody System",
//   description: "",
// };

export default function ListAnnouncement() {
  // const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  let [isOpen, setIsOpen] = useState(false)

  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const [cookies, setCookie, removeCookie] = useCookies();

function closeModal() {
    // handleSubmit()
    setIsOpen(false)
  }
  const handleSubmit = async (e: any) => {
    console.log("masuk")
    e.preventDefault();

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
        closeModal
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
    setIsOpen(true)
  }
  // const handlePost = async () => {
  //   const response = await fetch("https://bnicstdy-b41ad9b84aff.herokuapp.com/announcement", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `${document.cookie}`
  //     },
  //     body: JSON.stringify({
  //       title: title,
  //       desc: desc,
  //     }),
  //   });
  //   if (response.status === 401) {
  //     alert("Fail to post announcement");
  //   } else if (response.status === 200) {
  //     // const res = await response.json();
  //     // document.cookie = `token=${res.data.token}`;
  //   }
  // };
  return (
    <main className="w-full grow rounded-tl-3xl bg-base-backdrop-200 p-10 shadow-2xl">
      <div className="space-y-4">
        <AnnouncementComp />
        <AnnouncementComp />
        <AnnouncementComp />

      </div>

      {/* <button className="text-white bg-[#E55300] focus:outline-none font-large text-sm rounded-lg px-5 py-2.5 text-center mr-5"
          onClick={() => setShowModal(true)}>
          +
        </button>
        <CreateAnnouncement isVisible={showModal} onClose={() => setShowModal(false)}/> */}
      <>
          <div className="absolute bottom-5 right-5">
            <button
              type="button"
              onClick={openModal}
              className="rounded-full w-12 h-12 bg-[#E55300] flex items-center justify-center text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <span className="text-2xl flex items-center justify-center">+</span>
            </button>
          </div>
        <form onSubmit={handleSubmit}>
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
                        className="font-bold text-lg leading-6 text-gray-900"
                      >
                        Add New Announcement
                      </Dialog.Title>
                      <div className="mt-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="announcement">Title</label>
                        <input
                          id="announcement"
                          type="text"
                          className="w-full p-2 border rounded-md"
                          placeholder="Enter your tile"
                          value={form.title}
                          onChange={(e) => setForm({ ...form, title: e.target.value })}
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="announcement">Description</label>
                        <textarea
                          id="announcementDesc"
                          className="w-full h-40 p-2 border rounded-md"
                          placeholder="Enter your announcement"
                          value={form.content}
                          onChange={(e) => setForm({ ...form, content: e.target.value })}
                        ></textarea>
                      </div>

                      <div className="mt-6 flex justify-center">
                        <button
                          type="submit"
                          className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200"
                          // onClick={closeModal}
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
