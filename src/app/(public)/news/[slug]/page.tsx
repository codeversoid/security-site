import Image from "next/image";
import fs from "fs";
import path from "path";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "@/lib/supabase";

interface Props {
  params: { slug: string };
}

async function getPost(slug: string) {
  try {
    // Bangun origin absolut untuk memastikan fetch API tidak gagal/abort
    const h = await headers();
    const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
    const proto = h.get("x-forwarded-proto") || "http";
    const origin = `${proto}://${host}`;
    const res = await fetch(`${origin}/api/news/${slug}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const json = await res.json();
      if (json?.data?.post) return json.data.post;
    }
    // Jika tidak ditemukan via slug, coba sebagai UUID/id
    try {
      const resId = await fetch(`${origin}/api/news/id/${slug}`, { next: { revalidate: 60 } });
      if (resId.ok) {
        const jsonId = await resId.json();
        if (jsonId?.data?.post) return jsonId.data.post;
      }
    } catch {}
  } catch {}
  // Fallback: query langsung Supabase bila fetch API gagal
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); } catch {}
        },
      },
    });
    // Coba cari berdasarkan slug dulu
    {
      const { data, error } = await supabase
        .from("news_posts")
        .select("id,slug,title,excerpt,date,image,content")
        .eq("slug", slug)
        .maybeSingle();
      if (!error && data) {
        return {
          id: String(data.id ?? ""),
          slug: String(data.slug ?? slug),
          title: String(data.title ?? slug),
          excerpt: String(data.excerpt ?? ""),
          date: String(data.date ?? ""),
          image: String(data.image ?? "/news/news-01.svg"),
          content: typeof data.content === "string" ? data.content : "",
        };
      }
    }
    // Jika gagal, coba cari berdasarkan id/uuid yang sama dengan nilai slug param
    {
      const { data, error } = await supabase
        .from("news_posts")
        .select("id,slug,title,excerpt,date,image,content")
        .eq("id", slug)
        .maybeSingle();
      if (!error && data) {
        return {
          id: String(data.id ?? slug),
          slug: String(data.slug ?? ""),
          title: String(data.title ?? slug),
          excerpt: String(data.excerpt ?? ""),
          date: String(data.date ?? ""),
          image: String(data.image ?? "/news/news-01.svg"),
          content: typeof data.content === "string" ? data.content : "",
        };
      }
    }
  } catch {}
  // Fallback ke data statis jika belum ada di database
  try {
    const p = path.join(process.cwd(), "public", "data", "news.json");
    const txt = fs.readFileSync(p, "utf-8");
    const json2 = JSON.parse(txt);
    const arr: any[] = Array.isArray(json2?.posts) ? json2.posts : [];
    let found = arr.find((p: any) => String(p?.slug) === slug);
    if (!found) {
      found = arr.find((p: any) => String(p?.id) === slug);
    }
    if (found) return { ...found, content: typeof found.content === "string" ? found.content : (found.excerpt || "") };
  } catch {}
  return null;
}

export const revalidate = 60;

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = params;
  const slugParam = String(slug || "");
  // Jika yang datang adalah UUID, segera redirect ke slug yang sesuai agar URL rapi dan cepat
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(slugParam);
  if (isUUID) {
    try {
      const h = await headers();
      const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
      const proto = h.get("x-forwarded-proto") || "http";
      const origin = `${proto}://${host}`;
      const resId = await fetch(`${origin}/api/news/id/${slugParam}`, { next: { revalidate: 60 } });
      if (resId.ok) {
        const jsonId = await resId.json();
        const targetSlug = jsonId?.data?.post?.slug;
        if (typeof targetSlug === "string" && targetSlug && targetSlug !== slugParam) {
          redirect(`/news/${targetSlug}`);
        }
      }
    } catch {}
  }
  const post = await getPost(slugParam);
  const dateStr = post?.date || "";
  const dateOnly = dateStr.split("T")[0] || "";
  const timeOnly = dateStr.includes("T") ? dateStr.split("T")[1]?.slice(0, 5) ?? "" : "";

  // Helper untuk merender teks biasa menjadi HTML yang rapi (paragraf + <br/>)
  const toHtml = (s: string | undefined | null) => {
    const v = (s ?? "").trim();
    if (!v) return "";
    // Jika terlihat seperti HTML, tampilkan apa adanya
    const looksHtml = /<[^>]+>/.test(v);
    if (looksHtml) return v;
    const normalized = v.replace(/\r\n/g, "\n");
    const blocks = normalized.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
    if (blocks.length > 1) {
      return blocks.map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`).join("\n");
    }
    return `<p>${normalized.replace(/\n/g, "<br/>")}</p>`;
  };

  const excerptHtml = toHtml(post?.excerpt);
  const contentHtml = toHtml(post?.content);
  const combinedHtml = [excerptHtml, contentHtml].filter(Boolean).join("\n\n");
  const titleText = (post?.title && post.title.trim()) ? post.title : slugParam;
  const finalHtml = combinedHtml && combinedHtml.trim() ? combinedHtml : `<p>Konten belum tersedia.</p>`;
  const imageUrl = ((post?.image ?? "/news/news-01.svg") as string).replace(/[`'\"]/g, "").trim();
  return (
    <main className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-10 lg:py-16">
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">Artikel</p>
        <h1 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight">{titleText}</h1>
        {(dateOnly || timeOnly || post?.slug) && (
          <div className="mt-2 text-xs text-muted-foreground">
            <span>Slug: {post?.slug ?? params.slug}</span>
            {dateOnly && (
              <span className="ml-2">Tanggal: {new Date(dateOnly).toLocaleDateString("id-ID", { dateStyle: "long" })}</span>
            )}
            {timeOnly && <span className="ml-2">Waktu: {timeOnly} WIB</span>}
          </div>
        )}
      </div>
      {imageUrl && (
        <div className="mb-8 overflow-hidden rounded-xl border">
          <Image src={imageUrl} alt={post?.title ?? slugParam} width={1200} height={600} className="h-64 w-full object-cover md:h-80 lg:h-96" />
        </div>
      )}
      <article className="prose prose-zinc dark:prose-invert max-w-none">
        <div className="mt-4" data-content="true">
          <div dangerouslySetInnerHTML={{ __html: finalHtml }} />
        </div>
      </article>
    </main>
  );
}