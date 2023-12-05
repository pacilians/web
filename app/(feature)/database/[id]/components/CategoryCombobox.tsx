"use client";

// components
import Iconify from "@components/Iconify";

// libraries
import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

interface Category {
  id: string;
  name: string;
}

export default function CategoryCombobox({
  items,
  name,
  defaultValue,
}: Readonly<{
  items: Category[];
  name: string;
  defaultValue?: string;
}>) {
  const [selected, setSelected] = useState(
    items.find((item) => item.name === defaultValue) ?? items[0],
  );
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? items
      : items.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase()),
        );

  return (
    <Combobox value={selected} onChange={setSelected} name={name}>
      <div className="relative w-full">
        <div className="relative w-full cursor-default">
          <Combobox.Input
            className="w-full rounded-md border-transparent bg-base-200 py-2 pl-3 pr-10 font-normal focus:border-base-400 focus:bg-base-300 focus:ring-0"
            displayValue={(item: Category) => item.name}
            onChange={(event) => setQuery(event.target.value)}
            required
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <Iconify
              icon="solar:alt-arrow-down-linear"
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition duration-200 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-200 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-base-300 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredItems.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none px-4 py-2 text-base-content-400">
                Nothing found.
              </div>
            ) : (
              filteredItems.map((item) => (
                <Combobox.Option
                  key={item.id}
                  className="relative cursor-default select-none py-2 pl-10 pr-4 text-base-content-200 ui-active:bg-cyan-800 ui-active:text-white"
                  value={item}
                >
                  <>
                    <span
                      className={`block truncate font-normal ui-selected:font-medium`}
                    >
                      {item.name}
                    </span>
                    <span className="absolute inset-y-0 left-0 hidden items-center pl-3 text-cyan-800 ui-selected:flex ui-active:text-white dark:text-cyan-600 dark:ui-active:text-white">
                      <Iconify
                        icon="ph:check-bold"
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </span>
                  </>
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
