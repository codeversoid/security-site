"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SiteConfig { whatsapp?: string }

export default function CustomerServiceCTA() {
  const [site, setSite] = useState<SiteConfig | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/site", { cache: "no-store" });
        const json = await res.json();
        setSite(json?.data ?? null);
      } catch {}
    })();
  }, []);

  const waHref = site?.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Halo, saya ingin bertanya tentang layanan PT. Lemos Jaya Perkasa")}`
    : "https://wa.me/6281234567890?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20layanan%20PT.%20Lemos%20Jaya%20Perkasa";

  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-10 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-xl border bg-card/40 p-6"
      >
        <h2 className="text-xl font-semibold tracking-tight">customer service</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
          PT. Lemos Jaya Perkasa siap melayani kebutuhan pengamanan Anda. Hubungi customer service kami
          untuk informasi layanan dan penawaran. Kami siap membantu Anda setiap saat.
        </p>
        <div className="mt-4 flex gap-3">
          <Link
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:border-accent hover:text-accent transition"
          >
            Tanya Jawab via WhatsApp
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:border-accent hover:text-accent transition"
          >
            Hubungi CS
            <span aria-hidden>→</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
