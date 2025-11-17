import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "@/lib/supabase";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
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
            // RSC no-op; middleware refreshes tokens
          }
        },
      },
    });

    const { slug } = await context.params;
    const slugStr = String(slug || "");
    if (!slugStr) {
      return NextResponse.json({ status: "error", message: "Slug diperlukan" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("news_posts")
      .select("slug,title,excerpt,date,image,content")
      .eq("slug", slugStr)
      .maybeSingle();
    if (!error && data) {
      const post = {
        slug: String(data.slug ?? slugStr),
        title: String(data.title ?? slugStr),
        excerpt: String(data.excerpt ?? ""),
        date: String(data.date ?? ""),
        image: String(data.image ?? "/news/news-01.svg"),
        content: typeof data.content === "string" ? data.content : "",
      };
      return NextResponse.json(
        { status: "ok", data: { post } },
        { headers: {
          "Cache-Control": "public, max-age=0, s-maxage=120, stale-while-revalidate=300",
          "Vercel-CDN-Cache-Control": "public, s-maxage=120, stale-while-revalidate=300"
        } }
      );
    }

    // Fallback ke file JSON publik jika Supabase belum ada data
    try {
      const fs = await import("fs");
      const path = await import("path");
      const p = path.join(process.cwd(), "public", "data", "news.json");
      const txt = fs.readFileSync(p, "utf-8");
      const json = JSON.parse(txt);
      const arr: any[] = Array.isArray(json?.posts) ? json.posts : [];
      const found = arr.find((p: any) => String(p?.slug) === slugStr);
      if (!found) {
        return NextResponse.json({ status: "error", message: "Artikel tidak ditemukan" }, { status: 404 });
      }
      const post = {
        slug: String(found.slug ?? slugStr),
        title: String(found.title ?? slugStr),
        excerpt: String(found.excerpt ?? ""),
        date: String(found.date ?? ""),
        image: String(found.image ?? "/news/news-01.svg"),
        content: typeof found.content === "string" ? found.content : String(found.excerpt ?? ""),
      };
      return NextResponse.json(
        { status: "ok", data: { post } },
        { headers: {
          "Cache-Control": "public, max-age=0, s-maxage=120, stale-while-revalidate=300",
          "Vercel-CDN-Cache-Control": "public, s-maxage=120, stale-while-revalidate=300"
        } }
      );
    } catch (e) {
      return NextResponse.json({ status: "error", message: "Artikel tidak ditemukan" }, { status: 404 });
    }
  } catch (e: any) {
    return NextResponse.json({ status: "error", message: "Server error" }, { status: 500 });
  }
}