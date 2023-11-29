import React from "react";

interface BankAccount {
  id: string;
  number: string;
  name: string;
}


export default function BankAccounts({ bankAccounts }: {bankAccounts: BankAccount[]}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-base-300 px-8 py-5 text-base-content-400">
      <h3 className="mb-2 text-xl font-semibold text-base-content-200">
          Bank Acocunt
      </h3>
      {bankAccounts.map((data) => (
        <div className="mb-2 flex flex-col" key={data.id}>
          <p className="font-bold">
            Name: <span className="font-normal">{data.name}</span>
          </p>
          <p className="font-bold">
            Number:
            <span className="font-normal">{data.number}</span>
          </p>
        </div>
      ))}

    </div>
  );
}
