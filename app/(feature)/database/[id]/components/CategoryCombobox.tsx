"use client";

// libraries
import { Combobox, Transition } from "@headlessui/react";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
}

export default function CategoryCombobox({
  items,
  name,
}: {
  items: Category[];
  name: string;
}) {
  const [selectedItem, setSelectedItem] = useState<Category | null>(items[0]);
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? items
      : items.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase()),
        );

  return (
    <Combobox value={selectedItem} onChange={setSelectedItem} name={name}>
      <Combobox.Input
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(item: Category) => item.name}
        required
      />
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Combobox.Options>
          {filteredItems.map((item) => (
            <Combobox.Option key={item.id} value={item}>
              {item.name}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
}
