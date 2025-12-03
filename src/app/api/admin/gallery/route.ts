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

  try {
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
      const seen = new Set<string>();
      const its = (items ?? [])
        .map((it: any) => ({
          src: String(it.src ?? ""),
          alt: (String(it.alt ?? "").trim() || "Gambar galeri"),
          category: String(it.category ?? ""),
        }))
        .filter((it: { src: string; alt: string; category: string }) => {
          const k = it.src;
          if (seen.has(k)) return false;
          seen.add(k);
          return true;
        });
      return NextResponse.json({ status: "ok", data: { categories: cats, items: its } });
    }
  } catch {}

  return NextResponse.json({ status: "ok", data: { categories: [], items: [] } });
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
    if (!Array.isArray(body.items) || !Array.isArray(body.categories)) {
      return NextResponse.json({ status: "error", message: "Invalid shape" }, { status: 400 });
    }
    const categoriesRaw = body.categories.map((c: any) => ({ id: String(c.id), name: String(c.name) }));
    const catSeen = new Set<string>();
    const categories = categoriesRaw.filter((c: any) => {
      if (catSeen.has(c.id)) return false;
      catSeen.add(c.id);
      return true;
    });
    const itemsRaw = body.items.map((it: any) => ({
      src: String(it.src ?? ""),
      alt: (String(it.alt ?? "").trim() || "Gambar galeri"),
      category: String(it.category ?? ""),
    }));
    const itemSeen = new Set<string>();
    const items = itemsRaw.filter((it: any) => {
      const k = `${it.src}`;
      if (itemSeen.has(k)) return false;
      itemSeen.add(k);
      return true;
    });

    // upsert categories
    const catUpsert = await supabase.from("gallery_categories").upsert(categories);
    if (catUpsert.error) {
      return NextResponse.json({ status: "error", message: catUpsert.error.message }, { status: 500 });
    }
    // replace items
    const delRes = await supabase.from("gallery_items").delete().neq("category", "");
    if (delRes.error) {
      return NextResponse.json({ status: "error", message: delRes.error.message }, { status: 500 });
    }
    const insRes = await supabase.from("gallery_items").insert(items);
    if (insRes.error) {
      return NextResponse.json({ status: "error", message: insRes.error.message }, { status: 500 });
    }
    return NextResponse.json({ status: "ok", message: "Gallery updated", data: { categories, items } });
  } catch (err) {
    return NextResponse.json({ status: "error", message: "Invalid payload" }, { status: 400 });
  }
}
