"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export interface NewsPost {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO or display string
  image: string;
}

interface Props {
  post: NewsPost;
  index?: number;
}

export default function NewsCard({ post, index = 0 }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-xl border bg-card/40 h-full"
    >
      <Link prefetch href={`/news/${post.slug || post.id}`} className="flex h-full flex-col">
        <div className="relative">
          <Image
            src={post.image}
            alt={post.title || "Berita"}
            width={800}
            height={600}
            className="h-48 w-full object-cover object-center md:h-56 lg:h-64 transition-transform duration-300 group-hover:scale-[1.03]"
            priority={index < 2}
          />
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/25 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <p className="text-black font-semibold line-clamp-1">{post.title}</p>
            </div>
          </div>
          <div className="absolute inset-0 rounded-xl ring-1 ring-transparent group-hover:ring-accent/70 transition" />
        </div>

        <div className="p-4 flex flex-col flex-1">
          <p className="text-sm text-muted-foreground">{post.date}</p>
          <h3 className="mt-1 font-semibold leading-snug line-clamp-2">{post.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
          <div className="mt-4 inline-flex items-center gap-2 text-accent font-medium mt-auto">
            <span>Baca selengkapnya</span>
            <span aria-hidden>→</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
