import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { VisitTracker } from "@/components/VisitTracker";
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
  title: {
    default:
      "Embro Xpress | Custom Embroidery, Screen Printing & DTF in McAllen, TX",
    template: "%s | Embro Xpress",
  },
  description:
    "Embro Xpress provides custom embroidery, screen printing, and DTF printing for businesses, teams, and organizations in McAllen and the Rio Grande Valley.",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      {
        url: "/images/embro-xpress-icon.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: "/images/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Embro Xpress",
    title:
      "Embro Xpress | Custom Embroidery, Screen Printing & DTF in McAllen, TX",
    description:
      "Custom embroidery, screen printing, and DTF printing for businesses, teams, and organizations in McAllen and the Rio Grande Valley.",
    images: [
      {
        url: "/images/embro-xpress-social.png",
        width: 1200,
        height: 630,
        alt: "Embro Xpress logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Embro Xpress | Custom Apparel in McAllen, TX",
    description:
      "Custom embroidery, screen printing, and DTF printing across the Rio Grande Valley.",
    images: ["/images/embro-xpress-social.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-US"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <VisitTracker />
        {children}
      </body>
    </html>
  );
}
