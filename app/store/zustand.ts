import { create } from "zustand";

import { Nasabah } from "@customTypes/types";

interface TopNasabah {
  company: string;
  totalMoney: number;
}

type NasabahStore = Nasabah & {
  setNasabah: (nasabah: Nasabah) => void;
};

export const useNasabahStore = create<NasabahStore>((set) => ({
  id: "",
  name: "",
  address: "",
  telephone: "",
  expiry_date: "",
  business_category: "",
  service: "",
  key_person_name: "",
  key_person_dob: "",
  key_person_hp: "",
  created_at: "",
  updated_at: null,

  setNasabah: (nasabah) => set(nasabah),
}));
