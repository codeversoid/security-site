import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "@/lib/supabase";
import fs from "fs";
import path from "path";

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

    const { data: categories, error: catErr } = await supabase
      .from("gallery_categories")
      .select("id,name")
      .order("name", { ascending: true });
    const { data: items, error: itemsErr } = await supabase
      .from("gallery_items")
      .select("src,alt,category")
      .order("category", { ascending: true });

    if (!catErr && !itemsErr && Array.isArray(categories) && Array.isArray(items)) {
      const cats = (categories ?? []).map((c: any) => ({ id: String(c.id ?? ""), name: String(c.name ?? "") }));
      const its = (items ?? []).map((it: any) => ({
        src: String(it.src ?? ""),
        alt: (String(it.alt ?? "").trim() || "Gambar galeri"),
        category: String(it.category ?? ""),
      }));
      return NextResponse.json(
        { status: "ok", data: { categories: cats, items: its } },
        { headers: {
          "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
          "Vercel-CDN-Cache-Control": "public, s-maxage=300, stale-while-revalidate=600"
        } }
      );
    }
  } catch {}

  // Fallback ke file JSON publik
  try {
    const p = path.join(process.cwd(), "public", "data", "gallery.json");
    const txt = fs.readFileSync(p, "utf-8");
    const json = JSON.parse(txt);
    const cats = Array.isArray(json?.categories) ? json.categories : [];
    const its = Array.isArray(json?.items) ? json.items : [];
    const normCats = cats.map((c: any) => ({ id: String(c.id ?? ""), name: String(c.name ?? "") }));
    const normItems = its.map((it: any) => ({
      src: String(it.src ?? ""),
      alt: (String(it.alt ?? "").trim() || "Gambar galeri"),
      category: String(it.category ?? ""),
    }));
    return NextResponse.json(
      { status: "ok", data: { categories: normCats, items: normItems } },
      { headers: {
        "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
        "Vercel-CDN-Cache-Control": "public, s-maxage=300, stale-while-revalidate=600"
      } }
    );
  } catch {}

  return NextResponse.json(
    { status: "ok", data: { categories: [], items: [] } },
    { headers: {
      "Cache-Control": "public, max-age=0, s-maxage=120, stale-while-revalidate=300",
      "Vercel-CDN-Cache-Control": "public, s-maxage=120, stale-while-revalidate=300"
    } }
  );
}