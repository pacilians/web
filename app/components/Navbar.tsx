"use client";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import Iconify from "./Iconify";
import ThemeSelector from "./ThemeSelector";

export default function Navbar() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <nav className="flex h-20 shrink-0 items-center justify-between px-10">
      <div className="flex items-center">
        {segments.map((segment, index) => (
          <Fragment key={segment}>
            {index > 0 && (
              <Iconify
                icon="solar:alt-arrow-right-linear"
                className="mx-2 text-2xl"
              />
            )}
            <span
              className={`text-3xl ${
                index === segments.length - 1
                  ? "text-base-content-100"
                  : "text-base-content-500"
              }`}
            >
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </span>
          </Fragment>
        ))}
      </div>
      <ThemeSelector />
    </nav>
  );
}
