"use client";
import { Metadata } from "next";
import Image from "next/image";
import { useState } from "react"

import BniLogo from "../components/BniLogo";

// export const metadata: Metadata = {
//   title: "Login | BNI Custody Database",
//   description: "",
// };

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (e: any) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    if (response.status === 401) {
      alert('Wrong Password');
    } else if (response.status === 200) {
      const data = await response.json();
      console.log(data.status);
      document.cookie = `token=${data.token}`;
    }
  }
  return (
    <section className="flex h-[calc(100%-5rem)] px-40 pb-20 pt-10">
      <div className="flex w-full overflow-hidden rounded-2xl bg-base-50 shadow-xl">
        <form
          className="flex w-1/2 flex-col items-center justify-between px-24 py-10"
          onSubmit={handleLogin}
        >
          <div className="flex flex-col items-center text-lg text-base-content-200">
            {/* <BniLogo
              wordmark
              className="h-16"
            /> */}
            <Image
              src="/logo-bni-full.svg"
              width={175}
              height={57}
              alt=""
              className="h-16"
            />
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
          <button type="submit" className="btn w-full">Login</button>
        </form>
        <div className="w-1/2 bg-[url('/images/bg-auth.svg')] object-cover" />
      </div>
    </section>
  );
}

