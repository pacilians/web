"use client";

// components
import FileList from "./FileList";

// libraries
import { Tab } from "@headlessui/react";

// types
import { File } from "@customTypes/types";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function FileTabGroup({
  mandatoryFile,
  additionalFile,
}: {
  mandatoryFile: File[];
  additionalFile: File[];
}) {
  return (
    <Tab.Group>
      <Tab.List className="flex gap-1 rounded-xl bg-base-backdrop-100 p-1 shadow-inner">
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-base-content-300",
              selected
                ? "border border-base-200 bg-base-backdrop-200 shadow"
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
                ? "border border-base-200 bg-base-backdrop-200 shadow"
                : "hover:bg-base-100/60 hover:text-base-content-100",
            )
          }
        >
          Others
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <FileList file={mandatoryFile} mandatory/>
        </Tab.Panel>
        <Tab.Panel>
          <FileList file={additionalFile} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
