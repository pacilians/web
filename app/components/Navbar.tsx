"use client";

import { usePathname } from "next/navigation";

import ThemeSelector from "./ThemeSelector";

export default function Navbar() {
  const pathname = usePathname();

  const title = pathname
    ?.split("/")
    ?.pop()
    ?.split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <nav className="flex h-20 items-center justify-between px-10">
      <h3 className="text-3xl font-semibold text-base-content-100">{title}</h3>
      <ThemeSelector />
    </nav>
  );
}
