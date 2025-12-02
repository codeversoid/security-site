import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/blocks/Header";
import Footer from "@/components/blocks/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Script from "next/script";
import { organizationSchema } from "@/lib/schema";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "@/lib/supabase";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  let logoUrl = "/icons/shield.svg";
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    });
    const { data } = await supabase
      .from("site_settings")
      .select("siteName,logoUrl")
      .eq("id", 1)
      .maybeSingle();
    if (data?.logoUrl) logoUrl = String(data.logoUrl);
  } catch {}

  try {
    const fs = await import("fs");
    const path = await import("path");
    const p = path.join(process.cwd(), "public", "data", "site.json");
    if (fs.existsSync(p)) {
      const txt = fs.readFileSync(p, "utf-8");
      const json = JSON.parse(txt);
      const fav = String(json?.faviconUrl || "").trim();
      if (fav) logoUrl = fav;
    }
  } catch {}

  return {
    title: {
      default: "GardaSecurity — Jasa Keamanan & Diklat",
      template: "%s — GardaSecurity",
    },
    description:
      "Layanan pengamanan profesional untuk kantor, pabrik, event, serta pelatihan satpam (Gada).",
    metadataBase: new URL("https://example.com"),
    icons: {
      icon: logoUrl,
      shortcut: logoUrl,
      apple: logoUrl,
    },
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
}

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
