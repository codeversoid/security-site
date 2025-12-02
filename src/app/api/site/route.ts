import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "@/lib/supabase";

import fs from "fs";
import path from "path";

const DEFAULT_SITE = {
  siteName: "GardaSecurity",
  logoUrl: "/logo.svg",
  faviconUrl: "/icons/shield.svg",
  address: "Jl. Contoh No. 123, Bandung",
  email: "admin@gardasecurity.co.id",
  phone: "+62 812-3456-7890",
  comproUrl: "/brochure.pdf",
  whatsapp: "6281234567890",
  homeHeroImageUrl: "",
  homeAboutImageUrl: "",
  instagramUrl: "",
  facebookUrl: "",
  mapLinkHref: "https://maps.google.com/?q=Kantor",
  mapEmbedSrc: "",
  mapTitle: "Lokasi Kantor",
};

export async function GET() {
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
          } catch {
            // no-op in Server Components; middleware refreshes tokens
          }
        },
      },
    });

    const { data, error } = await supabase
      .from("site_settings")
      .select("siteName,logoUrl,address,email,phone,comproUrl,whatsapp")
      .eq("id", 1)
      .maybeSingle();
    // Baca ekstensi konfigurasi dari file JSON publik
    let extra: Partial<typeof DEFAULT_SITE> = {};
    try {
      const p = path.join(process.cwd(), "public", "data", "site.json");
      const txt = fs.readFileSync(p, "utf-8");
      const json = JSON.parse(txt);
      extra = {
        homeHeroImageUrl: String(json?.homeHeroImageUrl ?? ""),
        homeAboutImageUrl: String(json?.homeAboutImageUrl ?? ""),
        instagramUrl: String(json?.instagramUrl ?? ""),
        facebookUrl: String(json?.facebookUrl ?? ""),
        mapLinkHref: String(json?.mapLinkHref ?? DEFAULT_SITE.mapLinkHref),
        mapEmbedSrc: String(json?.mapEmbedSrc ?? ""),
        mapTitle: String(json?.mapTitle ?? DEFAULT_SITE.mapTitle),
        faviconUrl: String(json?.faviconUrl ?? DEFAULT_SITE.faviconUrl),
      };
    } catch {}

    if (error) {
      // Fallback ke default + extra file
      return NextResponse.json(
        { status: "ok", data: { ...DEFAULT_SITE, ...extra }, error: error.message },
        { headers: {
          "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
          "Vercel-CDN-Cache-Control": "public, s-maxage=300, stale-while-revalidate=600"
        } }
      );
    }

    const payload = { ...(data ?? DEFAULT_SITE), ...extra };
    return NextResponse.json(
      { status: "ok", data: payload },
      { headers: {
        "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
        "Vercel-CDN-Cache-Control": "public, s-maxage=300, stale-while-revalidate=600"
      } }
    );
  } catch (e) {
    // Jika supabase/file gagal, tetap kembalikan default
    return NextResponse.json(
      { status: "ok", data: DEFAULT_SITE },
      { headers: {
        "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
        "Vercel-CDN-Cache-Control": "public, s-maxage=300, stale-while-revalidate=600"
      } }
    );
  }
}
