"use client";

import { Tab } from "@headlessui/react";

import Mandatory from "./Mandatory";
import Others from "./Others";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function FileTabGroup() {
  return (
    <Tab.Group>
      <Tab.List className="flex gap-1 rounded-xl bg-base-backdrop-100 p-1 shadow-inner">
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-base-content-300",
              selected
                ? "bg-base-100 border border-base-200 shadow"
                : "hover:bg-base-100/60 hover:text-base-content-100",
            )
          }
        >
          Mandatory
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-base-content-300",
              selected
                ? "bg-base-100 border border-base-200 shadow"
                : "hover:bg-base-100/60 hover:text-base-content-100",
            )
          }
        >
          Others
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <Mandatory />
        </Tab.Panel>
        <Tab.Panel>
          <Others />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
