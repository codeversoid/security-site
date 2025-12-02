import Image from "next/image";
import { headers } from "next/headers";
import { getSupabaseClient } from "@/lib/supabase";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams?: { id?: string };
}

type Post = {
  id?: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  date?: string;
  image?: string;
  content?: string;
};

async function getPostById(id: string) {
  // Ambil dari API berdasarkan origin, ID-only
  try {
    const h = await headers();
    const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
    const proto = h.get("x-forwarded-proto") || "http";
    const origin = `${proto}://${host}`;
    const resId = await fetch(`${origin}/api/news/id/${id}`, { cache: "no-store", next: { revalidate: 0 } });
    if (resId.ok) {
      const jsonId = await resId.json();
      const post = jsonId?.data?.post;
      if (post) return post as Post;
    }
  } catch {}
  // Fallback ke query langsung Supabase berdasarkan ID
  try {
    const supabase = getSupabaseClient();
    const { data } = await supabase
      .from("news_posts")
      .select("id,slug,title,excerpt,date,image,content")
      .eq("id", id)
      .maybeSingle();
    if (data) {
      return {
        id: String(data.id ?? id),
        slug: String(data.slug ?? ""),
        title: String(data.title ?? id),
        excerpt: String(data.excerpt ?? ""),
        date: String(data.date ?? ""),
        image: String(data.image ?? "/news/news-01.svg"),
        content: typeof data.content === "string" ? data.content : "",
      } as Post;
    }
  } catch {}
  return null;
}

async function getPostBySlug(slug: string) {
  try {
    const h = await headers();
    const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
    const proto = h.get("x-forwarded-proto") || "http";
    const origin = `${proto}://${host}`;
    const res = await fetch(`${origin}/api/news/${slug}`, { cache: "no-store", next: { revalidate: 0 } });
    if (res.ok) {
      const json = await res.json();
      const post = json?.data?.post;
      if (post) return post as Post;
    }
  } catch {}
  try {
    const supabase = getSupabaseClient();
    const { data } = await supabase
      .from("news_posts")
      .select("id,slug,title,excerpt,date,image,content")
      .eq("slug", slug)
      .maybeSingle();
    if (data) {
      return {
        id: String(data.id ?? ""),
        slug: String(data.slug ?? slug),
        title: String(data.title ?? slug),
        excerpt: String(data.excerpt ?? ""),
        date: String(data.date ?? ""),
        image: String(data.image ?? "/news/news-01.svg"),
        content: typeof data.content === "string" ? data.content : "",
      } as Post;
    }
  } catch {}
  return null;
}

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const idParam = String(slug || "");
  let post = await getPostById(idParam);
  if (!post) {
    post = await getPostBySlug(idParam);
  }
  console.log("news detail", { idParam, hasPost: !!post });
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
  const titleText = (post?.title && post.title.trim()) ? post.title : (post?.slug || idParam);
  const finalHtml = combinedHtml && combinedHtml.trim() ? combinedHtml : `<p>Konten belum tersedia.</p>`;
  const imageUrl = ((post?.image ?? "/news/news-01.svg") as string).replace(/[`'\"]/g, "").trim();
  return (
    <main className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-10 lg:py-16">
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">Artikel</p>
        <h1 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight">{titleText}</h1>
        {(dateOnly || timeOnly || post?.slug) && (
          <div className="mt-2 text-xs text-muted-foreground">
            <span>ID: {post?.id ?? idParam}</span>
            {dateOnly && (
              <span className="ml-2">Tanggal: {new Date(dateOnly).toLocaleDateString("id-ID", { dateStyle: "long" })}</span>
            )}
            {timeOnly && <span className="ml-2">Waktu: {timeOnly} WIB</span>}
          </div>
        )}
      </div>
      {imageUrl && (
        <div className="mb-8 overflow-hidden rounded-xl border">
          <Image src={imageUrl} alt={post?.title ?? idParam} width={1200} height={600} className="h-64 w-full object-cover md:h-80 lg:h-96" unoptimized />
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
