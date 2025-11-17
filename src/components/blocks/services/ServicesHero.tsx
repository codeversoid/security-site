"use client";
import { motion } from "framer-motion";

export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/15 to-black/60" />
      <div className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-3"
        >
          <h1>Jasa Satpam & Diklat Satpam</h1>
          <p className="text-foreground/80 max-w-2xl">
            Pengadaan tenaga pengamanan terlatih serta pendidikan dan pelatihan bekerjasama dengan Kepolisian.
          </p>
        </motion.div>
      </div>
    </section>
  );
}