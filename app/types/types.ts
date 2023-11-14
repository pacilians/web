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

export type Audit = {
  id?: number;
  name: string;
  status: any;
  file?: any;
  created_at?: any;
  file_exist?: any;
}

export type AuditEvent = {
  id?: any;
  name: string;
  created_at?: any;
  start: any;
  end: any;
  audit?: Audit[];
}


// Only Recent
export interface iDOB {
  name: string;
  npp: string;
  role: string;
  description: string;
  photo: null | string;
  birth_date: any;
}

export interface iBankAccount {
  number: string;
  name: string;
}

export interface iCustomer {
  id?: any;
  name: string;
  address?: string;
  telephone?: string;
  comment?:string;
  expiry_date: any;
  status?:any
  business_category: string;
  service: string;
  key_person_name?: string;
  key_person_dob?: string;
  key_person_hp?: string;
  email: string
  board_of_director?: iDOB[];
  bank_account?: iBankAccount[];
}


