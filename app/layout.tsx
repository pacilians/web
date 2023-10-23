import type { Metadata } from "next";
import { Martian_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.scss";

const font_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const font_mono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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
        className={`${font_sans.variable} ${font_mono.variable} flex min-h-screen bg-base-backdrop-100 font-sans transition-colors`}
      >
        {children}
      </body>
    </html>
  );
}
