"use client";

import { Metadata } from "next";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { iSecurities } from "../interface";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";



export default function CreateSecurityAccount(){
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
      tempat_penidiran: "",
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
        form.tempat_penidiran === "" ||
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
        "http://127.0.0.1:8000/security-account/",
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
}