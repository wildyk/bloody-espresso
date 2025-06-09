import { Nosifer, Alegreya } from "next/font/google";
import "@/app/globals.css";
import ConditionalWrapper from "@/app/ui/conditional-wrapper";
import { ReactNode } from "react";

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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${alegreya.variable} ${nosifer.variable} antialiased font-alegreya`}>
        <ConditionalWrapper>{children}</ConditionalWrapper>
      </body>
    </html>
  );
}
