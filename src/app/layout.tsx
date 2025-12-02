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
import { headers } from "next/headers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  let logoUrl = "/icons/shield.svg";
  let siteName = "GardaSecurity";
  let address = "";
  let phone = "";
  let whatsapp = "";
  let origin = "https://example.com";
  try {
    const h = await headers();
    const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
    const proto = h.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
    origin = `${proto}://${host}`;
  } catch {}
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
      .select("siteName,logoUrl,address,phone,whatsapp")
      .eq("id", 1)
      .maybeSingle();
    if (data?.logoUrl) logoUrl = String(data.logoUrl);
    if (data?.siteName) siteName = String(data.siteName);
    if (data?.address) address = String(data.address);
    if (data?.phone) phone = String(data.phone);
    if (data?.whatsapp) whatsapp = String(data.whatsapp);
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
      if (!phone && json?.phone) phone = String(json.phone);
      const sameAs: string[] = [];
      if (json?.instagramUrl) sameAs.push(String(json.instagramUrl));
      if (json?.facebookUrl) sameAs.push(String(json.facebookUrl));
      // Inject dynamic org schema (safe typed global)
      const ORG_SCHEMA_KEY = "__ORG_SCHEMA__" as const;
      (globalThis as Record<string, unknown>)[ORG_SCHEMA_KEY] = organizationSchema({
        name: siteName,
        url: origin,
        telephone: phone || (whatsapp ? `+${whatsapp}` : ""),
        address: { streetAddress: address, addressLocality: "", postalCode: "", addressCountry: "ID" },
        sameAs,
        logo: logoUrl,
      });
    }
  } catch {}

  return {
    title: {
      default: "GardaSecurity — Jasa Keamanan & Diklat",
      template: "%s — GardaSecurity",
    },
    description:
      "Layanan pengamanan profesional untuk kantor, pabrik, event, serta pelatihan satpam (Gada).",
    metadataBase: new URL(origin),
    alternates: {
      canonical: origin,
      languages: { "id-ID": origin },
    },
    icons: {
      icon: logoUrl,
      shortcut: logoUrl,
      apple: logoUrl,
    },
    openGraph: {
      type: "website",
      url: origin,
      title: "GardaSecurity — Jasa Keamanan & Diklat",
      description:
        "Layanan pengamanan profesional untuk kantor, pabrik, event, serta pelatihan satpam (Gada).",
      siteName: "GardaSecurity",
      images: [
        {
          url: logoUrl,
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
          {JSON.stringify(((globalThis as Record<string, unknown>)["__ORG_SCHEMA__"] ?? organizationSchema()), null, 2)}
        </Script>
      </body>
    </html>
  );
}
