import type { Metadata } from "next";
import { Albert_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "./components/SmoothScrollProvider";

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "First Click Agency™ — Conversion Systems For High-Ticket Businesses",
  description:
    "We design and build high-converting funnels and automation systems that turn traffic into qualified, booked calls for coaches, consultants, and agencies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${albertSans.variable} ${geistMono.variable}`}>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
