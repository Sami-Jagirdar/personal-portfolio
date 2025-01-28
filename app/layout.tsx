import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"

const robotoMono = Roboto_Mono({
  weight: ["400", "700"],
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Sami J.",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={robotoMono.className}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
