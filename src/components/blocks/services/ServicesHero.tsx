"use client";
import { motion } from "framer-motion";

export default function ServicesHero() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="space-y-4"
      >
        <p className="text-sm font-medium tracking-wide text-accent">Layanan & Diklat</p>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Jasa Satpam & Diklat Satpam</h1>
          <div className="mt-2 h-1 w-16 bg-accent rounded-full" />
        </div>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
          Pengadaan tenaga pengamanan terlatih serta pendidikan dan pelatihan bekerjasama dengan Kepolisian.
        </p>
      </motion.div>
    </section>
  );
}
