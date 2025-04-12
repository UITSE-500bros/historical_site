import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavHeader from "../components/layout/NavHeader";
import Footer from "../components/layout/Footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body      >
        <NavHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
