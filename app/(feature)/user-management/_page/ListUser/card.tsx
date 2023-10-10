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
  console.log(id, name, role, npp);
  const router = useRouter();
  const handleClick = () => {
    router.push(`/user-management/detail/${id}`);
  };
  return (
    <div
      className="flex w-1/4 cursor-pointer rounded-lg p-4 shadow-lg bg-base-200"
      onClick={handleClick}
    >
      <div className="image-container w-20 h-20 overflow-hidden">
        <img
          src={
            "https://cdn.discordapp.com/attachments/1102768794629328929/1160548612477038662/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg?ex=6535101f&is=65229b1f&hm=e984805478569f1476be2a807bff520e359dcc33d6a2e8e28e1284dffc1cc1f8&"
          }
          alt="user"
          className="h-30 w-30 block rounded-lg object-cover object-center w-full h-auto"
        />
      </div>

      <div className="flex flex-col justify-center p-2">
        <h2 className="text-base font-medium">{name}</h2>
        <p className="text-base-content-300">{role}</p>
        <p className="text-base-content-300">{npp}</p>
      </div>
    </div>
  );
}
