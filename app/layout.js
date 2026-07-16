import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageSplash from "../components/PageSplash";

export const metadata = {
  title: "PESAN - Pusat Edukasi Sampah Lingkungan | KKN Wancimekar",
  description: "Platform Pusat Edukasi Sampah Lingkungan (PESAN) untuk masyarakat Desa Wancimekar. Dikelola oleh Mahasiswa KKN Universitas Buana Perjuangan Karawang.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" data-scroll-behavior="smooth" className={`scroll-smooth ${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex flex-col min-h-screen bg-gray-50 antialiased font-sans text-gray-900">
        <PageSplash />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
