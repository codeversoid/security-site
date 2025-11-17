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
            // no-op on RSC; middleware refreshes tokens
          }
        },
      },
    });

    const { data, error } = await supabase
      .from("news_posts")
      .select("id,slug,title,excerpt,date,image")
      .order("date", { ascending: false });
    // Jika ada error atau data kosong, fallback ke file JSON statis
    let posts: any[] = [];
    if (!error && Array.isArray(data) && data.length > 0) {
      posts = (data ?? []).map((p: any) => ({
        id: String(p.id ?? ""),
        slug: String(p.slug ?? ""),
        title: String(p.title ?? ""),
        excerpt: String(p.excerpt ?? ""),
        date: String(p.date ?? ""),
        image: String(p.image ?? "/news/news-01.svg"),
      }));
    } else {
      try {
        const p = path.join(process.cwd(), "public", "data", "news.json");
        const txt = fs.readFileSync(p, "utf-8");
        const json = JSON.parse(txt);
        const arr = Array.isArray(json?.posts) ? json.posts : [];
        posts = arr.map((p: any) => ({
          id: String(p.id ?? ""),
          slug: String(p.slug ?? ""),
          title: String(p.title ?? ""),
          excerpt: String(p.excerpt ?? ""),
          date: String(p.date ?? ""),
          image: String(p.image ?? "/news/news-01.svg"),
        }));
      } catch {}
    }
    return NextResponse.json(
      { status: "ok", data: { posts } },
      { headers: {
        "Cache-Control": "public, max-age=0, s-maxage=120, stale-while-revalidate=300",
        "Vercel-CDN-Cache-Control": "public, s-maxage=120, stale-while-revalidate=300"
      } }
    );
  } catch (e: any) {
    // Fallback total ke file JSON jika supabase gagal keras
    try {
      const p = path.join(process.cwd(), "public", "data", "news.json");
      const txt = fs.readFileSync(p, "utf-8");
      const json = JSON.parse(txt);
      const arr = Array.isArray(json?.posts) ? json.posts : [];
      const posts = arr.map((p: any) => ({
        id: String(p.id ?? ""),
        slug: String(p.slug ?? ""),
        title: String(p.title ?? ""),
        excerpt: String(p.excerpt ?? ""),
        date: String(p.date ?? ""),
        image: String(p.image ?? "/news/news-01.svg"),
      }));
      return NextResponse.json(
        { status: "ok", data: { posts } },
        { headers: {
          "Cache-Control": "public, max-age=0, s-maxage=120, stale-while-revalidate=300",
          "Vercel-CDN-Cache-Control": "public, s-maxage=120, stale-while-revalidate=300"
        } }
      );
    } catch {
      return NextResponse.json({ status: "error", message: "Server error" }, { status: 500 });
    }
  }
}