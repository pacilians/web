"use client";

// components
import Iconify from "@components/Iconify";
import { Popover } from "@headlessui/react";

// libraries
import { useState } from "react";

// types
import { BoardOfDirector } from "@customTypes/types";

// libraries
import { useState } from "react";

// types
import { BoardOfDirector } from "@customTypes/types";

export default function BoardOfDirectors({
  bod,
}: Readonly<{ bod: BoardOfDirector[] }>) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="group relative flex basis-1/2 flex-col gap-2 rounded-xl border border-base-300 bg-base-200/40 p-5 text-base-content-400">
      <h3 className="text-xl font-semibold text-base-content-200">
        Board of Directors
      </h3>
      {bod.map((person) => (
        <div className="mb-2 flex flex-col" key={person.id}>
          <p className="font-bold">
            Name: <span className="font-normal">{person.name}</span>
          </p>
          <p className="font-bold">
            Role: <span className="font-normal">{person.role}</span>
          </p>
        </div>
      ))}
      <div
        className={`absolute right-3 top-3 ${
          !isEditing ? "-translate-y-6 translate-x-6 scale-0" : ""
        } flex justify-end gap-1 transition duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100`}
      >
        {isEditing ? (
          <button
            type="submit"
            className="rounded-lg border border-base-200 bg-base-100 p-2 hover:border-base-300 hover:bg-base-200 group-hover:shadow-sm"
          >
            <Iconify
              icon="iconamoon:check-bold"
              className="text-lg text-base-content-100"
            />
          </button>
        ) : null}
        <button
          className="rounded-lg border border-base-200 bg-base-100 p-2 hover:border-base-300 hover:bg-base-200 group-hover:shadow-sm"
          onClick={(event: React.MouseEvent) => {
            event.preventDefault();
            setIsEditing(!isEditing);
          }}
        >
          <Iconify
            icon={isEditing ? "iconamoon:close-bold" : "solar:pen-bold-duotone"}
            className="text-lg text-base-content-100"
          />
        </button>
      </div>
    </div>
  );
}
