"use client";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ListUser() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "a",
    email: "a",
    npp: "a",
    role: "a",
    description: "a",
    picture: "",
  });
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="container">
            <h1 className="mb-2 text-2xl font-bold">Bisma Khomeini</h1>
            <div className="flex flex-row">
              <div className="flex w-1/4">
                <img
                  src={"https://via.placeholder.com/100"}
                  alt="user"
                  className="h-64 w-64 rounded-lg object-cover object-center"
                />
              </div>

              <div className="left w-1/2 flex-row">
                <div className="mb-2  block font-bold">Email</div>
                <div className="mb-2">{user.email}</div>
                <div className="mb-2  block font-bold">NPP</div>
                <div className="mb-2">{user.npp}</div>
                <div className="mb-2  block font-bold">Role</div>
                <div className="mb-2">{user.role}</div>
                <div className="mb-2  block font-bold">Description</div>
                <div className="mb-2">{user.description}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col">
        <h1 className="mb-2 text-2xl font-bold">Log Activity</h1>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row rounded-lg border p-3 shadow-lg">
            <div className="flex flex-col justify-between p-2">
              <div className="text-sm font-bold text-gray-500">4/10/2023</div>
              <div className="text-sm font-bold text-gray-400">11:46 PM</div>
            </div>
            <div className="flex flex-col p-2">
              <div className="text-sm font-bold text-gray-500">
                Name of User
              </div>
              <div className="text-sm font-bold text-gray-400">Desc of Log</div>
            </div>
          </div>

          <div className="flex flex-row rounded-lg border p-3 shadow-lg">
            <div className="flex flex-col justify-between p-2">
              <div className="text-sm font-bold text-gray-500">4/10/2023</div>
              <div className="text-sm font-bold text-gray-400">11:46 PM</div>
            </div>
            <div className="flex flex-col p-2">
              <div className="text-sm font-bold text-gray-500">
                Name of User
              </div>
              <div className="text-sm font-bold text-gray-400">Desc of Log</div>
            </div>
          </div>
          <div className="flex flex-row rounded-lg border p-3 shadow-lg">
            <div className="flex flex-col justify-between p-2">
              <div className="text-sm font-bold text-gray-500">4/10/2023</div>
              <div className="text-sm font-bold text-gray-400">11:46 PM</div>
            </div>
            <div className="flex flex-col p-2">
              <div className="text-sm font-bold text-gray-500">
                Name of User
              </div>
              <div className="text-sm font-bold text-gray-400">Desc of Log</div>
            </div>
          </div>
          <div className="flex flex-row rounded-lg border p-3 shadow-lg">
            <div className="flex flex-col justify-between p-2">
              <div className="text-sm font-bold text-gray-500">4/10/2023</div>
              <div className="text-sm font-bold text-gray-400">11:46 PM</div>
            </div>
            <div className="flex flex-col p-2">
              <div className="text-sm font-bold text-gray-500">
                Name of User
              </div>
              <div className="text-sm font-bold text-gray-400">Desc of Log</div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
