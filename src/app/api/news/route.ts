import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "@/lib/supabase";

export const revalidate = 0;
export const dynamic = "force-dynamic";

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

    const { data } = await supabase
      .from("news_posts")
      .select("id,slug,title,excerpt,date,image")
      .order("date", { ascending: false });
    const posts = Array.isArray(data)
      ? (data ?? []).map((p: { id?: unknown; slug?: unknown; title?: unknown; excerpt?: unknown; date?: unknown; image?: unknown }) => ({
          id: String(p.id ?? ""),
          slug: String(p.slug ?? ""),
          title: String(p.title ?? ""),
          excerpt: String(p.excerpt ?? ""),
          date: String(p.date ?? ""),
          image: String(p.image ?? "/news/news-01.svg"),
        }))
      : [];
    return NextResponse.json(
      { status: "ok", data: { posts } },
      { headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache"
      } }
    );
  } catch {
    return NextResponse.json({ status: "error", message: "Server error" }, { status: 500 });
  }
}
