"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Post = { id?: string; slug: string; title: string; date?: string };

export default function NewsSidebar() {
  const [recent, setRecent] = useState<Post[]>([]);
  const [comproHref, setComproHref] = useState<string>("/brochure.pdf");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/news", { cache: "no-store" });
        const json = await res.json();
        const items: any[] = json?.data?.posts ?? [];
        const sorted = items
          .slice()
          .sort((a, b) => (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0));
        setRecent(sorted.slice(0, 5).map((p) => ({ id: p.id, slug: p.slug, title: p.title, date: p.date })));
      } catch {}
      // Fallback ke data statis jika API kosong
      try {
        if (!Array.isArray(recent) || recent.length === 0) {
          const res2 = await fetch("/data/news.json", { cache: "no-store" });
          const json2 = await res2.json();
          const arr: any[] = Array.isArray(json2?.posts) ? json2.posts : [];
          const sorted2 = arr
            .slice()
            .sort((a, b) => (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0));
          setRecent(sorted2.slice(0, 5).map((p) => ({ id: p.id, slug: p.slug, title: p.title, date: p.date })));
        }
      } catch {}
      try {
        const s = await fetch("/api/site", { cache: "no-store" }).then((r) => r.json());
        const href = s?.data?.comproUrl;
        setComproHref(typeof href === "string" && href.length > 0 ? href : "/brochure.pdf");
      } catch {}
    })();
  }, []);

  return (
    <aside className="space-y-6">
      <div className="rounded-xl border bg-card/40 p-5">
        <h3 className="font-semibold tracking-tight">Pos-pos Terbaru</h3>
        <ul className="mt-4 space-y-3">
          {recent.map((p, i) => (
            <motion.li
              key={p.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                prefetch
                href={`/news/${p.slug || p.id}`}
                className="block rounded-md border border-transparent px-3 py-2 text-sm hover:text-accent transition-colors"
              >
                <span className="inline-block align-middle">{p.title}</span>
                <span className="float-right text-muted-foreground">→</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border bg-card/40 p-5">
        <h3 className="font-semibold tracking-tight">Download COMPRO</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Unduh company profile kami untuk informasi lengkap layanan.
        </p>
        <a
          href={comproHref}
          download
          className="mt-4 inline-flex items-center justify-center rounded-lg border border-accent/50 bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/20 transition"
        >
          Download COMPRO
        </a>
      </div>
    </aside>
  );
}
