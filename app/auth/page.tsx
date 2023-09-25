import { Metadata } from "next";
import Image from "next/image";

import BniLogo from "../components/BniLogo";

export const metadata: Metadata = {
  title: "Login | BNI Custody Database",
  description: "",
};

export default function Login() {
  return (
    <section className="flex h-[calc(100%-5rem)] px-40 pb-20 pt-10">
      <div className="flex w-full overflow-hidden rounded-2xl bg-base-50 shadow-xl">
        <form
          action="POST"
          className="flex w-1/2 flex-col items-center justify-between px-24 py-10"
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
          <button className="btn w-full">Login</button>
        </form>
        <div className="w-1/2 bg-[url('/images/bg-auth.svg')] object-cover" />
      </div>
    </section>
  );
}
