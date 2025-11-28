"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const certs = [
  { name: "Izin Operasional", icon: "/icons/shield.svg" },
  { name: "Diklat Gada", icon: "/icons/badge.svg" },
  { name: "Sistem CCTV", icon: "/icons/cctv.svg" },
  { name: "Kemitraan", icon: "/icons/handshake.svg" },
];

export default function Certifications() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-12 lg:py-20">
      <h2 className="text-xl font-semibold tracking-tight">Sertifikasi & Penunjang</h2>
      <div className="mt-6 grid grid-cols-12 gap-4 md:gap-6">
        {certs.map((c, i) => (
          <motion.div
            key={c.name}
            className="col-span-12 sm:col-span-6 md:col-span-3"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.08 }}
          >
            <div className="group rounded-xl border bg-card/40 p-5 min-h-[160px] hover:border-accent/70 hover:shadow-lg transition">
              <div className="h-12 w-12 rounded-lg ring-1 ring-border bg-card/60 overflow-hidden">
                <Image src={c.icon} alt={c.name} width={48} height={48} style={{ filter: "invert(32%) sepia(78%) saturate(548%) hue-rotate(185deg) brightness(95%) contrast(92%)" }} />
              </div>
              <h3 className="mt-3 font-semibold">{c.name}</h3>
              <p className="text-sm text-muted-foreground">Dokumen & standar teknis tersedia sesuai kebutuhan.</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
