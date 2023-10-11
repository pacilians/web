import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";

export default function authMiddleware(req: any) {
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get("token") !== null;

  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return NextResponse.redirect("/auth");
  }

  return NextResponse.next();
}