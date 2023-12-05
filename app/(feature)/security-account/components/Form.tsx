"use client";

import { Metadata } from "next";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { iSecurities } from "../interface";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";

export const metadata: Metadata = {
  title: "Database | BNI Custody System",
  description: "",
};

interface iProps {
  loader: any;
  setLoader: any;
  customer: iSecurities[];
  setCutomer: any;
}

export default function Form({
  loader,
  setLoader,
  customer,
  setCutomer,
}: iProps) {
  let [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [form, setForm] = useState<iSecurities>({
    id: null,
    id_customer: "",
    kode_bk: "",
    no_rekening_investor: "",
    nama_perusahaan: "",
    nama_awal: "",
    nama_tengah: "",
    nama_belakang: "",
    ktp: "",
    npwp: "",
    no_paspor: "",
    no_pendaftaran_usaha: "",
    tanggal_pendirian: "",
    tempat_pendirian: "",
    tipe_investor: "",
    jenis_kelamin: "",
    jenis_pekerjaan: "",
    alamat_identitas_1: "",
    alamat_identitas_2: "",
    kode_kota: "",
    kode_provinsi: "",
    kode_negara: "",
    no_telepon: "",
    no_hp: "",
    email: "",
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSubmit = async () => {
    if (
      form.id === "" ||
      form.kode_bk === "" ||
      form.no_rekening_investor === "" ||
      form.nama_perusahaan === "" ||
      form.nama_awal === "" ||
      form.nama_tengah === "" ||
      form.nama_belakang === "" ||
      form.ktp === "" ||
      form.npwp === "" ||
      form.no_paspor === "" ||
      form.no_pendaftaran_usaha === "" ||
      form.tanggal_pendirian === "" ||
      form.tempat_pendirian === "" ||
      form.tipe_investor === "" ||
      form.jenis_kelamin === "" ||
      form.jenis_pekerjaan === "" ||
      form.alamat_identitas_1 === "" ||
      form.alamat_identitas_2 === "" ||
      form.kode_kota === "" ||
      form.kode_provinsi === "" ||
      form.kode_negara === "" ||
      form.no_telepon === "" ||
      form.no_hp === "" ||
      form.email === ""
    ) {
      console.log(form);
      toast.error("Please fill all form ...");
      return;
    }

    const payload = JSON.stringify(form);
    const toastId = toast.loading("Creating...");
    const createCustomerRequest = fetch(
      `http://bnicustody.site:8000/security-account/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.token,
        },
        body: payload,
      },
    )
      .then(async (response) => {
        if (response.status === 200 || response.status == 201) {
          const res = await response.json();
          const newCustomer = res.data.customer;
          // setCutomer([...customer, newCustomer])
          toast.success("Created!", { id: toastId });
          closeModal();
        } else {
          toast.error("Failed to create an account!", { id: toastId });
        }
      })
      .catch((error) => {
        console.log("Error", error);
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
                      Create Securities Account
                    </h2>

                    <form onSubmit={handleSubmit}>
                      <div className="mb-4 flex flex-row gap-5">
                        <div className="mr-2 flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="npp"
                          >
                            ID Customer
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="npp"
                            required
                            type="text"
                            value={form.kode_bk}
                            onChange={(e) =>
                              setForm({ ...form, kode_bk: e.target.value })
                            }
                          />
                        </div>
                        <div className="mr-2 flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="npp"
                          >
                            No. Rekening Investor
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="npp"
                            type="text"
                            value={form.no_rekening_investor}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                no_rekening_investor: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="mb-4 flex flex-row gap-5">
                        <div className=" flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="npp"
                          >
                            Nama Awal
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="npp"
                            type="text"
                            value={form.nama_awal}
                            onChange={(e) =>
                              setForm({ ...form, nama_awal: e.target.value })
                            }
                          />
                        </div>
                        <div className="ml-2 flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="npp"
                          >
                            Nama Tengah
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="npp"
                            type="text"
                            value={form.nama_tengah}
                            onChange={(e) =>
                              setForm({ ...form, nama_tengah: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div className="mb-4 flex flex-row gap-5">
                        <div className=" flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="npp"
                          >
                            Nama Belakang
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="npp"
                            type="text"
                            value={form.nama_belakang}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                nama_belakang: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="ml-2 flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="npp"
                          >
                            KTP
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="npp"
                            type="text"
                            value={form.ktp}
                            onChange={(e) =>
                              setForm({ ...form, ktp: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div className="mb-4 flex flex-row gap-5">
                        <div className=" flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="npp"
                          >
                            NPWP
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="npp"
                            type="text"
                            value={form.npwp}
                            onChange={(e) =>
                              setForm({ ...form, npwp: e.target.value })
                            }
                          />
                        </div>
                        <div className="ml-2 flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="npp"
                          >
                            No. Passport
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="npp"
                            type="text"
                            value={form.no_paspor}
                            onChange={(e) =>
                              setForm({ ...form, no_paspor: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div className="mb-4 flex flex-row gap-5">
                        <div className=" flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="npp"
                          >
                            No. Pendaftaran Usaha
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="npp"
                            type="text"
                            value={form.no_pendaftaran_usaha}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                no_pendaftaran_usaha: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="ml-2 flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="npp"
                          >
                            Tanggal Pendirian
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="npp"
                            type="text"
                            value={form.tanggal_pendirian}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                tanggal_pendirian: e.target.value,
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
                            Tempat Pendirian
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="email"
                            type="email"
                            value={form.tempat_pendirian}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                tempat_pendirian: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="mr-2 flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="email"
                          >
                            Tipe Investor
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="email"
                            type="email"
                            value={form.tipe_investor}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                tipe_investor: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="mr-2 flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="email"
                          >
                            Jenis Kelamin
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="email"
                            type="email"
                            value={form.jenis_kelamin}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                jenis_kelamin: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="mr-2 flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="email"
                          >
                            Jenis Pekerjaan
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="email"
                            type="email"
                            value={form.jenis_pekerjaan}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                jenis_pekerjaan: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="mr-2 flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="email"
                          >
                            Alamat Identitas 1
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="email"
                            type="email"
                            value={form.alamat_identitas_1}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                alamat_identitas_1: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="mr-2 flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="email"
                          >
                            Alamat Identitas 2
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="email"
                            type="email"
                            value={form.alamat_identitas_2}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                alamat_identitas_2: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="mr-2 flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="email"
                          >
                            Kode Kota
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="email"
                            type="email"
                            value={form.kode_kota}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                kode_kota: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="mr-2 flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="email"
                          >
                            Kode Provinsi
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="email"
                            type="email"
                            value={form.kode_provinsi}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                kode_provinsi: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="mr-2 flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="email"
                          >
                            Kode Negara
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="email"
                            type="email"
                            value={form.kode_negara}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                kode_negara: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="mr-2 flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="email"
                          >
                            No. Telepon
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="email"
                            type="email"
                            value={form.no_telepon}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                no_telepon: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="mr-2 flex w-1/2 flex-col">
                          <label
                            className="mb-2  block font-bold"
                            htmlFor="email"
                          >
                            No. HP
                          </label>
                          <input
                            className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
                            id="email"
                            type="email"
                            value={form.no_hp}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                no_hp: e.target.value,
                              })
                            }
                          />
                        </div>

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
                      </div>
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
