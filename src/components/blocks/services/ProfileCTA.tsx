"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProfileCTA() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-10 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-xl border bg-card/40 p-6"
      >
        <h2 className="text-xl font-semibold tracking-tight">company profile</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
          Untuk lebih mengenal GardaSecurity secara lebih dalam, dapatkan brosur atau company profile dengan cara download link di bawah ini. Jadilah mitra terbaik kami.
        </p>
        <div className="mt-4">
          <Link
            href="/download/compro"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:border-accent hover:text-accent transition"
          >
            Download Brosur
            <span aria-hidden>↓</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
