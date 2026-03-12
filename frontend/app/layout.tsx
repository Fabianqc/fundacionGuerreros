import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fundación Guerreros de Amor",
  description: "Llevando esperanza a cada rincón de nuestro pueblo",
  icons: {
    icon: "/logo-guerreros-de-amor.png",
    apple: "/logo-guerreros-de-amor.png",
  },
  openGraph: {
    images: [
      {
        url: "/logo-guerreros-de-amor.png",
        width: 800,
        height: 600,
        alt: "Logo Fundación Guerreros de Amor",
      },
    ],
  },
};

import { Inter, Outfit } from "next/font/google";
import { Providers } from "./providers";
import { SessionGuard } from "@/app/components/SessionGuard";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased font-sans bg-slate-50 text-slate-900">
        <Providers>
          <SessionGuard>
            {children}
          </SessionGuard>
        </Providers>
      </body>
    </html>
  );
}
