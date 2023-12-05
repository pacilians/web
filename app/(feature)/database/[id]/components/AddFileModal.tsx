"use client";

// apis
import { fetchMasterData } from "@api/api";
import { createFile } from "../api";

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

// utils
import { cn } from "@utils/utils";

export default function CreateFileModal({ mandatory }: { mandatory: boolean }) {
  const [categories, setCategories] = useState([{ id: "", name: "" }]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [file, setFile] = useState<File>(null!);
  const [cookies, setCookie, removeCookie] = useCookies();
  const segments = usePathname().split("/");

  useEffect(() => {
    const fetchData = async () => {
      const data = (await fetchMasterData()).mandatory.map(
        (item: { id: string; name: string }) => ({
          id: item.id.toString(),
          name: item.name,
        }),
      );
      setCategories(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Toaster />
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add file</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {mandatory ? "Upload Mandatory File" : "Upload Additional File"}
            </DialogTitle>
            <DialogDescription className="pb-5">
              Please upload a .pdf file with a maximum size of 5mb.
            </DialogDescription>
            {mandatory && (
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    className="justify-between"
                  >
                    {value
                      ? categories.find((category) => category.id === value)
                          ?.name
                      : "Select category..."}
                    <Iconify
                      icon="ph:caret-up-down-bold"
                      className="ml-2 shrink-0 text-xs opacity-50"
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          key={category.id}
                          value={category.name}
                          onSelect={() => {
                            setValue(category.id === value ? "" : category.id);
                            setOpen(false);
                          }}
                        >
                          <Iconify
                            icon="ph:check-bold"
                            className={cn(
                              "mr-2 text-xs",
                              value === category.id
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {category.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
            <FileUploader
              handleChange={(file: File) => {
                console.log(file);
                setFile(file);
              }}
              name="file"
              required
              types={["pdf"]}
              maxSize={5}
            />
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4"></div>
            <div className="grid grid-cols-4 items-center gap-4"></div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                createFile(
                  segments[segments.length - 1],
                  cookies.token,
                  file,
                  mandatory
                    ? categories.find((category) => category.id === value)!.name
                    : file.name,
                  mandatory ? "MANDATORY" : "ADDITIONAL",
                );
              }}
            >
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
