import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "@/lib/supabase";
import fs from "fs";
import path from "path";

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

  if (error) {
    return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
  }

  type SitePayload = typeof DEFAULT_SITE & Record<string, unknown>;
  let payload: SitePayload = { ...DEFAULT_SITE, ...(data || {}) } as SitePayload;

  // Gabungkan tambahan dari file JSON publik
  try {
    const p = path.join(process.cwd(), "public", "data", "site.json");
    const txt = fs.readFileSync(p, "utf-8");
    const json = JSON.parse(txt);
    payload = {
      ...payload,
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

  if (!data) {
    // initialize singleton row
    const { error: initErr } = await supabase
      .from("site_settings")
      .upsert({ id: 1, ...payload });
    if (initErr) {
      // ignore init error, return default to UI
    }
  }

  return NextResponse.json({ status: "ok", data: payload });
}

export async function POST(req: Request) {
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
    const body = await req.json();
    const payload = {
      siteName: String(body.siteName ?? DEFAULT_SITE.siteName),
      logoUrl: String(body.logoUrl ?? DEFAULT_SITE.logoUrl),
      // faviconUrl disimpan di file publik agar tidak perlu skema DB baru
      address: String(body.address ?? DEFAULT_SITE.address),
      email: String(body.email ?? DEFAULT_SITE.email),
      phone: String(body.phone ?? DEFAULT_SITE.phone),
      comproUrl: String(body.comproUrl ?? DEFAULT_SITE.comproUrl),
      whatsapp: String(body.whatsapp ?? DEFAULT_SITE.whatsapp),
    };
    const { error } = await supabase.from("site_settings").upsert({ id: 1, ...payload });
    if (error) {
      return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
    }
    // Simpan field tambahan pada file JSON publik
    try {
      const p = path.join(process.cwd(), "public", "data", "site.json");
      const prevTxt = fs.existsSync(p) ? fs.readFileSync(p, "utf-8") : "{}";
      const prev = JSON.parse(prevTxt);
      const extra = {
        homeHeroImageUrl: String(body.homeHeroImageUrl ?? prev?.homeHeroImageUrl ?? DEFAULT_SITE.homeHeroImageUrl),
        homeAboutImageUrl: String(body.homeAboutImageUrl ?? prev?.homeAboutImageUrl ?? DEFAULT_SITE.homeAboutImageUrl),
        instagramUrl: String(body.instagramUrl ?? prev?.instagramUrl ?? ""),
        facebookUrl: String(body.facebookUrl ?? prev?.facebookUrl ?? ""),
        mapLinkHref: String(body.mapLinkHref ?? prev?.mapLinkHref ?? DEFAULT_SITE.mapLinkHref),
        mapEmbedSrc: String(body.mapEmbedSrc ?? prev?.mapEmbedSrc ?? ""),
        mapTitle: String(body.mapTitle ?? prev?.mapTitle ?? DEFAULT_SITE.mapTitle),
        faviconUrl: String(body.faviconUrl ?? prev?.faviconUrl ?? DEFAULT_SITE.faviconUrl),
      };
      fs.writeFileSync(p, JSON.stringify(extra, null, 2), "utf-8");
    } catch {}

    const merged = {
      ...payload,
      homeHeroImageUrl: String(body.homeHeroImageUrl ?? DEFAULT_SITE.homeHeroImageUrl),
      homeAboutImageUrl: String(body.homeAboutImageUrl ?? DEFAULT_SITE.homeAboutImageUrl),
      instagramUrl: String(body.instagramUrl ?? ""),
      facebookUrl: String(body.facebookUrl ?? ""),
      mapLinkHref: String(body.mapLinkHref ?? DEFAULT_SITE.mapLinkHref),
      mapEmbedSrc: String(body.mapEmbedSrc ?? ""),
      mapTitle: String(body.mapTitle ?? DEFAULT_SITE.mapTitle),
      faviconUrl: String(body.faviconUrl ?? DEFAULT_SITE.faviconUrl),
    };
    return NextResponse.json({ status: "ok", message: "Site settings updated", data: merged });
  } catch (err) {
    return NextResponse.json({ status: "error", message: "Invalid payload" }, { status: 400 });
  }
}
