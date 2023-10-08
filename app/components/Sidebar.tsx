"use client";

import { Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import BniLogo from "./BniLogo";
import Iconify from "./Iconify";

export default function Sidebar() {
  const [isButtonToggled, setIsButtonToggled] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`relative transition-[width] duration-500 ${
        isButtonToggled ? "w-[6.5rem]" : "w-64"
      }`}
    >
      <nav
        className={`fixed flex h-screen flex-col px-5 py-5 transition-[width] duration-500 ${
          isButtonToggled ? "w-[6.5rem]" : "w-64"
        }`}
      >
        <div
          className={`h-10 overflow-hidden px-3 transition-[width] duration-500 ${
            isButtonToggled ? "w-12" : "w-full"
          }`}
        >
          <BniLogo showWordmark className="h-full object-left" />
        </div>
        <div className="mt-12 flex w-full grow flex-col">
          <Link
            className={`nav-item${
              pathname.startsWith("/announcement") ? "-active" : ""
            }`}
            href="/announcement"
          >
            <Iconify icon="solar:flag-2-bold-duotone" className="text-2xl" />
            <Transition
              className="line-clamp-1 text-clip"
              as="p"
              show={!isButtonToggled}
              enter="transition ease-in-out duration-500 transform"
              enterFrom="-translate-x-2 opacity-0 scale-90"
              enterTo="translate-x-0 opacity-100 scale-100"
              leave="transition ease-in-out duration-500 transform"
              leaveFrom="translate-x-0 opacity-100 scale-100"
              leaveTo="-translate-x-2 opacity-0 scale-90"
            >
              Announcements
            </Transition>
          </Link>
          <Link
            className={`nav-item${
              pathname.startsWith("/database") ? "-active" : ""
            }`}
            href="/database"
          >
            <Iconify icon="solar:database-bold-duotone" className="text-2xl" />
            <Transition
              className="line-clamp-1 text-clip"
              as="p"
              show={!isButtonToggled}
              enter="transition ease-in-out duration-500 transform"
              enterFrom="-translate-x-2 opacity-0 scale-90"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-500 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-2 opacity-0 scale-90"
            >
              Database
            </Transition>
          </Link>
          <Link
            className={`nav-item${
              pathname.startsWith("/master-data") ? "-active" : ""
            }`}
            href="/master-data"
          >
            <Iconify
              icon="solar:inbox-archive-bold-duotone"
              className="text-2xl"
            />
            <Transition
              className="line-clamp-1 text-clip"
              as="p"
              show={!isButtonToggled}
              enter="transition ease-in-out duration-500 transform"
              enterFrom="-translate-x-2 opacity-0 scale-90"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-500 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-2 opacity-0 scale-90"
            >
              Master Data
            </Transition>
          </Link>
          <Link
            className={`nav-item${
              pathname.startsWith("/user-management") ? "-active" : ""
            }`}
            href="/user-management"
          >
            <Iconify
              icon="solar:users-group-two-rounded-bold-duotone"
              className="text-2xl"
            />
            <Transition
              className="line-clamp-1 text-clip"
              as="p"
              show={!isButtonToggled}
              enter="transition ease-in-out duration-500 transform"
              enterFrom="-translate-x-2 opacity-0 scale-90"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-500 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-2 opacity-0 scale-90"
            >
              Users
            </Transition>
          </Link>
          <button
            className="mt-auto flex h-12 w-full items-center justify-center rounded-full border border-base-400 active:scale-95"
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
    </aside>
  );
}
