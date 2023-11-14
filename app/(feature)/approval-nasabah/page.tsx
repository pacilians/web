import { Metadata } from "next";
import { cookies } from "next/headers";
import List from "./list";



export const metadata: Metadata = {
    title: "Approval Nasabah | BNI Custody System",
    description: "",
};

async function getData(token: string) {

}

export default async function ApprovalNasabah() {
    return (
        <main className="w-full grow rounded-tl-3xl bg-base-backdrop-200 p-10 shadow-2xl">
            <List />
        </main>
    );
}
