"use client";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import UserCard from "./card";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import Loading from "@components/Loading";

export default function ListUser() {
  const router = useRouter();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies();
  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${process.env.SERVER}/user/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: cookies.token,
          },
        },
      );

      if (!response.ok) {
        console.error("Error fetching user:", "Network response was not ok");
      }

      const data = await response.json();
      const user = data.data.users;

      setUser(user);
      setLoading(!loading)
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if(!loading)
    return <Loading/>
  return (
    <div className="flex flex-col">
      <div className="mb-6 flex justify-between rounded-lg">
        <h1 className="mb-2 text-2xl font-bold">User</h1>
        <button
          className="py-auto hover:text-white-400 rounded px-4 font-bold hover:bg-blue-700"
          onClick={() => {
            router.push(`/user-management/create`);
          }}
        >
          Add
        </button>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-10">
        {user.map((data: any , key: any) => (
          <UserCard
            id={data.id}
            key={key}
            name={data.name}
            picture={data.photo}
            role={data.role}
            npp={data.npp}
          />
        ))}
      </div>
    </div>
  );
}
