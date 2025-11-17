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
        className="space-y-3"
      >
        <h2 className="text-xl font-semibold tracking-tight">Pengalaman Kami</h2>
        <h3 className="text-lg font-semibold">Hadir Sejak Tahun 2015</h3>
        <p className="text-sm text-muted-foreground max-w-4xl">
          PT. GRAHA YUTAKA MUDA (GADA-86) berdiri pada tahun 2015 atau lima tahun GADA-86 telah
          memberikan layanan maksimal kepada para mitra kerja dalam pengamanan. Pengalaman adalah
          guru berharga bagi GADA-86 untuk menata langkah ke depan. GADA-86 tetap komitmen menjadi
          perusahaan outsourcing penyedia jasa tenaga keamanan dan pengelola pengamanan yang telah
          terintegrasi dengan kelengkapan peralatan Security Information of Technology System yang
          tersebar di seluruh Indonesia.
        </p>
      </motion.div>
    </section>
  );
}