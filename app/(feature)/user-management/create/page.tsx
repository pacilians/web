import { Metadata } from "next";
import CreateUserPage from "../_page/CreateUser"
export const metadata: Metadata = {
  title: "Create User | BNI Custody System",
  description: "",
};

export default function CreateUser() {
  return (
    <main className="w-full grow rounded-tl-3xl bg-base-50 p-10 shadow-2xl">
      <CreateUserPage/>
    </main>
  );
}
