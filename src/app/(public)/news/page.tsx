import { Metadata } from "next";
import NewsGrid from "@/components/blocks/news/NewsGrid";
import type { NewsPost } from "@/components/blocks/news/NewsCard";
import NewsSidebar from "@/components/blocks/news/NewsSidebar";
import NewsPagination from "@/components/blocks/news/NewsPagination";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Berita",
  description: "Kumpulan berita, kegiatan, dan update operasional.",
};

export const revalidate = 0;
export const dynamic = "force-dynamic";

async function getInitialPosts() {
  // Coba ambil dari API agar konsisten dengan Home
  try {
    const h = await headers();
    const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
    const proto = h.get("x-forwarded-proto") || "http";
    const origin = `${proto}://${host}`;
    const res = await fetch(`${origin}/api/news`, { cache: "no-store", next: { revalidate: 0 } });
    if (res.ok) {
      const json = await res.json();
      const items = Array.isArray(json?.data?.posts) ? (json.data.posts as NewsPost[]) : [];
      if (items.length > 0) return items;
    }
  } catch {}
  return [] as NewsPost[];
}

export default async function NewsPage({ searchParams }: { searchParams?: Promise<{ page?: string; pageSize?: string }> }) {
  const sp = (await searchParams) ?? {};
  const rawPosts = await getInitialPosts();
  const normalized: NewsPost[] = (Array.isArray(rawPosts) ? rawPosts : []).map((p) => ({
    id: String((p as NewsPost).id ?? ""),
    slug: String((p as NewsPost).slug ?? ""),
    title: String((p as NewsPost).title ?? ""),
    excerpt: String((p as NewsPost).excerpt ?? ""),
    date: String((p as NewsPost).date ?? ""),
    image: String((p as NewsPost).image ?? "/news/news-01.svg"),
  }));
  const sorted = normalized
    .slice()
    .sort((a, b) => (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0));
  const size = Math.max(1, Number(sp.pageSize) || 9);
  const totalCount = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / size));
  let page = Math.max(1, Number(sp.page) || 1);
  if (page > totalPages) page = totalPages;
  return (
    <main>
      <div className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-10 lg:py-16">
        <h1 className="text-2xl font-bold tracking-tight">Berita</h1>
        <p className="mt-2 text-muted-foreground">
          Kumpulan berita, kegiatan, dan update operasional perusahaan.
        </p>
      </div>

      <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 pb-12 lg:pb-16">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-12 lg:col-span-9">
            <NewsGrid initialPosts={sorted as NewsPost[]} page={page} pageSize={size} />
            <NewsPagination current={page} totalPages={totalPages} pageSize={size} />
          </div>
          <div className="col-span-12 lg:col-span-3">
            <NewsSidebar />
          </div>
        </div>
      </section>
    </main>
  );
}
