const BASE_URL = "http://127.0.0.1:8000";

export async function fetchNasabahFile(id: string, token: string) {
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
