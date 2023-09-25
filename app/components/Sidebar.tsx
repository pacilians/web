"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Iconify from "./Iconify";

export default function Sidebar() {
  const [isButtonToggled, setIsButtonToggled] = useState(false);
  const pathname = usePathname();

  if (pathname === "/auth") {
    return null;
  }

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
          src="/logo-bni-full.svg"
          alt=""
          width={175}
          height={57}
          className="h-full w-fit object-cover object-left"
        />
      </div>
      <div className="mt-12 flex w-full grow flex-col">
        <button className="nav-item">
          <Iconify
            icon="solar:home-angle-2-bold-duotone"
            className="text-2xl"
          />
          {isButtonToggled ? null : "Home"}
        </button>
        <button className="nav-item">
          <Iconify icon="solar:database-bold-duotone" className="text-2xl" />
          {isButtonToggled ? null : "Database"}
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
          className="mt-auto flex h-12 w-full items-center justify-center rounded-full bg-base-300 hover:bg-base-400 active:scale-95"
          onClick={() => setIsButtonToggled(!isButtonToggled)}
        >
          <Iconify
            icon="solar:arrow-left-outline"
            className={`text-2xl text-base-content-300 transition-transform duration-500 ${
              isButtonToggled ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
    </nav>
  );
}
