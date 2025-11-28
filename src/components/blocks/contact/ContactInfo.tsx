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
        className="rounded-2xl border bg-card/40 p-6 md:p-8 shadow-lg"
      >
        <motion.h3
          variants={fadeUp}
          className="text-xl md:text-2xl font-semibold tracking-tight text-foreground"
        >
          Kontak Perusahaan
        </motion.h3>
        <motion.p
          variants={fadeUp}
          className="mt-2 text-sm md:text-base text-foreground"
        >
          Hubungi kami melalui saluran berikut. Kami siap membantu kebutuhan keamanan Anda.
        </motion.p>

        <div className="mt-6 space-y-4">
          {items.map((item, idx) => (
            <motion.div key={item.label} variants={fadeUp}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="group flex w-full items-center justify-between rounded-xl border bg-card/40 p-4 transition duration-300 hover:border-accent/50 hover:bg-card/60 focus:outline-none focus:ring-2 focus:ring-accent/40"
                >
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</p>
                    <p className={`mt-1 font-medium text-foreground group-hover:text-accent transition-colors break-words ${sizeClassFor(item.value)}`}>{item.value}</p>
                  </div>
                </Link>
              ) : (
                <div className="flex items-start justify-between rounded-xl border bg-card/40 p-4">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</p>
                    <p className={`mt-1 font-medium text-foreground break-words ${sizeClassFor(item.value)}`}>{item.value}</p>
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
            className="inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-gradient-to-b from-accent/20 to-accent/10 px-4 py-3 text-accent transition-all hover:border-accent/60 hover:from-accent/30 hover:to-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            Download Company Profile
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
