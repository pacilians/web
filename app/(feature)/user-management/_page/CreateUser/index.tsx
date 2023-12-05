"use client";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

export default function CreateUser() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    npp: "",
    role: "",
    description: "",
    email: "",
    customer: "",
  });
  const [listCustomer, setListCustomer] = useState([{ name: "", id: "" }]);
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if(
      form.name === "" || 
      form.npp === "" ||
      form.role === "" ||
      form.description === "" ||
      form.email === "" 
    ){
      toast.error("Please fill all forms ....")
      return
    }

    const payload = JSON.stringify({
      email: form.email,
      name: form.name,
      npp: form.npp,
      role: form.role,
      description: form.description,
    });
    const createUserRequest = fetch(
      "http://bnicustody.site:8000/user/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.token,
        },
        body: payload,
      },
    ).then(async (response) => {
      if (response.status === 200) {
        router.push("/user-management");
      } else {
        throw new Error("Failed Create User");
      }
    });

    toast.promise(createUserRequest, {
      loading: "Creating user...",
      success: "User has been created",
      error: "Failed creating user",
    });
  };

  const fetchCustomer = async () => {
    try {
      const response = await fetch(
        "http://bnicustody.site:8000/database/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: cookies.token,
          },
        },
      );

      if (!response.ok) {
        console.error(
          "Error fetching customer:",
          "Network response was not ok",
        );
      }

      const res = await response.json();
      const customer = res.data.customers;
      console.log(customer);
      setListCustomer(customer);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  return (
    <main className="w-full grow rounded-tl-3xl p-1">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col">
          <label className="mb-2 block font-bold" htmlFor="name">
            Name
          </label>
          <input
            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3 py-2 leading-tight shadow focus:outline-none"
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="mb-4 flex flex-row">
          <div className="mr-2 flex w-1/2 flex-col">
            <label className="mb-2  block font-bold" htmlFor="npp">
              npp
            </label>
            <input
              className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
              id="npp"
              type="text"
              value={form.npp}
              onChange={(e) => setForm({ ...form, npp: e.target.value })}
            />
          </div>
          <div className="ml-2 flex w-1/2 flex-col">
            <label className="mb-2  block font-bold" htmlFor="role">
              Role
            </label>
            <select
              className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
              id="role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value=""></option>
              <option value="ADMIN">Admin</option>
              <option value="EMPLOYEE">Employee</option>
              <option value="AUDITOR">Auditor</option>
              <option value="CUSTOMER">Customer</option>
              <option value="HOC">Head of Custody</option>
            </select>
          </div>
        </div>
        <div className="mb-4 flex flex-col">
          <label className="mb-2  block font-bold" htmlFor="desc">
            Description
          </label>
          <input
            className="focus:shadow-outline h-20 appearance-none rounded border bg-transparent  px-2 py-1 leading-tight shadow focus:outline-none"
            id="desc"
            type="text"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="mb-4 flex flex-row">
          <div className="mr-2 flex w-full flex-col">
            <label className="mb-2  block font-bold" htmlFor="email">
              Email
            </label>
            <input
              className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </div>
        {form.role === "CUSTOMER" && (
          <div className="mb-4 flex flex-col">
            <label className="mb-2  block font-bold" htmlFor="customer">
              Customer
            </label>
            <select
              onChange={(event) => {
                setForm({ ...form, customer: event.target.value });
              }}
              className="rounded border p-2"
            >
              <option value="">Select an option</option>
              {listCustomer.map((option: any, index) => (
                <option key={index} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex justify-center">
          <button
            className="focus:shadow-outline hover:bg-blue rounded border bg-transparent px-4 py-2 font-bold focus:outline-none"
            type="submit"
          >
            Add User
          </button>
        </div>
      </form>
      <Toaster/>
    </main>
  );
}
