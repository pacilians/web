"use client";

import { Popover, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

import Iconify from "./Iconify";

export default function NavMenu() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies();

  async function logout() {
    removeCookie("token");
    router.push("/auth");
  }

  return (
    <Popover>
      <Popover.Button className="group flex h-12 w-12 items-center justify-center rounded-xl border border-base-400 active:scale-95">
        <Iconify
          icon="solar:hamburger-menu-linear"
          className="text-2xl group-hover:text-base-content-100"
        />
      </Popover.Button>
      <Transition
        enter="transition duration-200"
        enterFrom="transform scale-50 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-200"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-50 opacity-0"
      >
        <Popover.Panel className="absolute right-0 top-2 z-10 origin-top-right">
          <div className="flex w-60 flex-col rounded-lg bg-base-200 p-3 shadow">
            <a href="/analytics">Analytics</a>
            <a href="/engagement">Engagement</a>
            <a href="/security">Security</a>
            <a href="/integrations">Integrations</a>
            <button
              className="flex h-10 w-full items-center justify-center rounded-md bg-red-200 text-sm text-red-800"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
