export interface iDOB {
  name: string;
  npp: string;
  role: string;
  description: string;
  photo: null | string;
}

export interface iBankAccount {
  number: string;
  name: string;
}

export interface iCustomer {
  id: null;
  name: string;
  address: string;
  telephone: string;
  expiry_date: any;
  business_category: string;
  service: string;
  key_person_name: string;
  key_person_dob: string;
  key_person_hp: string;
  email: string
  board_of_director: iDOB[];
  bank_account: iBankAccount[];
}
