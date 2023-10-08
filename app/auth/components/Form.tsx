"use client";

import BniLogo from "@/app/components/BniLogo";
import { useState } from "react";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (e: any) => {
    e.preventDefault();
    const response = await fetch("https://bnicstdy-b41ad9b84aff.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (response.status === 401) {
      alert("Wrong Password");
    } else if (response.status === 200) {
      const res = await response.json();
      document.cookie = `token=${res.data.token}`;
      window.location.href = "/";
    }
  };

  return (
    <form
      className="flex w-1/2 flex-col items-center justify-center gap-10 px-24 py-10"
      onSubmit={handleLogin}
    >
      <div className="flex flex-col items-center text-lg text-base-content-400">
        <BniLogo showWordmark className="h-16" />
        <p className="font-bold">International Division</p>
        <p className="">Custody Form Database</p>
      </div>
      <div className="mb-4 flex w-full flex-col gap-4">
        <label className="w-full">
          <span className="text-base-content-300">Email address</span>
          <input
            type="email"
            className="mt-1 w-full rounded-lg border-base-content-500 bg-transparent shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="johndoe@bni.co.id"
            onChange={handleEmailChange}
          />
        </label>
        <label className="w-full">
          <span className="text-base-content-300">Password</span>
          <input
            type="password"
            className="mt-1 w-full rounded-lg border-base-content-500 bg-transparent shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="••••••••••••"
            onChange={handlePasswordChange}
          />
        </label>
      </div>
      <button type="submit" className="btn w-full">
        Login
      </button>
    </form>
  );
}
