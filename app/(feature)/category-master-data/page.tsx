// "use client "

import React from "react";
import MandtoryFile from "./components/MandatoryFile";
import Service from "./components/Service";
import Category from "./components/Category";
import { Dialog, Transition } from "@headlessui/react";
import { iListMandatoryFile, iMandatoryFile } from "./interface";
import toast, { Toaster } from "react-hot-toast";

const fetchInitialData = async () => {
  try {
    const response = await fetch(
      "https://bnicstdy-b41ad9b84aff.herokuapp.com/master-data/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      console.error("Error fetching user:", "Network response was not ok");
    }

    const res = await response.json();
    const data = res.data.data;
    return data;
  } catch (error) {
    return {
      business: [],
      mandatory: [],
      service: [],
    };
  }
};


export default async function CategoryMasterData({}){

  const data = await fetchInitialData();

  return (
    <main className="flex grow gap-4 rounded-tl-3xl bg-base-50 p-4 shadow-2xl">
      {/* Mandatory File */}
      <MandtoryFile initialData={data.mandatory} />

      {/* Service + Business Category */}
      <div className="flex basis-1/2 flex-col gap-4">
        <Service initialData={data.service} />

        <Category initialData={data.business} />
      </div>
      <Toaster/>
    </main>
  );
};