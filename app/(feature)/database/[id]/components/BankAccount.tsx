"use client";

// components
import Iconify from "@components/Iconify";

// libraries
import { useState } from "react";

// types
import { BankAccount } from "@customTypes/types";

// utils
import { randomGradient } from "@utils/utils";

export default function BankAccount({
  bankAccount,
}: Readonly<{
  bankAccount: BankAccount[];
}>) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="group relative flex basis-1/2 flex-col gap-4 overflow-y-auto rounded-xl border border-base-300 bg-base-200/40 px-5 pt-5 text-base-content-400">
      <h3 className="text-xl font-semibold text-base-content-200">
        Bank Account
      </h3>
      <div className="relative -mx-5 flex h-10 grow snap-y snap-mandatory flex-col gap-3 overflow-y-scroll overscroll-contain rounded-lg pb-5 pl-5 pr-1 text-slate-800">
        {bankAccount.map((account) => (
          <div
            className={`flex aspect-[2/1] w-full shrink-0 snap-start flex-col justify-end gap-4 rounded-lg px-4 py-5 ${randomGradient()} shadow-xl`}
            key={account.id}
          >
            <p className="font-mono text-2xl mix-blend-color-burn">
              {account.number}
            </p>
            <p className="mix-blend-color-burn">{account.name}</p>
          </div>
        ))}
      </div>
      <div
        className={`absolute right-3 top-3 ${
          !isEditing ? "-translate-y-6 translate-x-6 scale-0" : ""
        } flex justify-end gap-1 transition duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100`}
      >
        {isEditing ? (
          <button
            type="submit"
            className="rounded-lg border border-base-200 bg-base-100 p-2 hover:border-base-300 hover:bg-base-200 group-hover:shadow-sm"
          >
            <Iconify
              icon="iconamoon:check-bold"
              className="text-lg text-base-content-100"
            />
          </button>
        ) : null}
        <button
          className="rounded-lg border border-base-200 bg-base-100 p-2 hover:border-base-300 hover:bg-base-200 group-hover:shadow-sm"
          onClick={(event: React.MouseEvent) => {
            event.preventDefault();
            setIsEditing(!isEditing);
          }}
        >
          <Iconify
            icon={isEditing ? "iconamoon:close-bold" : "solar:pen-bold-duotone"}
            className="text-lg text-base-content-100"
          />
        </button>
      </div>
    </div>
  );
}
