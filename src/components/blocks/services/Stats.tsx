"use client";
import { motion } from "framer-motion";

const stats = [
  { label: "legalitas perusahaan", value: 100 },
  { label: "berpengalaman", value: 95 },
  { label: "Pendidikan dan pelatihan", value: 95 },
  { label: "penyaluran tenaga satpam", value: 85 },
  { label: "pengawasan tim patroli", value: 85 },
  { label: "alat bantu operasional", value: 85 },
];

export default function Stats() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-6 lg:py-10">
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="col-span-12 sm:col-span-6 md:col-span-4"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.06 }}
          >
            <div className="rounded-xl border bg-card/40 p-5 hover:border-[#D4AF37]/70 hover:shadow-lg transition">
              <p className="font-semibold capitalize">{s.label}</p>
              <div className="mt-3 h-2 w-full rounded-full bg-muted">
                <motion.div
                  className="h-2 rounded-full bg-[#D4AF37]"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{s.value}%</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}