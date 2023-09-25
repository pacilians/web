// "use client";

import { usePathname } from "next/navigation";

import ThemeSelector from "./ThemeSelector";

export default function Navbar() {
  // const pathname = usePathname();

  // if (pathname === "/auth") {
  //   return null;
  // }

  return (
    <nav className="flex h-20 items-center justify-between px-10">
      <h3 className="text-3xl font-semibold text-base-content-100">
        Dashboard
      </h3>
      <ThemeSelector />
    </nav>
  );
}
