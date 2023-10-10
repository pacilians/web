"use client";

import { Tab } from "@headlessui/react";

import FileList from "./FileList";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

type FileNasabah = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export default function FileTabGroup({
  mandatoryFile,
  additionalFile,
}: {
  mandatoryFile: FileNasabah[];
  additionalFile: FileNasabah[];
}) {
  return (
    <Tab.Group>
      <Tab.List className="flex gap-1 rounded-xl bg-base-backdrop-100 p-1 shadow-inner">
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-base-content-300",
              selected
                ? "border border-base-200 bg-base-100 shadow"
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
                ? "border border-base-200 bg-base-100 shadow"
                : "hover:bg-base-100/60 hover:text-base-content-100",
            )
          }
        >
          Others
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <FileList file={mandatoryFile} />
        </Tab.Panel>
        <Tab.Panel>
          <FileList file={additionalFile} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
