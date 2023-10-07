"use client";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import UserCard from "./card";

export default function ListUser() {
  return (
    <div className="flex flex-col">
      <div className="mb-6 flex justify-between rounded-lg">
        <h1 className="mb-2 text-lg font-medium">All User</h1>
        <button className="py-auto rounded px-4 font-bold hover:bg-blue-700">
          Add
        </button>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-10">
        <UserCard id={null} name={null} picture={null} role={null} npp={null}/>
        <UserCard id={null} name={null} picture={null} role={null} npp={null}/>
        <UserCard id={null} name={null} picture={null} role={null} npp={null}/>
        <UserCard id={null} name={null} picture={null} role={null} npp={null}/>
      </div>
    </div>
  );
}
