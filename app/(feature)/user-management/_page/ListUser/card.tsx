"use client";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  id: any;
  picture: any;
  name: any;
  role: any;
  npp: any;
}

export default function UserCard({ id, picture, name, role, npp }: Props) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/user-management/detail/${id}`);
  };
  return (
    <div
      className="flex w-1/4 cursor-pointer rounded-lg p-4 shadow-lg"
      onClick={handleClick}
    >
      <img
        src={"https://via.placeholder.com/100"}
        alt="user"
        className="w-30 h-30 rounded-lg object-cover object-center"
      />
      <div className="flex flex-col justify-center p-2">
        <h2 className="text-base font-medium">Bisma Khomeini</h2>
        <p className="text-base-content-300">ADMIN</p>
        <p className="text-base-content-300">019238019283</p>
      </div>
    </div>
  );
}
