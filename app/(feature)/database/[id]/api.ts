import toast from "react-hot-toast";

const BASE_URL = `${process.env.SERVER}`;

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
  return data.data.files;
}

export async function createFile(
  customerId: string,
  token: string,
  file: File,
  name: string,
  type: string,
) {
  const toastId = toast.loading(`Creating Nasabah...`);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);
  formData.append("type", type);

  const response = await fetch(`${BASE_URL}/database/file/${customerId}`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  toast.success(`File ${name} successfully uploaded`, { id: toastId });
  window.location.reload();
}

export async function deleteFile(id: string, name: string, token: string) {
  const toastId = toast.loading(`Deleting ${name}...`);

  fetch(`${BASE_URL}/database/file/${id}`, {
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
