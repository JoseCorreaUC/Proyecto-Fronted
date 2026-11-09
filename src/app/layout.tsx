import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/Footer";
import CookieBanner from "@/app/components/CookieBanner";
export const metadata: Metadata = {
  title: "Taquilla",
  description: "Plataforma de eventos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="main-content">
          {children}
        </main>
        <CookieBanner />
        <Footer />
      </body>
    </html>
  );
}