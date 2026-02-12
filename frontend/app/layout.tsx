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

import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
