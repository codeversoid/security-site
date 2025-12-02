import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "@/lib/supabase";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
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

    const { id } = await context.params;
    const idStr = String(id || "");
    if (!idStr) {
      return NextResponse.json({ status: "error", message: "ID diperlukan" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("news_posts")
      .select("id,slug,title,excerpt,date,image,content")
      .eq("id", idStr)
      .maybeSingle();
    if (!error && data) {
      const post = {
        id: String(data.id ?? idStr),
        slug: String(data.slug ?? ""),
        title: String(data.title ?? idStr),
        excerpt: String(data.excerpt ?? ""),
        date: String(data.date ?? ""),
        image: String(data.image ?? "/news/news-01.svg"),
        content: typeof data.content === "string" ? data.content : "",
      };
      console.log("api/news/id", idStr, post);
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
