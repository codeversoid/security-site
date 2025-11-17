import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/blocks/Header";
import Footer from "@/components/blocks/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Script from "next/script";
import { organizationSchema } from "@/lib/schema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GardaSecurity — Jasa Keamanan & Diklat",
    template: "%s — GardaSecurity",
  },
  description:
    "Layanan pengamanan profesional untuk kantor, pabrik, event, serta pelatihan satpam (Gada).",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    type: "website",
    url: "https://example.com",
    title: "GardaSecurity — Jasa Keamanan & Diklat",
    description:
      "Layanan pengamanan profesional untuk kantor, pabrik, event, serta pelatihan satpam (Gada).",
    siteName: "GardaSecurity",
    images: [
      {
        url: "https://example.com/og.jpg",
        width: 1200,
        height: 630,
        alt: "GardaSecurity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@garda_security",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        {children}
        <FloatingWhatsApp />
        <Footer />
        <Script id="org-schema" type="application/ld+json">
          {JSON.stringify(organizationSchema(), null, 2)}
        </Script>
      </body>
    </html>
  );
}
