"use client";

// components
import BniLogo from "./BniLogo";
import Iconify from "./Iconify";

// libraries
import { Popover, Tab, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";
import { useCookies } from "react-cookie";

export default function NavMenu() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies();

  async function logout() {
    removeCookie("token");
    router.push("/auth");
  }

  function setThemeTab(index: number) {
    const selectedTheme = ["light", "dark", "bni"][index];

    let htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.setAttribute("data-theme", selectedTheme);
      if (selectedTheme === "dark") {
        htmlElement.classList.add("dark");
      } else {
        htmlElement.classList.remove("dark");
      }
    }
  }

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

  useEffect(() => {
    setThemeTab(getCurrentTheme() === "light" ? 0 : 1);
    if (getCurrentTheme() === "dark") {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  }, []);

  return (
    <Popover className="relative">
      <Popover.Button className="group flex h-12 w-12 items-center justify-center rounded-xl border border-base-400 active:scale-95">
        <Iconify
          icon="solar:hamburger-menu-linear"
          className="text-2xl group-hover:text-base-content-100"
        />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition duration-200"
        enterFrom="transform scale-50 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-200"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-50 opacity-0"
      >
        <Popover.Panel
          className="absolute right-0 top-14 z-20 origin-top-right"
          unmount={false}
        >
          <div className="flex w-60 flex-col gap-2 rounded-xl border border-base-300 bg-base-backdrop-200 p-3 shadow-xl">
            <Tab.Group
              defaultIndex={getCurrentTheme() === "light" ? 0 : 1}
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
