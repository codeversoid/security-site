"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

type ContactItem = {
  label: string;
  value: string;
  href?: string;
  icon?: React.ReactNode;
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactInfo() {
  const [site, setSite] = useState<{ phone?: string; email?: string; whatsapp?: string; address?: string } | null>(null);
  const sizeClassFor = (text: string) => {
    const len = (text || "").length;
    if (len > 60) return "text-xs md:text-sm break-words";
    if (len > 36) return "text-sm md:text-base break-words";
    return "text-base md:text-lg";
  };
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/site", { cache: "no-store" });
        const json = await res.json();
        setSite(json?.data ?? null);
      } catch {}
    })();
  }, []);

  const items: ContactItem[] = [
    { label: "Telepon", value: site?.phone ?? "+62 812-3456-7890", href: site?.phone ? `tel:${site.phone.replace(/\s|-/g, "")}` : "tel:+6281234567890" },
    { label: "Email", value: site?.email ?? "halo@security.co.id", href: site?.email ? `mailto:${site.email}` : "mailto:halo@security.co.id" },
    { label: "WhatsApp", value: site?.whatsapp ? `+${site.whatsapp}` : "+62 812-3456-7890", href: site?.whatsapp ? `https://wa.me/${site.whatsapp}` : "https://wa.me/6281234567890" },
    { label: "Alamat", value: site?.address ?? "Jl. Keamanan No. 86, Jakarta" },
  ];

  return (
    <section aria-label="Informasi Kontak" className="relative">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.08 }}
        className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-8 shadow-lg shadow-black/20 ring-1 ring-zinc-800"
      >
        <motion.h3
          variants={fadeUp}
          className="text-xl md:text-2xl font-semibold tracking-tight text-white"
        >
          Kontak Perusahaan
        </motion.h3>
        <motion.p
          variants={fadeUp}
          className="mt-2 text-sm md:text-base text-zinc-300"
        >
          Hubungi kami melalui saluran berikut. Kami siap membantu kebutuhan keamanan Anda.
        </motion.p>

        <div className="mt-6 space-y-4">
          {items.map((item, idx) => (
            <motion.div key={item.label} variants={fadeUp}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="group flex w-full items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 transition duration-300 hover:border-amber-500/50 hover:bg-zinc-900/80 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                >
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-zinc-400">{item.label}</p>
                    <p className={`mt-1 font-medium text-white group-hover:text-amber-400 transition-colors break-words ${sizeClassFor(item.value)}`}>{item.value}</p>
                  </div>
                </Link>
              ) : (
                <div className="flex items-start justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-zinc-400">{item.label}</p>
                    <p className={`mt-1 font-medium text-white break-words ${sizeClassFor(item.value)}`}>{item.value}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="mt-6">
          <Link
            href="/download/compro"
            prefetch
            className="inline-flex items-center gap-2 rounded-xl border border-amber-500/40 bg-gradient-to-b from-amber-500/20 to-amber-600/10 px-4 py-3 text-amber-300 transition-all hover:border-amber-400 hover:from-amber-500/30 hover:to-amber-600/20 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
            Download Company Profile
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}