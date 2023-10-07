"use client";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [npwp, setNpwp] = useState("");
  const [role, setRole] = useState("");
  const [desc, setDesc] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customer, setCustomer] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, npwp, role, desc, email, password);
  };

  return (
    <main className="w-full grow rounded-tl-3xl bg-base-50 p-1">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col">
          <label className="mb-2 block font-bold" htmlFor="name">
            Name
          </label>
          <input
            className="focus:shadow-outline appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none bg-transparent"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4 flex flex-row">
          <div className="mr-2 flex w-1/2 flex-col">
            <label className="mb-2  block font-bold" htmlFor="npwp">
              NPWP
            </label>
            <input
              className="focus:shadow-outline appearance-none rounded border px-3 py-2  leading-tight shadow focus:outline-none bg-transparent"
              id="npwp"
              type="text"
              value={npwp}
              onChange={(e) => setNpwp(e.target.value)}
            />
          </div>
          <div className="ml-2 flex w-1/2 flex-col">
            <label className="mb-2  block font-bold" htmlFor="role">
              Role
            </label>
            <select
              className="focus:shadow-outline appearance-none rounded border px-3 py-2  leading-tight shadow focus:outline-none bg-transparent"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value=""></option>
              <option value="ADMIN">Admin</option>
              <option value="EMPLOYEE">User</option>
              <option value="AUDITOR">User</option>
              <option value="CUSTOMER">CUSTOMER</option>
            </select>
          </div>
        </div>
        <div className="mb-4 flex flex-col">
          <label className="mb-2  block font-bold" htmlFor="desc">
            Description
          </label>
          <input
            className="focus:shadow-outline h-20 appearance-none rounded border px-2  py-1 leading-tight shadow focus:outline-none bg-transparent"
            id="desc"
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="mb-4 flex flex-row">
          <div className="mr-2 flex w-1/2 flex-col">
            <label className="mb-2  block font-bold" htmlFor="email">
              Email
            </label>
            <input
              className="focus:shadow-outline appearance-none rounded border px-3 py-2  leading-tight shadow focus:outline-none bg-transparent"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="ml-2 flex w-1/2 flex-col">
            <label className="mb-2  block font-bold" htmlFor="password">
              Password
            </label>
            <input
              className="focus:shadow-outline appearance-none rounded border px-3 py-2  leading-tight shadow focus:outline-none bg-transparent"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {role === "CUSTOMER" && (
          <div className="mb-4 flex flex-col">
            <label className="mb-2  block font-bold" htmlFor="customer">
              Customer
            </label>
            <input
              className="focus:shadow-outline appearance-none rounded border px-3 py-2  leading-tight shadow focus:outline-none bg-transparent"
              id="customer"
              type="text"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
          </div>
        )}
        <div className="flex justify-center">
          <button
            className="focus:shadow-outline rounded border bg-transparent px-4 py-2 font-bold hover:bg-blue focus:outline-none"
            type="submit"
          >
            Add User
          </button>
        </div>
      </form>
    </main>
  );
}
