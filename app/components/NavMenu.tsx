"use client";

import { Popover, Tab, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

import Iconify from "./Iconify";
import BniLogo from "./BniLogo";

export default function NavMenu() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [theme, setTheme] = useState("");

  let index;
  if (theme === "light") {
    index = 0;
  } else if (theme === "dark") {
    index = 1;
  } else if (theme === "bni") {
    index = 2;
  } else {
    index = 0; // Default value
  }

  async function logout() {
    removeCookie("token");
    router.push("/auth");
  }

  useEffect(() => {
    let htmlElement = document.querySelector("html");
    if (htmlElement) {
      const currentTheme = getCurrentTheme();
      htmlElement.setAttribute(
        "data-theme",
        theme === "" ? currentTheme : theme,
      );

      if (htmlElement.getAttribute("data-theme") === "dark") {
        htmlElement.classList.add("dark");
      } else {
        htmlElement.classList.remove("dark");
      }
    }
  }, [theme]);

  function getCurrentTheme() {
    if (typeof window !== "undefined" && window.matchMedia) {
      // Check if the browser prefers dark mode
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      // Return "dark" if the browser prefers dark mode, otherwise return "light"
      return prefersDark ? "dark" : "light";
    }

    // Default to "light" if unable to determine the theme (e.g., SSR or non-browser environment)
    return "light";
  }

  function setThemeTab(index: number) {
    const selectedTheme = ["light", "dark", "bni"][index];
    setTheme(selectedTheme);
  }

  return (
    <Popover>
      <Popover.Button className="group flex h-12 w-12 items-center justify-center rounded-xl active:scale-95">
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
          <div className="flex w-60 flex-col gap-2 rounded-xl border border-base-300 bg-base-backdrop-200 p-3 shadow-xl">
            <Tab.Group
              defaultIndex={index}
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
