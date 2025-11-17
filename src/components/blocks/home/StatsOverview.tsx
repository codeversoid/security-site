"use client";
import { motion } from "framer-motion";

export default function StatsOverview() {
  const stats = [
    { value: 2300, label: "Proyek Selesai" },
    { value: 1500, label: "Karyawan Berkualifikasi" },
    { value: 3100, label: "Kesepakatan Ditangani" },
    { value: 1200, label: "Klien Puas" },
  ];

  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-12 lg:py-20">
      <div className="rounded-2xl border border-zinc-800 bg-card/40 p-6 md:p-8">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="text-sm font-medium tracking-wide text-amber-300">Sorotan Kinerja</p>
            <h2 className="mt-1 text-xl md:text-2xl font-semibold tracking-tight">Keamanan & Kebersihan  Terpercaya  — Bukti Hasil</h2>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-12 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="col-span-12 sm:col-span-6 lg:col-span-3 rounded-xl border border-zinc-800 bg-card/30 p-5"
            >
              <div className="flex items-center gap-3">
                <span className="inline-block h-2 w-2 rounded-full bg-[#D4AF37]" />
                <span className="text-3xl font-bold tracking-tight text-white">{s.value.toLocaleString()}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}