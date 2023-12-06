"use client";

import BniLogo from "@components/BniLogo";
import toast, { Toaster } from "react-hot-toast";
import { useStoreNavbar } from "../../store/store-context";
import { usePathname, useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter();
  const pathname = usePathname();
  const handleLogin = (e: any) => {
    e.preventDefault();

    // const { setHeadline } = useStoreNavbar;

    const email = e.target.elements[0].value;
    const password = e.target.elements[1].value;

    const toastId = toast.loading("Logging in...");

    fetch(`http://bnicustody.site:8000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }

        const res = await response.json();
        const token = res.data.token;
        const user = res.data.user;
        const expirationTime = new Date(
          Date.now() + 2 * 60 * 60 * 1000,
        ).toUTCString(); // 2 Hours
        document.cookie = `token=${token}; expires=${expirationTime}`;
        document.cookie = `name=${user.name}; expires=${expirationTime}`;
        document.cookie = `role=${user.role}; expires=${expirationTime}`;

        console.log(user);

        if(user.role === "CUSTOMER"){
          router.push("/tracker");
        }else if(user.role === "AUDITOR"){
          router.push("/audit")
        }else{
          router.push("/")
        }

        toast.success("Logged in successfully", { id: toastId });
      })
      .catch((error) => {
        toast.error(error.message, { id: toastId });
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
            required
          />
        </label>
        <label className="w-full">
          <span className="text-base-content-300">Password</span>
          <input
            type="password"
            className="mt-1 w-full rounded-lg border-base-content-500 bg-transparent shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="••••••••••••"
            required
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
