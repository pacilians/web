import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.scss";
import { useRouter } from "next/navigation";

const font_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
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
        className={`${font_sans.variable} flex min-h-screen bg-base-backdrop-100 font-sans transition-colors`}
      >
        {children}
      </body>
    </html>
  );
}
