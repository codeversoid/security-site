import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "@/lib/supabase";

export const revalidate = 0;
export const dynamic = "force-dynamic";

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
          "Cache-Control": "no-store, no-cache, must-revalidate",
          "Pragma": "no-cache"
        } }
      );
    }

    return NextResponse.json({ status: "error", message: "Artikel tidak ditemukan" }, { status: 404 });
  } catch {
    return NextResponse.json({ status: "error", message: "Server error" }, { status: 500 });
  }
}
