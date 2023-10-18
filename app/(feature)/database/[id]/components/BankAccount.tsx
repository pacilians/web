// components
import Iconify from "@components/Iconify";

// types
import { BankAccount } from "@customTypes/types";

export default function BankAccount({ bankAccount }: { bankAccount: BankAccount }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-base-300 bg-base-200/40 py-5 pl-5 pr-3 text-base-content-400">
      <h3 className="mb-2 text-xl font-semibold text-base-content-200">
        Bank Account
      </h3>
      <button className="absolute right-3 top-3 translate-x-[calc(100%+0.75rem)] translate-y-[calc(-100%-0.75rem)] scale-0 rounded-lg border border-base-200 bg-base-100 p-2 transition duration-300 ease-out hover:border-base-300 hover:bg-base-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:shadow-sm">
        <Iconify
          icon="solar:pen-bold-duotone"
          className="text-lg text-base-content-100"
        />
      </button>
    </div>
  );
}
