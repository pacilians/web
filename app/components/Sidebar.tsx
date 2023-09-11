import Image from "next/image";

import Iconify from "./Iconify";

export default function Sidebar() {
  return (
    <nav className="flex h-screen w-1/5 flex-col items-center justify-between bg-sky-800 p-5">
      <Image
        src="/logo-bni.svg"
        alt=""
        width={175}
        height={57}
        className="h-fit w-4/5"
      />
      <div className="flex flex-col justify-stretch gap-2 rounded-xl border border-sky-700 bg-sky-900 p-5">
        <button type="button" className="btn">
          <Iconify icon="solar:chart-bold-duotone" />
          Dashboard
        </button>
        <button type="button" className="btn">
          Documents
        </button>
        <button type="button" className="btn">
          Notification
        </button>
        <button type="button" className="btn">
          Checklist
        </button>
      </div>
    </nav>
  );
}
