import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token");

  // Ignore routes serving static assets
  if (/\.[A-Za-z0-9]+$/.test(pathname)) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/auth") {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}
