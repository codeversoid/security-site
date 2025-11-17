"use client";
import { motion } from "framer-motion";

const steps = [
  { year: "2015", text: "Mulai operasional dan pengembangan SOP pengamanan." },
  { year: "2018", text: "Integrasi sistem teknologi monitoring dan laporan digital." },
  { year: "2021", text: "Perluasan layanan lintas sektor dan skala." },
  { year: "2024", text: "Pembinaan berkelanjutan dan peningkatan mutu layanan." },
];

export default function Timeline() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-12 lg:py-20">
      <h2 className="text-xl font-semibold">Perjalanan</h2>
      <div className="mt-6 grid grid-cols-12 gap-4 md:gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.year}
            className="col-span-12 md:col-span-3"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.08 }}
          >
            <div className="rounded-xl border bg-card/40 p-5">
              <div className="text-accent font-semibold">{s.year}</div>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}