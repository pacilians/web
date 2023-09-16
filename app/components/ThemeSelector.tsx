"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import Iconify from "./Iconify";
import Image from "next/image";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("");

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

  return (
    <div className="w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Themes
            <Iconify
              icon="solar:alt-arrow-down-line-duotone"
              className="-mr-1 ml-2 text-xl text-orange-200 hover:text-orange-100"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                <button
                  onClick={() => setTheme("light")}
                  data-headlessui-state={theme === "light" ? "active" : ""}
                  className="ui-active:bg-orange-500 ui-active:text-white group flex w-full items-center rounded-md px-4 py-3 text-sm text-gray-900"
                >
                  <Iconify
                    icon="solar:sun-bold"
                    className="ui-active:text-orange-100 mr-2 text-xl text-[#EDE9FE]"
                  />
                  Light
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={() => setTheme("dark")}
                  data-headlessui-state={theme === "dark" ? "active" : ""}
                  className="ui-active:bg-orange-500 ui-active:text-white group flex w-full items-center rounded-md px-4 py-3 text-sm text-gray-900"
                >
                  <Iconify
                    icon="solar:moon-bold"
                    className={`mr-2 text-xl ${
                      theme === "dark" ? "text-orange-100" : "text-[#EDE9FE]"
                    }`}
                  />
                  Dark
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={() => setTheme("cupcake")}
                  data-headlessui-state={theme === "cupcake" ? "active" : ""}
                  className="ui-active:bg-orange-500 ui-active:text-white group flex w-full items-center rounded-md px-4 py-3 text-sm text-gray-900"
                >
                  <Image
                    src="/logo-bni-icon.svg"
                    alt=""
                    width={48}
                    height={48}
                    className="mr-2 h-5 w-5"
                  />
                  BNI
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
