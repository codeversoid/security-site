"use client";
import { motion } from "framer-motion";

export default function ExperienceIntro() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-10 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="rounded-xl border bg-card/40 p-6 space-y-3"
      >
        <h2 className="text-xl font-semibold tracking-tight">Pengalaman Kami</h2>
        <h3 className="text-lg font-semibold">Hadir Sejak Tahun 2018</h3>
        <p className="text-sm text-muted-foreground max-w-4xl">
          PT. Lemos Jaya Perkasa berpengalaman sejak 2018 dalam penyediaan jasa pengamanan, dengan
          pembinaan SDM berstandar dan sistem kerja terintegrasi. Kami berkomitmen menjaga mutu
          layanan di berbagai sektor melalui rekrutmen selektif, pelatihan berkelanjutan, dan
          pengawasan rutin.
        </p>
      </motion.div>
    </section>
  );
}
