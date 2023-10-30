"use client";

// components
import FileList from "./FileList";

// libraries
import { Tab } from "@headlessui/react";

// types
import { File } from "@customTypes/types";

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
        <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-base-content-300 hover:bg-base-100/60 hover:text-base-content-100 ui-selected:border ui-selected:border-base-200 ui-selected:bg-base-backdrop-200 ui-selected:shadow">
          Mandatory
        </Tab>
        <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-base-content-300 hover:bg-base-100/60 hover:text-base-content-100 ui-selected:border ui-selected:border-base-200 ui-selected:bg-base-backdrop-200 ui-selected:shadow">
          Others
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <FileList file={mandatoryFile} mandatory />
        </Tab.Panel>
        <Tab.Panel>
          <FileList file={additionalFile} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
