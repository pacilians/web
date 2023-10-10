import { Metadata } from "next";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

export const metadata: Metadata = {
  title: "Database | BNI Custody System",
  description: "",
};

export default function Filter() {
  let [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Panel>
        <Dialog.Description>
          <main>
            <div className="grid w-[25%] grid-cols-2 gap-5">
              <div className="flex flex-col ">
                <div className="flex flex-col">
                  <div>
                    <h2 className="text-xl font-bold">Filter By</h2>
                  </div>
                  <div className="px-3 text-justify">
                    <h3 className="p-5 text-lg font-bold">Category</h3>
                    <input id="default-checkbox" type="checkbox" value="" />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Insurance
                    </label>
                  </div>

                  <div className="px-3 text-justify">
                    <input id="default-checkbox" type="checkbox" value="" />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Asset
                    </label>
                  </div>

                  <div className="px-3 text-justify">
                    <input id="default-checkbox" type="checkbox" value="" />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Management
                    </label>
                  </div>

                  <div className="px-3 text-justify">
                    <input id="default-checkbox" type="checkbox" value="" />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Security
                    </label>
                  </div>

                  <div className="px-3 text-justify">
                    <input id="default-checkbox" type="checkbox" value="" />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Individual
                    </label>
                  </div>

                  <div className="px-3 text-justify">
                    <input id="default-checkbox" type="checkbox" value="" />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Bank
                    </label>
                  </div>

                  <div className="px-3 text-justify">
                    <input id="default-checkbox" type="checkbox" value="" />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Pension Fund
                    </label>
                  </div>

                  <div className="px-3 text-justify">
                    <input id="default-checkbox" type="checkbox" value="" />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Foundation
                    </label>
                  </div>

                  <div className="px-3 text-justify">
                    <input id="default-checkbox" type="checkbox" value="" />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Overseas
                    </label>
                  </div>

                  <div className="px-3 text-justify">
                    <input id="default-checkbox" type="checkbox" value="" />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Government Agency
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col ">
                <div className="flex flex-col">
                  <div className="px-3 text-justify">
                    <h3 className="p-5 text-lg font-bold">Core</h3>
                    <input id="default-checkbox" type="checkbox" value="" />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Core
                    </label>
                  </div>

                  <div className="px-3 text-justify">
                    <input id="default-checkbox" type="checkbox" value="" />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Custody
                    </label>
                  </div>

                  <div className="px-3 text-justify">
                    <input id="default-checkbox" type="checkbox" value="" />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Trustee
                    </label>
                  </div>

                  <div className="px-3 text-justify">
                    <input id="default-checkbox" type="checkbox" value="" />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Government Agency
                    </label>
                  </div>

                  <div className="px-3 text-justify">
                    <input id="default-checkbox" type="checkbox" value="" />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Fund Service
                    </label>
                  </div>

                  <div className="px-3 text-justify">
                    <input id="default-checkbox" type="checkbox" value="" />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Wali Amanat
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </Dialog.Description>
      </Dialog.Panel>
    </Dialog>
  );
}
