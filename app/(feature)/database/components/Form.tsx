"use client";

import { Metadata } from "next";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { iBankAccount, iCustomer, iDOB } from "../interface";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";

export const metadata: Metadata = {
  title: "Database | BNI Custody System",
  description: "",
};

interface iProps{
  loader: any
  setLoader: any
  customer: iCustomer[],
  setCutomer: any
}

export default function Form({
  loader,
  setLoader,
  customer,
  setCutomer
}: iProps) {
  let [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [form, setForm] = useState<iCustomer>({
    id: null,
    name: "",
    address: "",
    telephone: "",
    expiry_date: null,
    business_category: "",
    service: "",
    email: "",
    key_person_name: "",
    key_person_dob: "",
    key_person_hp: "",
    board_of_director: [],
    bank_account: [],
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSubmit = async () => {

    if(
      form.name === "" ||
      form.address === "" ||
      form.telephone === "" ||
      form.business_category === "" ||
      form.service === "" ||
      form.email === "" || 
      form.key_person_name === "" ||
      form.key_person_dob === "" ||
      form.key_person_hp === ""
    ){
      console.log(form);
      toast.error("Please fill all form ...")
      return
    }

    const payload = JSON.stringify(form)
    const toastId = toast.loading("Creating...");
    const createCustomerRequest = fetch(
      // "https://bnicstdy-b41ad9b84aff.herokuapp.com/database",
      "http://bnicustody.site:8000/database/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.token,
        },
        body: payload,
      },
    ).then(async (response) => {
      if (response.status === 200 || response.status == 201) {
        const res = await response.json();
        const newCustomer = res.data.customer;
        // setCutomer([...customer, newCustomer])
        toast.success("Created!", { id: toastId });
        closeModal()
      } else {
        toast.error("Failed create customer!", { id: toastId });
      }
    }).catch((error) => {
      console.log('Error', error);
      toast.error(error.message, { id: toastId });
    });
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-lg bg-base-200 px-8 py-2 text-base-content hover:opacity-50"
        >
          Add
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-base-backdrop-200  p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {/* Payment successful */}
                  </Dialog.Title>
                  <main className="w-full grow rounded-tl-3xl bg-base-backdrop-200 p-10">
                    {/* <div className="rounded-lg bg-[#D9D9D9] px-5 py-5"> */}
                    <h2 className="text-center text-xl font-bold">
                      Add Nasabah
                    </h2>

                    {/* Company */}
                    <h1 className="mb-3 text-lg font-bold">Company</h1>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4 flex flex-row gap-5">
                        <div className="mr-2 flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="npp"
                          >
                            Name
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="npp"
                            required
                            type="text"
                            value={form.name}
                            onChange={(e) =>
                              setForm({ ...form, name: e.target.value })
                            }
                          />
                        </div>
                        <div className="mr-2 flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="npp"
                          >
                            Address
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="npp"
                            type="text"
                            value={form.address}
                            onChange={(e) =>
                              setForm({ ...form, address: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="mb-4 flex flex-row gap-5">
                        <div className=" flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="role"
                          >
                            Service Category
                          </label>
                          <select
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="role"
                            value={form.service}
                            onChange={(e) =>
                              setForm({ ...form, service: e.target.value })
                            }
                          >
                            <option value=""></option>
                            <option value="Finance">Finance</option>
                            <option value="Insurance">Insurance</option>
                          </select>
                        </div>
                        <div className="ml-2 flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="role"
                          >
                            Business Category
                          </label>
                          <select
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="role"
                            value={form.business_category}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                business_category: e.target.value,
                              })
                            }
                          >
                            <option value=""></option>
                            <option value="Perseroan">Perseroan</option>
                            <option value="">Employee</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-4 flex flex-row gap-5">
                      <div className="mr-2 flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="email"
                          >
                            Email
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="mr-2 flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="npp"
                          >
                            Key Person - Name
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="npp"
                            type="text"
                            value={form.key_person_name}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                key_person_name: e.target.value,
                              })
                            }
                          />
                        </div>

                      </div>

                      <div className="mb-4 flex flex-row gap-5">
                 

                        <div className="mr-2 flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="email"
                          >
                            Key Person - Phone
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="email"
                            type="email"
                            value={form.key_person_hp}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                key_person_hp: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="mr-2 flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="npp"
                          >
                            Key Person - DOB
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="npp"
                            type="date"
                            value={form.key_person_dob}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                key_person_dob: e.target.value,
                              })
                            }
                          />
                        </div>
                        
                      </div>

                      <div className="mb-4 flex flex-row gap-5">
                 

                 <div className="mr-2 flex w-1/2 flex-col">
                   <label
                     className="mb-2  block font-bold"
                     htmlFor="email"
                   >
                     Telephone
                   </label>
                   <input
                     className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                     id="email"
                     type="email"
                     value={form.telephone}
                     onChange={(e) =>
                       setForm({
                         ...form,
                         telephone: e.target.value,
                       })
                     }
                   />
                 </div>

                 <div className="mr-2 flex w-1/2 flex-col">
                   <label
                     className="mb-2  block font-bold"
                     htmlFor="npp"
                   >
                     Expiry Date
                   </label>
                   <input
                     className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                     id="npp"
                     type="date"
                     value={form.expiry_date}
                     onChange={(e) =>
                       setForm({
                         ...form,
                         expiry_date: e.target.value,
                       })
                     }
                   />
                 </div>
                 
               </div>

                      {/* BOD */}
                      <div className="mt-6 flex flex-row justify-between">
                        <h1 className="mb-3 text-lg font-bold">
                          Board of Director
                        </h1>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => {
                            setForm({
                              ...form,
                              board_of_director: [
                                ...form.board_of_director,
                                {
                                  name: "",
                                  npp: "",
                                  role: "",
                                  description: "",
                                  photo: null,
                                  birth_date: null
                                },
                              ],
                            });
                          }}
                        >
                          Add
                        </button>
                      </div>

                      {form.board_of_director.map((ctx, key) => {
                        return (
                          <div className="mb-6 flex flex-col" key={key}>
                            <div className="mb-2 flex flex-row gap-5">
                              <div className="mr-2 flex w-1/2 flex-col">
                                <label
                                  className="mb-2  block font-bold"
                                  htmlFor="npp"
                                >
                                  Name
                                </label>
                                <input
                                  className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                                  id="npp"
                                  type="text"
                                  value={ctx.name}
                                  onChange={(e) => {
                                    let current = form.board_of_director;
                                    let changed = current[key];
                                    changed.name = e.target.value;
                                    current[key] = changed;
                                    setForm({
                                      ...form,
                                      board_of_director: current,
                                    });
                                  }}
                                />
                              </div>
                              <div className="mr-2 flex w-1/2 flex-col">
                                <label
                                  className="mb-2  block font-bold"
                                  htmlFor="npp"
                                >
                                  NPP
                                </label>
                                <input
                                  className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                                  id="npp"
                                  type="text"
                                  value={ctx.npp}
                                  onChange={(e) => {
                                    let current = form.board_of_director;
                                    let changed = current[key];
                                    changed.npp = e.target.value;
                                    current[key] = changed;
                                    setForm({
                                      ...form,
                                      board_of_director: current,
                                    });
                                  }}
                                />
                              </div>
                            </div>

                            <div className="mb-2 flex flex-row gap-5">
                              <div className="mr-2 flex w-1/2 flex-col">
                                <label
                                  className="mb-2  block font-bold"
                                  htmlFor="npp"
                                >
                                  Role
                                </label>
                                <input
                                  className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                                  id="npp"
                                  type="text"
                                  value={ctx.role}
                                  onChange={(e) => {
                                    let current = form.board_of_director;
                                    let changed = current[key];
                                    changed.role = e.target.value;
                                    current[key] = changed;
                                    setForm({
                                      ...form,
                                      board_of_director: current,
                                    });
                                  }}
                                />
                              </div>
                              <div className="mr-2 flex w-1/2 flex-col">
                                <label
                                  className="mb-2  block font-bold"
                                  htmlFor="npp"
                                >
                                  Birthday
                                </label>
                                <input
                                  className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                                  id="npp"
                                  type="date"
                                  value={ctx.birth_date}
                                  onChange={(e) => {
                                    let current = form.board_of_director;
                                    let changed = current[key];
                                    changed.birth_date = e.target.value;
                                    current[key] = changed;
                                    setForm({
                                      ...form,
                                      board_of_director: current,
                                    });
                                  }}
                                />
                              </div>
                            </div>

                            <div className="mb-2 flex flex-row gap-5">
                              <div className="mr-2 flex w-full flex-col">
                                <label
                                  className="mb-2  block font-bold"
                                  htmlFor="npp"
                                >
                                  Description
                                </label>
                                <input
                                  className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                                  id="npp"
                                  type="text"
                                  value={ctx.description}
                                  onChange={(e) => {
                                    let current = form.board_of_director;
                                    let changed = current[key];
                                    changed.description = e.target.value;
                                    current[key] = changed;
                                    setForm({
                                      ...form,
                                      board_of_director: current,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Key Person */}
                      <div className="mt-6 flex flex-row justify-between">
                        <h1 className="mb-3 text-lg font-bold">Bank Account</h1>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => {
                            setForm({
                              ...form,
                              bank_account: [
                                ...form.bank_account,
                                {
                                  name: "",
                                  number: "",
                                },
                              ],
                            });
                          }}
                        >
                          Add
                        </button>
                      </div>

                      {form.bank_account.map((ctx: iBankAccount, key) => {
                        return (
                          <div className="mb-4 flex flex-row gap-5" key={key}>
                            <div className="mr-2 flex w-1/2 flex-col">
                              <label
                                className="mb-2  block font-bold"
                                htmlFor="npp"
                              >
                                Number
                              </label>
                              <input
                                className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                                id="npp"
                                type="text"
                                value={ctx.number}
                                onChange={(e) => {
                                  let current = form.bank_account;
                                  let changed = current[key];
                                  changed.number = e.target.value;
                                  current[key] = changed;
                                  setForm({ ...form, bank_account: current });
                                }}
                              />
                            </div>
                            <div className="mr-2 flex w-1/2 flex-col">
                              <label
                                className="mb-2  block font-bold"
                                htmlFor="npp"
                              >
                                Name
                              </label>
                              <input
                                className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                                id="npp"
                                type="text"
                                value={ctx.name}
                                onChange={(e) => {
                                  let current = form.bank_account;
                                  let changed = current[key];
                                  changed.name = e.target.value;
                                  current[key] = changed;
                                  setForm({ ...form, bank_account: current });
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </form>
                  </main>

                  <div className="mt-4 flex flex-row justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
