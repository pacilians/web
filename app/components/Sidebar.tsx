"use client";

import Image from "next/image";
import { useState } from "react";

import Iconify from "./Iconify";

export default function Sidebar() {
  const [isButtonToggled, setIsButtonToggled] = useState(false);

  return (
    <nav
      className={`flex flex-col px-5 py-5 transition-[width] duration-500 ${
        isButtonToggled ? "w-28" : "w-60"
      }`}
    >
      <div
        className={`flex h-10 px-3 transition-[width] duration-500 ${
          isButtonToggled ? "w-16" : "w-full"
        }`}
      >
        <Image
          src="/logo-bni.svg"
          alt=""
          width={175}
          height={57}
          className="h-full w-fit object-cover object-left"
        />
      </div>
      <div className="mt-12 flex w-full grow flex-col">
        <button className="nav-item">
          <Iconify icon="solar:chart-bold-duotone" className="text-2xl" />
          {isButtonToggled ? null : "Dashboard"}
        </button>
        <button className="nav-item">
          <Iconify
            icon="solar:document-add-bold-duotone"
            className="text-2xl"
          />
          {isButtonToggled ? null : "Documents"}
        </button>
        <button className="nav-item">
          <Iconify icon="solar:bell-bold-duotone" className="text-2xl" />
          {isButtonToggled ? null : "Notification"}
        </button>
        <button className="nav-item">
          <Iconify icon="solar:checklist-bold-duotone" className="text-2xl" />
          {isButtonToggled ? null : "Checklist"}
        </button>

        <button
          className="mt-auto flex h-12 w-full items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 active:scale-95"
          onClick={() => setIsButtonToggled(!isButtonToggled)}
        >
          <Iconify
            icon="solar:arrow-left-outline"
            className={`text-2xl transition-transform duration-500 ${
              isButtonToggled ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
    </nav>
  );
}
