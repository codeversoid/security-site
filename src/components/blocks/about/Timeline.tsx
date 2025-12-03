"use client";
import { motion } from "framer-motion";

const steps = [
  {
    year: "2018",
    title: "Fondasi Operasional",
    text: "Mulai operasional dan pengembangan SOP pengamanan.",
    points: ["Pembentukan struktur organisasi", "Penyusunan SOP & standar layanan", "Rekrutmen awal & pelatihan dasar"],
  },
  {
    year: "2020",
    title: "Digitalisasi",
    text: "Integrasi sistem teknologi monitoring dan laporan digital.",
    points: ["Dashboard monitoring", "Pelaporan insiden terpusat", "Penyelarasan workflow digital"],
  },
  {
    year: "2021",
    title: "Ekspansi Layanan",
    text: "Perluasan layanan lintas sektor dan skala.",
    points: ["Penambahan sektor industri", "Peningkatan kapasitas personil", "Penguatan manajemen mutu"],
  },
  {
    year: "2023",
    title: "Peningkatan Mutu",
    text: "Pembinaan berkelanjutan dan peningkatan mutu layanan.",
    points: ["Program upskilling berkelanjutan", "Audit mutu internal berkala", "Kemitraan strategis"],
  },
];

export default function Timeline() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-12 lg:py-20">
      <h2 className="text-xl font-semibold">Perjalanan</h2>
      <div className="mt-6 grid grid-cols-12 gap-4 md:gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.year}
            className="col-span-12 md:col-span-3 h-full"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.08 }}
          >
            <div className="group h-full rounded-xl border bg-card/40 p-5 transition hover:border-accent/70 hover:shadow-lg hover:-translate-y-[1px]">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-gradient-to-r from-accent/15 to-accent/5 px-3 py-1 text-accent">
                  <span className="inline-block h-2 w-2 rounded-full bg-accent" />
                  <span className="text-xs font-semibold tracking-wide">{s.year}</span>
                </div>
              </div>
              <h3 className="mt-3 font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              <ul className="mt-3 space-y-1">
                {s.points.map((p: string, idx: number) => (
                  <li key={`${s.year}-${idx}`} className="text-sm text-muted-foreground inline-flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
