"use client";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { usePathname } from "next/navigation";

export default function ListUser() {
  const router = useRouter();
  const pathname = usePathname();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [user, setUser] = useState({
    name: "",
    email: "",
    npp: "",
    role: "",
    description: "",
    picture: "",
  });

  const fetchUser = async () => {
    try {
      const segment = pathname.split("/");
      const id = segment[segment.length - 1];
      const response = await fetch(
        `https://bnicstdy-b41ad9b84aff.herokuapp.com/user/${id}`,
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

      const res = await response.json();
      const user = res.data.user;

      setUser(user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="container">
            <h1 className="mb-2 text-2xl font-bold">{user.name}</h1>
            <div className="flex flex-row">
              <div className="flex w-1/4">
                <div className="h-30 w-30 overflow-hidden rounded-lg">
                  <img
                    src="https://cdn.discordapp.com/attachments/1102768794629328929/1160548612477038662/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg?ex=6535101f&is=65229b1f&hm=e984805478569f1476be2a807bff520e359dcc33d6a2e8e28e1284dffc1cc1f8&"
                    alt="user"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="left w-1/2 flex-row">
                <div className="mb-2  block font-bold">Email</div>
                <div className="mb-2">{user.email}</div>
                <div className="mb-2  block font-bold">NPP</div>
                <div className="mb-2">{user.npp}</div>
                <div className="mb-2  block font-bold">Role</div>
                <div className="mb-2">{user.role}</div>
                <div className="mb-2  block font-bold">Description</div>
                <div className="mb-2">{user.description}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <h1 className="mb-2 text-2xl font-bold">Log Activity</h1>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row rounded-lg border p-3 shadow-lg">
            <div className="flex flex-col justify-between p-2">
              <div className="text-sm font-bold text-gray-500">4/10/2023</div>
              <div className="text-sm font-bold text-gray-400">11:46 PM</div>
            </div>
            <div className="flex flex-col p-2">
              <div className="text-sm font-bold text-gray-500">
                Name of User
              </div>
              <div className="text-sm font-bold text-gray-400">Desc of Log</div>
            </div>
          </div>

          <div className="flex flex-row rounded-lg border p-3 shadow-lg">
            <div className="flex flex-col justify-between p-2">
              <div className="text-sm font-bold text-gray-500">4/10/2023</div>
              <div className="text-sm font-bold text-gray-400">11:46 PM</div>
            </div>
            <div className="flex flex-col p-2">
              <div className="text-sm font-bold text-gray-500">
                Name of User
              </div>
              <div className="text-sm font-bold text-gray-400">Desc of Log</div>
            </div>
          </div>
          <div className="flex flex-row rounded-lg border p-3 shadow-lg">
            <div className="flex flex-col justify-between p-2">
              <div className="text-sm font-bold text-gray-500">4/10/2023</div>
              <div className="text-sm font-bold text-gray-400">11:46 PM</div>
            </div>
            <div className="flex flex-col p-2">
              <div className="text-sm font-bold text-gray-500">
                Name of User
              </div>
              <div className="text-sm font-bold text-gray-400">Desc of Log</div>
            </div>
          </div>
          <div className="flex flex-row rounded-lg border p-3 shadow-lg">
            <div className="flex flex-col justify-between p-2">
              <div className="text-sm font-bold text-gray-500">4/10/2023</div>
              <div className="text-sm font-bold text-gray-400">11:46 PM</div>
            </div>
            <div className="flex flex-col p-2">
              <div className="text-sm font-bold text-gray-500">
                Name of User
              </div>
              <div className="text-sm font-bold text-gray-400">Desc of Log</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
