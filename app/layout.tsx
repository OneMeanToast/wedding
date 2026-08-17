import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oona & Wes — 25 July 2027",
  description: "Save the date for Oona & Wes — 25 July 2027.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
