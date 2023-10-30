"use client";

// components
import Iconify from "./Iconify";

// libraries
import { usePathname } from "next/navigation";
import { Fragment } from "react";

// stores
import { useNasabahStore } from "@store/zustand";

export default function NavTitle() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment !== "");

  const nasabahName = useNasabahStore((state) => state.name);

  return (
    <>
      {segments.map((segment, index) => (
        <Fragment key={segment}>
          {index > 0 && (
            <Iconify
              icon="solar:alt-arrow-right-linear"
              className="mx-2 text-2xl"
            />
          )}
          <span
            className={`truncate text-2xl capitalize ${
              index === segments.length - 1
                ? "text-base-content-100"
                : "text-base-content-500"
            }`}
          >
            {segments[0] === "database" && index === 1 ? nasabahName : segment}
          </span>
        </Fragment>
      ))}
    </>
  );
}
