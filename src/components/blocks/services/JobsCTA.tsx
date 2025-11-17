"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function JobsCTA() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-10 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-xl border bg-card/40 p-6"
      >
        <h2 className="text-xl font-semibold tracking-tight">lamaran satpam</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
          GADA-86 membutuhkan personil yang siap dengan tantangan untuk ditempatkan di berbagai instansi
          pemerintahan atau swasta. Segera kirim lamaran ke kami melalui link di bawah ini.
        </p>
        <div className="mt-4">
          <Link
            href="/contact?apply=satpam"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
          >
            Kirim Lamaran
            <span aria-hidden>→</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}