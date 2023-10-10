import { Metadata } from "next";
import { Fragment, useState } from "react";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Iconify from "@/Iconify";
import toast, { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Database | BNI Custody System",
  description: "",
};

export default function Database() {
  const [refresh, setRefresh] = useState(false)
  // let [isOpen, setIsOpen] = useState(true)

  // function closeModal() {
  //   setIsOpen(false)
  // }

  // function openModal() {
  //   setIsOpen(true)
  // }

  return (
    <main className="w-full grow rounded-tl-3xl bg-base-backdrop-200 p-10 shadow-2xl">
      <div className=" ">
        <div className="mt-2 flex w-full flex-row items-center justify-between rounded-md pb-5 shadow-sm">
          <div className="w-[50%]">
            <input
              type="text"
              className="block w-full max-w-[75%] rounded-lg border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-base-content focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
              placeholder="Search"
            />
          </div>

          <div className="flex flex-row">
           <Iconify
              icon="zondicons:filter"
              className={`text-4xl text-base-content-300 transition-transform duration-500 pr-2`}
            />
            {/* <button className="text-base-content">Filter</button> */}
            <Filter />
          </div>

          <div className="flex flex-row">
            <Iconify
              icon="bx:sort"
              className={`text-4xl text-base-content-300 transition-transform duration-500 pr-2`}
            />
            <button className="text-base-content">Sort</button>
          </div>

          <div>
            <Form />
            {/* <button type="button" onClick={openModal} className="rounded-lg bg-base-200 px-8 py-2 text-base-content hover:opacity-50">
              Add
            </button> */}
          </div>
        </div>
        <table className="w-full table-fixed ">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Last Update</th>
              <th>Service</th>
              <th>Category</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-500 bg-base-100 text-center text-base-content ">
            <tr className="hover:bg-slate-300">
              <td>ABC</td>
              <td>abc@gmail.com</td>
              <td>4/10/2023</td>
              <td>Core</td>
              <td>Asset</td>
            </tr>
            <tr className="hover:bg-slate-300">
              <td>ABC</td>
              <td>abc@gmail.com</td>
              <td>4/10/2023</td>
              <td>Core</td>
              <td>Asset</td>
            </tr>
            <tr className="hover:bg-slate-300">
              <td>ABC</td>
              <td>abc@gmail.com</td>
              <td>4/10/2023</td>
              <td>Core</td>
              <td>Asset</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />

      <div>
        

        
      </div>
      <Toaster />
    </main>
  );
}
