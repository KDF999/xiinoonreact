import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "XII NOON — Ultra-Luxury Timekeeping | Make with India · For the World",
  description:
    "XII NOON — India's assertion within the world of luxury. Ultra-luxury timekeeping conceived as heirlooms. The Tricolor Edition, the Emirati Edition, the Signature, and the Vajra Pen.",
  keywords: [
    "XII NOON",
    "luxury watches",
    "ultra-luxury timekeeping",
    "Indian luxury",
    "Emirati Edition",
    "Tricolor Edition",
    "Vajra Pen",
    "haute horlogerie",
    "bespoke watches",
  ],
  authors: [{ name: "XII NOON" }],
  openGraph: {
    title: "XII NOON — Ultra-Luxury Timekeeping",
    description:
      "Make with India · For the World. Ultra-Luxury Timekeeping since the beginning of time.",
    siteName: "XII NOON",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XII NOON — Ultra-Luxury Timekeeping",
    description:
      "Make with India · For the World. Ultra-Luxury Timekeeping since the beginning of time.",
  },
};

export const viewport = {
  themeColor: "#080704",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${jost.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
