import type { Metadata } from "next";
import { Nosifer, Alegreya } from "next/font/google";
import "./globals.css";


// Root layout wrapper
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased bg-white text-black`}
      >
        {children}
      </body>
    </html>
  );
}
