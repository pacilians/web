"use client";

import React from "react";
import Service from "./components/Service";
import Category from "./components/Category";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { iListMandatoryFile, iMandatoryFile } from "./interface";

const MasterData: React.FC = () => {
  const data: iListMandatoryFile = [
    { id: 1, name: "Deed_of_Establishment.pdf" },
    { id: 2, name: "KTP_Pemilik.pdf" },
    { id: 3, name: "Client_Risk.pdf" },
  ];
  const initialSelectedMandatory: iMandatoryFile = { id: 0, name: "" };

  const longestName = data.reduce(
    (longest, item: any) =>
      item.name.length > longest.length ? item.name : longest,
    "",
  );

  const [modal, setModal] = useState({
    edit: false,
    delete: false,
    add: false,
  });
  let [selectedMandatory, setSelectedMandatory] = useState(
    initialSelectedMandatory,
  );

  return (
    <main className="w-full grow rounded-tl-3xl bg-base-backdrop-200 p-10 shadow-2xl">
      list master data
    </main>
  );
};

export default MasterData;
