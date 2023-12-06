"use client";

import { Metadata } from "next";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { iSecurities } from "../interface";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { usePathname, useRouter } from "next/navigation";

export default function CreateSecurityAccount() {
  let [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const router = useRouter();
  const [database, setDatabase] = useState([]);
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

  const fetchData = async () => {
    try {
      const response = await fetch(`http://bnicustody.site:8000/database`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.token,
        },
      });

      if (!response.ok) {
        console.error(
          "Error fetching announcement:",
          "Network response was not ok",
        );
      }

      const res = await response.json();
      const dat = res.data.customers;
      setDatabase(dat);
    } catch (error) {
      console.error("Error fetching notif:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      form.tanggal_pendirian === "" ||
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
          // setCutomer([...customer, newCustomer])
          toast.success("Created!", { id: toastId });
          router.push("/security-account");
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
    <main className="w-full grow rounded-tl-3xl bg-base-backdrop-200 p-10">
      {/* <div className="rounded-lg bg-[#D9D9D9] px-5 py-5"> */}
      <h2 className="text-center text-xl font-bold">
        Create Securities Account
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-row gap-5">
          <div className="mr-2 flex w-1/2 flex-col">
            <label className="mb-2  block font-bold" htmlFor="npp">
              ID Customer *
            </label>
            {/* <input
              className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
              id="npp"
              required
              type="text"
              value={form.id_customer}
              onChange={(e) =>
                setForm({ ...form, id_customer: e.target.value })
              }
            /> */}

            <select
              className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
              id="role"
              onChange={(e: any) => {
                const id = e.target.value;
                const comp: any = database.filter(
                  (ctx: any) => ctx.id === id,
                )[0];
                console.log(comp);
                setForm({
                  ...form,
                  id_customer: id,
                  nama_perusahaan: comp.name,
                });
              }}
            >
              <option key="" value=""></option>
              {database.map((ctx: any, key) => (
                <option onClick={() => {}} key={key} value={ctx.id}>
                  {ctx.name}
                </option>
              ))}
              {/* <option value=""></option>
              <option value="ADMIN">Admin</option>
              <option value="EMPLOYEE">Employee</option>
              <option value="AUDITOR">Auditor</option>
              <option value="CUSTOMER">Customer</option>
              <option value="HOC">Head of Custody</option> */}
            </select>
          </div>
          <div className="mr-2 flex w-1/2 flex-col">
            <label className="mb-2  block font-bold" htmlFor="npp">
              No. Rekening Investor *
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
            <label className="mb-2  block font-bold" htmlFor="npp">
              Nama Awal *
            </label>
            <input
              className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
              id="npp"
              type="text"
              value={form.nama_awal}
              onChange={(e) => setForm({ ...form, nama_awal: e.target.value })}
            />
          </div>
          <div className="ml-2 flex w-1/2 flex-col">
            <label className="mb-2  block font-bold" htmlFor="npp">
              Nama Tengah *
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
            <label className="mb-2  block font-bold" htmlFor="npp">
              Nama Belakang *
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
            <label className="mb-2  block font-bold" htmlFor="npp">
              KTP *
            </label>
            <input
              className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
              id="npp"
              type="text"
              value={form.ktp}
              onChange={(e) => setForm({ ...form, ktp: e.target.value })}
            />
          </div>
        </div>

        <div className="mb-4 flex flex-row gap-5">
          <div className=" flex w-1/2 flex-col">
            <label className="mb-2  block font-bold" htmlFor="npp">
              NPWP *
            </label>
            <input
              className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
              id="npp"
              type="text"
              value={form.npwp}
              onChange={(e) => setForm({ ...form, npwp: e.target.value })}
            />
          </div>
          <div className="ml-2 flex w-1/2 flex-col">
            <label className="mb-2  block font-bold" htmlFor="npp">
              No. Passport *
            </label>
            <input
              className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
              id="npp"
              type="text"
              value={form.no_paspor}
              onChange={(e) => setForm({ ...form, no_paspor: e.target.value })}
            />
          </div>
        </div>

        <div className="mb-4 flex flex-row gap-5">
          <div className=" flex w-1/2 flex-col">
            <label className="mb-2  block font-bold" htmlFor="npp">
              No. Pendaftaran Usaha *
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
            <label className="mb-2  block font-bold" htmlFor="npp">
              Tanggal Pendirian *
            </label>
            <input
              className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
              id="npp"
              type="date"
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
        <div className="mb-4 flex flex-row gap-5 overflow-x-scroll">
          <div className="mr-2 flex w-1/2 flex-col">
            <label className="mb-2  block font-bold" htmlFor="email">
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
            <label className="mb-2  block font-bold" htmlFor="email">
              Tipe Investor
            </label>
            <select
              className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
              id="role"
              onChange={(e: any) => {
                const val = e.target.value;
                setForm({
                  ...form,
                  tipe_investor: val,
                });
              }}
            >
              <option value=""></option>
              <option value="1">OT : Others</option>
              <option value="2">CP: Corporate</option>
              <option value="3">FD: Foundation</option>
              <option value="4">IB: Financial Institution</option>
              <option value="5">IS: Insurance</option>
              <option value="6">MF: Mutual Fund</option>
              <option value="7">PF: Pension Fund</option>
              <option value="8">SC: Securities Company</option>
              <option value="9">ID: Individual</option>
            </select>
          </div>

          <div className="mr-2 flex w-1/2 flex-col">
            <label className="mb-2  block font-bold" htmlFor="email">
              Jenis Kelamin
            </label>
            <select
              className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
              id="role"
              onChange={(e: any) => {
                const val = e.target.value;
                setForm({
                  ...form,
                  jenis_kelamin: val,
                });
              }}
            >
              <option value=""></option>
              <option value="1">Laki - Laki</option>
              <option value="2">Perempuan</option>
            </select>
          </div>

          <div className="mr-2 flex w-1/2 flex-col">
            <label className="mb-2  block font-bold" htmlFor="email">
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
            <label className="mb-2  block font-bold" htmlFor="email">
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
            <label className="mb-2  block font-bold" htmlFor="email">
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
            <label className="mb-2  block font-bold" htmlFor="email">
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
            <label className="mb-2  block font-bold" htmlFor="email">
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
            <label className="mb-2  block font-bold" htmlFor="email">
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
            <label className="mb-2  block font-bold" htmlFor="email">
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
            <label className="mb-2  block font-bold" htmlFor="email">
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
            <label className="mb-2  block font-bold" htmlFor="email">
              Kode BK
            </label>
            <input
              className="focus:shadow-outline appearance-none rounded border bg-transparent px-3  py-2 leading-tight shadow focus:outline-none"
              id="email"
              type="email"
              value={form.kode_bk}
              onChange={(e) =>
                setForm({
                  ...form,
                  kode_bk: e.target.value,
                })
              }
            />
          </div>

          <div className="mr-2 flex w-1/2 flex-col">
            <label className="mb-2  block font-bold" htmlFor="email">
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

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="rounded-10 flex h-12 items-center justify-center bg-[#E55300] p-5 text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Submit Securities Account
      </button>
      <Toaster />
    </main>
  );
}
