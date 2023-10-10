"use client";
import { Metadata } from "next";
import { Fragment, useState, useEffect } from "react";
import Form from "../components/Form";
import Filter from "../components/Filter";
import Iconify from "@/Iconify";
import toast, { Toaster } from "react-hot-toast";
import { iCustomer } from "../interface";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation"

export const metadata: Metadata = {
  title: "Database | BNI Custody System",
  description: "",
};

interface Props {
  initialData: any;
}

export default function Database({ initialData }: Props) {
  const router = useRouter()
  const [loader, setLoader] = useState({
    refresh: false,
    loading: true,
  });
  const [customer, setCustomer] = useState<iCustomer[]>(initialData || []);
  const [cookies, setCookie, removeCookie] = useCookies();

  /**
   * Function
   */

  const fetchCustomer = async () => {
    try {
      const response = await fetch(
        // "https://bnicstdy-b41ad9b84aff.herokuapp.com/database",
        "http://127.0.0.1:8000/database",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: cookies.token,
          },
        },
      );

      if (!response.ok) {
        console.error("Error fetching user:", "Network response was not ok");
      }

      const res = await response.json();
      const customer = res.data.customers;
      setCustomer(customer);
      setLoader({ ...loader, loading: true });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  /**
   * UseEffect
   */
  useEffect(() => {
    fetchCustomer();
  }, [loader.refresh]);

  return (
    <div>
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
              className={`pr-2 text-4xl text-base-content-300 transition-transform duration-500`}
            />
            {/* <button className="text-base-content">Filter</button> */}
            <Filter />
          </div>

          <div className="flex flex-row">
            <Iconify
              icon="bx:sort"
              className={`pr-2 text-4xl text-base-content-300 transition-transform duration-500`}
            />
            <button className="text-base-content">Sort</button>
          </div>

          <div>
            <Form
              loader={loader}
              setLoader={setLoader}
              customer={customer}
              setCutomer={setCustomer}
            />
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
            {customer.map((ctx: iCustomer, index) => {
              return (
                <tr className="hover:bg-slate-300" key={index} onClick={()=>{router.push(`/database/${ctx.id}`)}}>
                  <td>{ctx.name}</td>
                  <td>{ctx.email}</td>
                  <td>4/10/2023</td>
                  <td>{ctx.service}</td>
                  <td>{ctx.business_category}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <br />

      <div>
        <Toaster />
      </div>
    </div>
  );
}
