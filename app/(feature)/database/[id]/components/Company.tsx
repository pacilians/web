"use client";

import { useState } from "react";

import Iconify from "@components/Iconify";

interface Nasabah {
  name: string;
  address: string;
  telephone: string;
  expiry_date: string;
  business_category: string;
  service: string;
}

export default function Company({ nasabah }: { nasabah: Nasabah }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <form className="group relative basis-1/2 overflow-hidden rounded-xl border border-base-300 px-8 py-5 text-base-content-400">
      <h3 className="mb-2 text-xl font-semibold text-base-content-200">
        Company
      </h3>
      <p className="flex items-center gap-2 font-bold">
        Name:{" "}
        {!isEditing ? (
          <span className="font-normal">{nasabah.name}</span>
        ) : (
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-transparent bg-gray-100 font-normal focus:border-gray-500 focus:bg-white focus:ring-0"
            placeholder={nasabah.name}
            value={nasabah.name}
          />
        )}
      </p>
      <p className="flex items-center gap-2 font-bold">
        Address:{" "}
        {!isEditing ? (
          <span className="font-normal">{nasabah.address}</span>
        ) : (
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-transparent bg-gray-100 font-normal focus:border-gray-500 focus:bg-white focus:ring-0"
            placeholder={nasabah.address}
            value={nasabah.address}
          />
        )}
      </p>
      <p className="flex items-center gap-2 font-bold">
        Phone:{" "}
        {!isEditing ? (
          <span className="font-normal">{nasabah.telephone}</span>
        ) : (
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-transparent bg-gray-100 font-normal focus:border-gray-500 focus:bg-white focus:ring-0"
            placeholder={nasabah.telephone}
            value={nasabah.telephone}
          />
        )}
      </p>
      <p className="flex items-center gap-2 font-bold">
        Expired Date:{" "}
        {!isEditing ? (
          <span className="font-normal">{nasabah.expiry_date}</span>
        ) : (
          <input
            type="datetime-local"
            className="mt-1 block w-full rounded-md border-transparent bg-gray-100 font-normal focus:border-gray-500 focus:bg-white focus:ring-0"
            placeholder={nasabah.expiry_date}
            value={nasabah.expiry_date}
          />
        )}
      </p>
      <p className="flex items-center gap-2 font-bold">
        Category:{" "}
        {!isEditing ? (
          <span className="font-normal">{nasabah.business_category}</span>
        ) : (
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-transparent bg-gray-100 font-normal focus:border-gray-500 focus:bg-white focus:ring-0"
            placeholder={nasabah.business_category}
            value={nasabah.business_category}
          />
        )}
      </p>
      <p className="flex items-center gap-2 font-bold">
        Service:{" "}
        {!isEditing ? (
          <span className="font-normal">{nasabah.service}</span>
        ) : (
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-transparent bg-gray-100 font-normal focus:border-gray-500 focus:bg-white focus:ring-0"
            placeholder={nasabah.service}
            value={nasabah.service}
          />
        )}
      </p>
      <div
        className={`absolute right-3 top-3 ${
          !isEditing
            ? "translate-x-[calc(100%+0.75rem)] translate-y-[calc(-100%-0.75rem)] scale-0"
            : ""
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
          onClick={(event) => {
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
    </form>
  );
}
