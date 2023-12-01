// libraries
import toast from "react-hot-toast";

// types
import { Nasabah } from "@customTypes/types";

const BASE_URL = "http://127.0.0.1:8000";

export async function fetchMasterData() {
  try {
    const response = await fetch(`${BASE_URL}/master-data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error fetching user. Status code: ${response.status}, Status text: ${response.statusText}, Message: ${errorText}`,
      );
    }

    const res = await response.json();
    const data = res.data.data;
    return data;
  } catch (error) {
    console.error(error);
    return {
      business: [],
      service: [],
      mandatory: [],
    };
  }
}

export async function fetchNasabah(id: string, token: string) {
  const res = await fetch(`${BASE_URL}/database/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  const data = await res.json();
  return data.data.customer;
}

export async function updateNasabah(
  data: Pick<
    Nasabah,
    | "name"
    | "address"
    | "telephone"
    | "expiry_date"
    | "business_category"
    | "service"
    | "key_person_name"
    | "key_person_dob"
    | "key_person_hp"
  >,
  id: string,
  token: string,
) {
  const toastId = toast.loading("Updating nasabah...");

  try {
    const response = await fetch(`${BASE_URL}/database/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      toast.error(errorText, { id: toastId });
    } else {
      toast.success(`${data.name} updated`, { id: toastId });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function fetchFile(id: string, token: string) {
  const res = await fetch(`${BASE_URL}/database/file/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  const data = await res.json();
  return data.data;
}

export async function deleteFile(id: string, name: string, token: string) {
  const toastId = toast.loading(`Deleting ${name}...`);

  fetch(`https://bnicstdy-b41ad9b84aff.herokuapp.com/database/file/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      toast.success(`Deleted ${name} successfully`, { id: toastId });
      window.location.reload();
    })
    .catch((error) => {
      toast.error(`Failed to delete ${name}: ${error.message}`, {
        id: toastId,
      });
    });
}

export async function fetchChecklist(token: string) {
  const res = await fetch(`${BASE_URL}/database/checklist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  const data = await res.json();
  return data.data;
}