import { Metadata } from "next";

import Form from "./components/Form";

export const metadata: Metadata = {
  title: "Login | BNI Custody System",
  description: "",
};

export default function Login() {
  return (
    <section className="flex w-full px-40 py-10">
      <div className="flex w-full overflow-hidden rounded-2xl bg-base-backdrop-200 shadow-xl">
        <Form />
        <div className="w-1/2 bg-orange-600">
          <div className="h-full w-full bg-[url('/images/bg-auth.svg')] object-cover" />
        </div>
      </div>
    </section>
  );
}
