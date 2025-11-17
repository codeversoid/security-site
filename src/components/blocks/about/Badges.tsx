"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const badges = [
  { title: "Legal & Perizinan", desc: "Dokumen lengkap dan kepatuhan regulasi.", icon: "/icons/shield.svg" },
  { title: "Pelatihan Bersertifikat", desc: "Pembinaan SDM terstandar dan berkelanjutan.", icon: "/icons/badge.svg" },
  { title: "Terintegrasi Teknologi", desc: "Monitoring, patroli digital, dan laporan real-time.", icon: "/icons/cctv.svg" },
];

export default function Badges() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-12 lg:py-20">
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {badges.map((b, i) => (
          <motion.div
            key={b.title}
            className="col-span-12 md:col-span-4"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
          >
            <div className="group rounded-xl border bg-card/40 p-5 hover:border-accent/70 hover:shadow-lg transition">
              <div className="h-10 w-10 rounded-lg ring-1 ring-border bg-card/60 overflow-hidden">
                <Image src={b.icon} alt={b.title} width={40} height={40} />
              </div>
              <h3 className="mt-3 font-semibold">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}