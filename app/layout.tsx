import "./globals.scss";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "BNI Custody System",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${plus_jakarta_sans.variable} flex h-screen items-stretch bg-base-100 font-sans transition-colors`}
      >
        {children}
      </body>
    </html>
  );
}
