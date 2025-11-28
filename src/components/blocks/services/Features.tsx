"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const items = [
  { title: "legalitas perusahaan", icon: "/icons/shield.svg" },
  { title: "berpengalaman", icon: "/icons/badge.svg" },
  { title: "pendidikan dan pelatihan", icon: "/icons/badge.svg" },
  { title: "penyaluran tenaga satpam", icon: "/icons/handshake.svg" },
  { title: "pengawasan tim patroli", icon: "/icons/patrol.svg" },
  { title: "alat bantu operasional", icon: "/icons/tools.svg" },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-10 lg:py-16">
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {items.map((f, i) => (
          <motion.div
            key={f.title}
            className="col-span-12 sm:col-span-6 md:col-span-4"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
          >
            <div className="group rounded-xl border bg-card/40 p-5 hover:border-accent/70 hover:shadow-lg transition">
              <div className="h-10 w-10 rounded-lg ring-1 ring-border bg-card/60 overflow-hidden">
                <Image src={f.icon} alt={f.title} width={40} height={40} style={{ filter: "invert(32%) sepia(78%) saturate(548%) hue-rotate(185deg) brightness(95%) contrast(92%)" }} />
              </div>
              <p className="mt-3 font-semibold capitalize">{f.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
