"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AboutPreview() {
  const [aboutUrl, setAboutUrl] = useState<string>("");
  const [siteName, setSiteName] = useState<string>("");
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/site", { cache: "no-store" });
        const json = await res.json();
        const url = String(json?.data?.homeAboutImageUrl ?? "");
        const name = String(json?.data?.siteName ?? "");
        if (url) setAboutUrl(url);
        if (name) setSiteName(name);
      } catch {}
    })();
  }, []);
  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-12 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-2xl border border-zinc-800 bg-card/40 p-6 md:p-8"
      >
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-start">
          <div className="col-span-12 md:col-span-7">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">{siteName || "PT. Lemos Jaya Perkasa"}</h2>
            <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
              Kami adalah perusahaan outsourcing profesional yang menyediakan layanan pengamanan (satpam), office boy/girl, dan cleaning service.
              Berfokus pada kedisiplinan, kepatuhan hukum, dan pembinaan berkelanjutan, kami memastikan setiap personel bekerja dengan standar mutu tinggi
              untuk menjaga keamanan, kebersihan, dan kenyamanan lingkungan kerja klien.
            </p>
            <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
              <li className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-accent" /> Legalitas lengkap</li>
              <li className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-accent" /> Personel bersertifikat</li>
              <li className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-accent" /> Teknologi terintegrasi</li>
              <li className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-accent" /> Pengalaman lintas sektor</li>
            </ul>
            <div className="mt-6">
              <Link
                href="/about"
                prefetch
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:border-accent hover:text-accent transition"
              >
                Pelajari Tentang Kami
              </Link>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 md:self-center md:translate-y-1">
            <div className="aspect-video rounded-xl border overflow-hidden">
              {aboutUrl ? (
                <img src={aboutUrl} alt="About Image" className="h-full w-full object-cover object-center" />
              ) : (
                <div className="h-full w-full bg-card/30" />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
