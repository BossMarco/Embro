import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://embro-xpress.vercel.app"),
  title: { default: "Embro Xpress | Custom Embroidery, Screen Printing & DTF in McAllen, TX", template: "%s | Embro Xpress" },
  description: "Embro Xpress provides custom embroidery, screen printing, and DTF printing for businesses, teams, and organizations in McAllen and the Rio Grande Valley.",
  alternates: { canonical: "/" },
  icons: { icon: "/images/embro-xpress-logo.jpg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-US" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
