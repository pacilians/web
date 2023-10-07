"use client";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import UserCard from "./card";
import { useRouter } from "next/navigation";

export default function ListUser() {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <div className="mb-6 flex justify-between rounded-lg">
        <h1 className="mb-2 text-2xl font-bold">User</h1>
        <button
          className="py-auto hover:text-white-400 rounded px-4 font-bold hover:bg-blue-700"
          onClick={() => {
            router.push(`/user-management/create`);
          }}
        >
          Add
        </button>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-10">
        <UserCard id={"1"} name={null} picture={null} role={null} npp={null} />
        <UserCard id={null} name={null} picture={null} role={null} npp={null} />
        <UserCard id={null} name={null} picture={null} role={null} npp={null} />
        <UserCard id={null} name={null} picture={null} role={null} npp={null} />
      </div>
    </div>
  );
}
