import { cookies } from "next/headers";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const cookieStore = cookies();
    cookieStore.delete("token");
    res.status(200).json({ message: "Logged out successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
