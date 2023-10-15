"use client";

import { Popover, Tab, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import BniLogo from "./BniLogo";
import Iconify from "./Iconify";

export default function NavMenu() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [theme, setTheme] = useState("");

  async function logout() {
    removeCookie("token");
    router.push("/auth");
  }

  function setThemeTab(index: number) {
    const selectedTheme = ["light", "dark", "bni"][index];
    setTheme(selectedTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", selectedTheme);
    }
  }

  useEffect(() => {
    let htmlElement = document.querySelector("html");
    let storedTheme = "light";
    if (typeof window !== "undefined") {
      storedTheme = localStorage.getItem("theme") || "light";
    }
    const currentTheme = theme || storedTheme;
    setTheme(currentTheme);
    htmlElement?.setAttribute(
      "data-theme",
      theme === "" ? currentTheme : theme,
    );

    if (htmlElement?.getAttribute("data-theme") === "dark") {
      htmlElement?.classList.add("dark");
    } else {
      htmlElement?.classList.remove("dark");
    }
  }, [theme]);

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
        <Popover.Panel className="absolute right-0 top-2 origin-top-right">
          <div className="z-40 flex w-60 flex-col gap-2 rounded-xl border border-base-300 bg-base-backdrop-200 p-3 shadow-xl">
            <Tab.Group
              defaultIndex={
                theme === "light"
                  ? 0
                  : theme === "dark"
                  ? 1
                  : theme === "bni"
                  ? 2
                  : 0
              }
              onChange={(index) => {
                setThemeTab(index);
              }}
            >
              <Tab.List className="flex gap-1 rounded-lg bg-base-200 p-1 shadow-inner">
                <Tab className="flex h-10 w-full items-center justify-center rounded-md hover:bg-base-backdrop-200 hover:text-base-content-100 ui-selected:border ui-selected:border-base-200 ui-selected:bg-orange-500 ui-selected:shadow">
                  <Iconify
                    icon="solar:sun-bold"
                    className="text-xl text-base-content-200 ui-selected:text-white"
                  />
                </Tab>
                <Tab className="flex h-10 w-full items-center justify-center rounded-md hover:bg-base-backdrop-200 hover:text-base-content-100 ui-selected:border ui-selected:border-base-200 ui-selected:bg-orange-500 ui-selected:shadow">
                  <Iconify
                    icon="solar:moon-bold"
                    className="text-xl text-base-content-200 ui-selected:text-white"
                  />
                </Tab>
                <Tab className="flex h-10 w-full items-center justify-center rounded-md hover:bg-base-backdrop-200 hover:text-base-content-100 ui-selected:border ui-selected:border-base-200 ui-selected:bg-orange-500 ui-selected:shadow">
                  <BniLogo className="h-5" />
                </Tab>
              </Tab.List>
            </Tab.Group>
            <button
              className="flex h-10 w-full items-center justify-center rounded-lg bg-red-200 text-sm text-red-800"
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
