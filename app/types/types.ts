export type Nasabah = {
  id: string;
  name: string;
  address: string;
  telephone: string;
  expiry_date: string;
  business_category: string;
  service: string;
  key_person_name: string;
  key_person_dob: string;
  key_person_hp: string;
  created_at: string;
  updated_at: string | null;
};

export type File = {
  id: string;
  id_customer: string | undefined;
  name: string;
  type: string | undefined;
  created_at: string | undefined;
  updated_at: string | undefined;
};

export type MasterData = {
  business: string[];
  service: string[];
  mandatory: string[];
};

export type BankAccount = {
  id: string;
  id_customer: string;
  number: string;
  name: string;
};

export type BoardOfDirector = {
  id: string;
  id_customer: string;
  name: string;
  photo: string | null;
  npp: string;
  role: string;
  description: string;
};
