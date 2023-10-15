"use client";

// apis
import { fetchMasterData, updateNasabah } from "@api/api";

// components
import Iconify from "@components/Iconify";
import CategoryCombobox from "./CategoryCombobox";

// libraries
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Toaster } from "react-hot-toast";

// types
import { Nasabah } from "@customTypes/types";

export default function Company({ nasabah }: { nasabah: Nasabah }) {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(nasabah);
  const [cookies] = useCookies();
  const [masterData, setMasterData] = useState({
    business: [],
    service: [],
    mandatory: [],
  });

  // using useEffect because await cannot be used in non async components
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchMasterData();
      setMasterData(result || { business: [], service: [], mandatory: [] });
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const updatedNasabah = {
      ...nasabah,
      name: e.target.elements[0].value,
      address: e.target.elements[1].value,
      telephone: e.target.elements[2].value,
      expiry_date: e.target.elements[3].value,
      business_category: e.target.elements[5].value,
      service: e.target.elements[8].value,
    };
    console.log(updatedNasabah);

    try {
      await updateNasabah(updatedNasabah, cookies.token);
      setData(updatedNasabah);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="group relative flex basis-1/2 flex-col gap-2 overflow-hidden rounded-xl border border-base-300 py-5 pl-5 pr-3 text-base-content-400"
      onSubmit={handleSubmit}
    >
      <h3 className="mb-4 text-xl font-semibold text-base-content-200">
        Company
      </h3>
      <div className="flex items-center gap-2 font-bold">
        <p className="w-24 shrink-0">Name: </p>
        {!isEditing ? (
          <span className="font-normal">{data.name}</span>
        ) : (
          <input
            type="text"
            className="block w-full rounded-md border-transparent bg-base-200 font-normal focus:border-base-400 focus:bg-base-500 focus:ring-0"
            placeholder={data.name}
            defaultValue={data.name}
            required
          />
        )}
      </div>
      <div className="flex items-center gap-2 font-bold">
        <p className="w-24 shrink-0">Address: </p>
        {!isEditing ? (
          <span className="font-normal">{data.address}</span>
        ) : (
          <input
            type="text"
            className="block w-full rounded-md border-transparent bg-base-200 font-normal focus:border-base-400 focus:bg-base-500 focus:ring-0"
            placeholder={data.address}
            defaultValue={data.address}
            required
          />
        )}
      </div>
      <div className="flex items-center gap-2 font-bold">
        <p className="w-24 shrink-0">Phone: </p>
        {!isEditing ? (
          <span className="font-normal">{data.telephone}</span>
        ) : (
          <input
            type="text"
            className="block w-full rounded-md border-transparent bg-base-200 font-normal focus:border-base-400 focus:bg-base-500 focus:ring-0"
            placeholder={data.telephone}
            defaultValue={data.telephone}
            required
          />
        )}
      </div>
      <div className="flex items-center gap-2 font-bold">
        <p className="w-24 shrink-0">Expired Date: </p>
        {!isEditing ? (
          <span className="font-normal">
            {data.expiry_date}
          </span>
        ) : (
          <input
            type="date"
            className="block w-full rounded-md border-transparent bg-base-200 font-normal focus:border-base-400 focus:bg-base-500 focus:ring-0"
            placeholder={data.expiry_date}
            defaultValue={data.expiry_date}
            required
          />
        )}
      </div>
      <div className="flex items-center gap-2 font-bold">
        <p className="w-24 shrink-0">Business: </p>
        {!isEditing ? (
          <span className="font-normal">{data.business_category}</span>
        ) : (
          <CategoryCombobox items={masterData.business} name="business" />
        )}
      </div>
      <div className="flex items-center gap-2 font-bold">
        <p className="w-24 shrink-0">Service: </p>
        {!isEditing ? (
          <span className="font-normal">{data.service}</span>
        ) : (
          <CategoryCombobox items={masterData.service} name="service" />
        )}
      </div>
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
      <Toaster />
    </form>
  );
}
