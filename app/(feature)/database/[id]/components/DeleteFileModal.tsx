"use client";

// apis
import { deleteFile } from "../api";

// components
import { Button } from "@components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@components/popover";
import Iconify from "@components/Iconify";

// libraries
import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { usePathname } from "next/navigation";

// types
import { FileNasabah } from "./FileTabGroup";

// utils
import { cn } from "@utils/utils";

export default function DeleteFileModal({ file }: { file: FileNasabah }) {
  console.log(file);
  //   const [open, setOpen] = useState(false);
  //   const [value, setValue] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies();
  //   const segments = usePathname().split("/");

  return (
    <>
      <Toaster />
      <Dialog>
        <DialogTrigger
          asChild
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <Button variant="outline" size="icon">
            <Iconify icon="solar:trash-bin-minimalistic-bold-duotone" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this file?
            </DialogTitle>
            <DialogDescription className="pb-5">
              You cannot undo this action later.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => {
                deleteFile(file.id, file.id_customer, cookies.token);
                window.location.reload();
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
