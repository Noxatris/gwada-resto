import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local'

import Providers from './Providers';
import GlobalNav from "./(components)/globalNav";

const juraFont = localFont({ src: 'fonts/jura.ttf', variable: '--font-jura' });


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gwada Resto",
  description: "Gwada Resto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${juraFont.className} antialiased overflow-x-hidden w-screen`}
      >
        <Providers>
          <GlobalNav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
