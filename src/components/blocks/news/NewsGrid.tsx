"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NewsCard, { NewsPost } from "./NewsCard";

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

interface Props {
  className?: string;
  initialPosts?: NewsPost[];
  page?: number;
  pageSize?: number;
}

export default function NewsGrid({ className, initialPosts, page, pageSize }: Props) {
  const [posts, setPosts] = useState<NewsPost[]>(
    Array.isArray(initialPosts) && initialPosts.length > 0 ? initialPosts : fallbackPosts
  );

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
          setPosts(sorted);
          return;
        }
      } catch {
        // keep current posts (initial or previous)
      }
    })();
  }, []);

  const currentPage = typeof page === "number" && page > 0 ? page : 1;
  const size = typeof pageSize === "number" && pageSize > 0 ? pageSize : 12;
  const start = (currentPage - 1) * size;
  const visible = posts.slice(start, start + size);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={`grid grid-cols-12 gap-4 md:gap-6 items-stretch ${className ?? ""}`}
    >
      {visible.map((post, i) => (
        <div key={post.slug} className="col-span-12 sm:col-span-6 md:col-span-4 h-full">
          <NewsCard post={post} index={i} />
        </div>
      ))}
    </motion.div>
  );
}
