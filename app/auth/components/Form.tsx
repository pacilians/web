"use client";

import BniLogo from "@/BniLogo";
import toast, { Toaster } from "react-hot-toast";
import { useStoreNavbar } from "../../store/store-context"
// import { useState } from "react";

export default function Form() {
  const handleLogin = (e: any) => {
    e.preventDefault();

    // const { setHeadline } = useStoreNavbar;

    const email = e.target.elements[0].value;
    const password = e.target.elements[1].value;

    const loginRequest = fetch("https://bnicstdy-b41ad9b84aff.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(async (response) => {
      if (response.status === 401) {
        throw new Error("Wrong Password");
      } else if (response.status === 200) {
        const res = await response.json();
        const token = res.data.token;
        const user = res.data.user;
        const expirationTime = new Date(Date.now() + 2 * 60 * 60 * 1000).toUTCString();   // 2 Hours
        document.cookie = `token=${token}; expires=${expirationTime}`;
        document.cookie = `name=${user.name}; expires=${expirationTime}`;
        document.cookie = `role=${user.role}; expires=${expirationTime}`;

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    });

    toast.promise(loginRequest, {
      loading: "Logging in...",
      success: "Logged in successfully",
      error: "Login failed",
    });
  };

  return (
    <form
      className="flex w-1/2 flex-col items-center justify-center gap-10 px-24 py-10"
      onSubmit={handleLogin}
    >
      <div className="flex flex-col items-center text-lg text-base-content-400">
        <BniLogo showWordmark className="h-16" />
        <p className="font-bold">International Division</p>
        <p className="">Custody System</p>
      </div>
      <div className="mb-4 flex w-full flex-col gap-4">
        <label className="w-full">
          <span className="text-base-content-300">Email address</span>
          <input
            type="email"
            className="mt-1 w-full rounded-lg border-base-content-500 bg-transparent shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="johndoe@bni.co.id"
          />
        </label>
        <label className="w-full">
          <span className="text-base-content-300">Password</span>
          <input
            type="password"
            className="mt-1 w-full rounded-lg border-base-content-500 bg-transparent shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="••••••••••••"
          />
        </label>
      </div>
      <button type="submit" className="btn w-full">
        Login
      </button>
      <Toaster />
    </form>
  );
}
