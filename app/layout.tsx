import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Forma brand type: Fraunces (headings), Switzer (body), Geist Mono (labels, as on forma.city).
const fraunces = localFont({
  src: [
    { path: "./fonts/fraunces-normal.woff2", style: "normal", weight: "300 700" },
    { path: "./fonts/fraunces-italic.woff2", style: "italic", weight: "300 700" },
  ],
  variable: "--font-display",
  display: "swap",
});

const switzer = localFont({
  src: [
    { path: "./fonts/switzer-400.woff2", weight: "400" },
    { path: "./fonts/switzer-500.woff2", weight: "500" },
    { path: "./fonts/switzer-600.woff2", weight: "600" },
  ],
  variable: "--font-body",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-data",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Forma · The Residency, Season 02",
  description:
    "The founders of Forma's Residency, Season 02, in Bristol. Who they are, what they're building and where to find them.",
};

export const viewport: Viewport = {
  themeColor: "#3a221e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${fraunces.variable} ${switzer.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
