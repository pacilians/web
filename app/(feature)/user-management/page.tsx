import { Metadata } from "next";
import ListUser from './_page/ListUser'

export const metadata: Metadata = {
  title: "User Management | BNI Custody System",
  description: "",
};

export default function ListUsers() {
  return (
    <main className="w-full grow rounded-tl-3xl bg-base-backdrop-200 p-10 shadow-2xl">
      <ListUser/>
    </main>
  );
}
