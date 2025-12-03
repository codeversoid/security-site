import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "@/lib/supabase";

const DEFAULT = {
  directorName: "",
  directorTitle: "",
  directorPhotoUrl: "",
  directorMessage: "",
  aboutLogoUrl: "",
  team: [] as { name: string; role: string; imageUrl: string }[],
  partners: [] as { logoUrl: string }[],
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
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {}
        },
      },
    });
    const { data, error } = await supabase
      .from("about_settings")
      .select("directorName,directorTitle,directorPhotoUrl,directorMessage,aboutLogoUrl,team,partners")
      .eq("id", 1)
      .maybeSingle();

    let payload: any = null;
    if (!error && data) {
      payload = {
        directorName: String((data as any).directorName ?? ""),
        directorTitle: String((data as any).directorTitle ?? ""),
        directorPhotoUrl: String((data as any).directorPhotoUrl ?? ""),
        directorMessage: String((data as any).directorMessage ?? ""),
        aboutLogoUrl: String((data as any).aboutLogoUrl ?? ""),
        team: Array.isArray((data as any).team) ? (data as any).team : [],
        partners: Array.isArray((data as any).partners) ? (data as any).partners : [],
      };
    }
    return NextResponse.json(
      { status: "ok", data: payload ?? DEFAULT },
      { headers: {
        "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
        "Vercel-CDN-Cache-Control": "public, s-maxage=300, stale-while-revalidate=600"
      } }
    );
  } catch (e) {
    return NextResponse.json(
      { status: "ok", data: DEFAULT },
      { headers: {
        "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
        "Vercel-CDN-Cache-Control": "public, s-maxage=300, stale-while-revalidate=600"
      } }
    );
  }
}
