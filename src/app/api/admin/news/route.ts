import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "@/lib/supabase";

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
    .from("news_posts")
    .select("slug,title,excerpt,date,image,content")
    .order("date", { ascending: false });
  if (error) {
    return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
  }
  const posts = (data ?? []).map((p: any) => ({
    slug: String(p.slug ?? ""),
    title: String(p.title ?? ""),
    excerpt: String(p.excerpt ?? ""),
    date: String(p.date ?? ""),
    image: String(p.image ?? "/news/news-01.svg"),
    content: typeof p.content === "string" ? p.content : undefined,
  }));
  return NextResponse.json({ status: "ok", data: { posts } });
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
    if (!Array.isArray(body.posts)) {
      return NextResponse.json({ status: "error", message: "posts must be an array" }, { status: 400 });
    }
    const posts = body.posts.map((p: any) => ({
      slug: String(p.slug ?? ""),
      title: String(p.title ?? ""),
      excerpt: String(p.excerpt ?? ""),
      date: String(p.date ?? ""),
      image: String(p.image ?? "/news/news-01.svg"),
      content: typeof p.content === "string" ? p.content : null,
    }));

    // Replace all posts with given payload for simplicity
    const delRes = await supabase.from("news_posts").delete().neq("slug", "");
    if (delRes.error) {
      return NextResponse.json({ status: "error", message: delRes.error.message }, { status: 500 });
    }
    const insRes = await supabase.from("news_posts").insert(posts);
    if (insRes.error) {
      return NextResponse.json({ status: "error", message: insRes.error.message }, { status: 500 });
    }

    return NextResponse.json({ status: "ok", message: "News updated", data: { posts } });
  } catch (err) {
    return NextResponse.json({ status: "error", message: "Invalid payload" }, { status: 400 });
  }
}
