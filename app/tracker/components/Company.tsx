"use client";

import { useState } from "react";

import Iconify from "@components/Iconify";

interface Nasabah {
  name: string;
  address: string;
  email: string;
  telephone: string;
  business_category: string;
  service: string;
}

export default function Company({ nasabah }: { nasabah: Nasabah }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="group relative basis-1/2 overflow-hidden rounded-xl border border-base-300 px-8 py-5 text-base-content-400">
      <h3 className="mb-2 text-xl font-semibold text-base-content-200">
        Company Information
      </h3>
      <p><span className="font-bold">Name: </span> {nasabah.name}</p>
      <p><span className="font-bold">Address: </span> {nasabah.address}</p>
      <p><span className="font-bold">Email:</span> {nasabah.email}</p>
      <p><span className="font-bold">Telephone: </span> {nasabah.telephone}</p>
      <p><span className="font-bold">Business Category: </span> {nasabah.business_category}</p>
      <p><span className="font-bold">Service: </span> {nasabah.service}</p>
    </div>
  );
}
