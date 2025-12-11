import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastProvider } from "@/components/toastProvider";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Savannah Water ",
  description: "Savannah Water , All your water needs in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > 
      <ToastProvider>
      <Navbar/>
        {children}
        <div className='bg-linear-to-r from-cyan-500 to-blue-600 text-white py-10 w-full flex justify-center items-center'>
      &copy; Savannah Water {new Date().getFullYear()}   All rights reserved


      </div>
       </ToastProvider>
      </body>
    </html>
  );
}
