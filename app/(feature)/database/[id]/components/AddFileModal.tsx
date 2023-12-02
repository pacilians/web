"use client";

// apis
import { fetchMasterData } from "@api/api";

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

// utils
import { cn } from "@utils/utils";

export default function CreateFileModal() {
  const [categories, setCategories] = useState([{ value: "", label: "" }]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = (await fetchMasterData()).mandatory.map(
        (item: { id: string, name: string }) => ({
          value: item.id,
          label: item.name,
        }),
      );
      setCategories(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const uploadFile = (file: File) => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add file</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Monthly Asset Report</DialogTitle>
          <DialogDescription>
            Upload an excel file of this month&apos;s asset report.
          </DialogDescription>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {value
                  ? categories.find((category) => category.value === value)
                      ?.label
                  : "Select category..."}
                <Iconify
                  icon="ph:caret-up-down-bold"
                  className="ml-2 shrink-0 text-xs opacity-50"
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search category..." />
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup>
                  {categories.map((category) => (
                    <CommandItem
                      key={category.value.toString()}
                      value={category.value.toString()}
                      onSelect={(currentValue) => {
                        setValue(
                          currentValue === value.toString()
                            ? 0
                            : parseInt(currentValue),
                        );
                      }}
                    >
                      <Iconify
                        icon="ph:check-bold"
                        className={cn(
                          "mr-2 text-xs",
                          value === category.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {category.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FileUploader
            handleChange={(file: File) => uploadFile(file)}
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
          <Button type="submit">Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
