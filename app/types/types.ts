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
}

export type MasterData = {
  business: string[];
  service: string[];
  mandatory: string[];
}

export type BoardOfDirector = {
  name: string;
  npp: string;
  role: string;
  description: string;
  photo: string | null;
}