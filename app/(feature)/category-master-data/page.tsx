import React from "react";
import MandtoryFile from "./components/MandatoryFile";
import Service from "./components/Service";
import Category from "./components/Category";
import { Dialog, Transition } from "@headlessui/react";
import { iListMandatoryFile, iMandatoryFile } from "./interface";

const MasterData: React.FC = async () => {
  const fetchInitialData = async () => {};

  const data = await fetchInitialData();

  return (
    <main className="flex grow gap-4 rounded-tl-3xl bg-base-50 p-4 shadow-2xl">
      {/* Mandatory File */}
      {/* <MandtoryFile initialData={data.mandatory} /> */}

      {/* Service + Business Category */}
      <div className="flex basis-1/2 flex-col gap-4">
        {/* <Service initialData={data.service} /> */}

        {/* <Category initialData={data.business} /> */}
      </div>
    </main>
  );
};

export default MasterData;
