import { Nosifer, Alegreya } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/ui/navbar";
import Footer from "@/app/ui/footer"; // Tambahkan Footer di sini

const nosifer = Nosifer({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-nosifer",
});

const alegreya = Alegreya({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-alegreya",
});

export const metadata = {
  title: "Bloody Espresso",
  description: "Coffee Shop Website",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${alegreya.variable} ${nosifer.variable} antialiased font-alegreya bg-[#1c1c1c]`}
      >
        <Navbar />
        <main className="pt-28">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
