import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "@/lib/supabase";

const DEFAULT_SITE = {
  siteName: "GardaSecurity",
  logoUrl: "/icons/shield.svg",
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
      .select(
        "siteName,logoUrl,address,email,phone,comproUrl,whatsapp,faviconUrl,homeHeroImageUrl,homeAboutImageUrl,instagramUrl,facebookUrl,mapLinkHref,mapEmbedSrc,mapTitle"
      )
      .eq("id", 1)
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        { status: "ok", data: DEFAULT_SITE, error: error.message },
        {
          headers: {
            "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
            "Vercel-CDN-Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
          },
        }
      );
    }

    const payload = { ...(data ?? DEFAULT_SITE) } as typeof DEFAULT_SITE;
    const rawLogo = String(payload.logoUrl ?? "").trim().replace(/[`'"\\]/g, "");
    const safeLogo = !rawLogo || rawLogo === "/logo.svg" ? DEFAULT_SITE.logoUrl : rawLogo;
    payload.logoUrl = safeLogo;
    return NextResponse.json(
      { status: "ok", data: payload },
      { headers: {
        "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
        "Vercel-CDN-Cache-Control": "public, s-maxage=300, stale-while-revalidate=600"
      } }
    );
  } catch (e) {
    return NextResponse.json(
      { status: "ok", data: DEFAULT_SITE },
      { headers: {
        "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
        "Vercel-CDN-Cache-Control": "public, s-maxage=300, stale-while-revalidate=600"
      } }
    );
  }
}
