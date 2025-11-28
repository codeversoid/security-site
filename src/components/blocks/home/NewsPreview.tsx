"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NewsCard, { NewsPost } from "../../blocks/news/NewsCard";

const fallbackPosts: NewsPost[] = [
  {
    slug: "apel-gabungan-pengamanan-mei-2024",
    title: "Apel Gabungan Pengamanan  Mei 2024",
    excerpt:
      "Pelaksanaan apel gabungan untuk memastikan kesiapsiagaan personil dalam tugas pengamanan di berbagai objek vital.",
    date: "05 Mei 2024",
    image: "/news/news-01.svg",
  },
  {
    slug: "pelatihan-gada-pratama-angkatan-12",
    title: "Pelatihan Gada Pratama  Angkatan 12",
    excerpt:
      "Program pelatihan berbasis kompetensi bagi calon satpam dengan kurikulum terkini dan instruktur berpengalaman.",
    date: "18 Juni 2024",
    image: "/news/news-02.svg",
  },
  {
    slug: "sertifikasi-personil-keamanan-semester-i",
    title: "Sertifikasi Personil Keamanan  Semester I",
    excerpt:
      "Kegiatan sertifikasi ulang untuk menjaga standar layanan keamanan sesuai regulasi dan kebutuhan klien.",
    date: "02 Juli 2024",
    image: "/news/news-03.svg",
  },
];

export default function NewsPreview() {
  const [previewPosts, setPreviewPosts] = useState<NewsPost[]>(fallbackPosts);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/news", { cache: "no-store" });
        const json = await res.json();
        const items: unknown = json?.data?.posts ?? json?.posts;
        if (Array.isArray(items) && items.length > 0) {
          const sorted = (items as NewsPost[])
            .slice()
            .sort((a, b) => (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0));
          setPreviewPosts(sorted.slice(0, 3));
        }
      } catch {
        // keep fallback
      }
    })();
  }, []);

  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-12 lg:py-20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium tracking-wide text-accent">Untuk Informasi Lebih Lanjut</p>
          <h2 className="mt-1 text-xl md:text-2xl font-semibold tracking-tight">Berita Terbaru</h2>
        </div>
        <Link
          href="/news"
          className="text-sm rounded-full border px-3 py-1.5 hover:border-accent hover:text-accent transition"
        >
          Lihat Semua Berita
        </Link>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mt-6 grid grid-cols-12 gap-4 md:gap-6 items-stretch"
      >
        {previewPosts.map((post, i) => (
          <div key={post.slug} className="col-span-12 sm:col-span-6 md:col-span-4 h-full">
            <NewsCard post={post} index={i} />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
