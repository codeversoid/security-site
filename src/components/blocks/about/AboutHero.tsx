"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type AboutData = { aboutLogoUrl?: string };
type SiteData = { siteName?: string };

export default function AboutHero() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [siteName, setSiteName] = useState<string>("GardaSecurity");
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/about", { cache: "no-store" });
        const json = await res.json();
        setAbout(json?.data ?? null);
      } catch {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/site", { cache: "no-store" });
        const json = await res.json();
        const name = String(json?.data?.siteName ?? "GardaSecurity");
        setSiteName(name);
      } catch {}
    })();
  }, []);

  const logo = about?.aboutLogoUrl || "/logo.svg";

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/10 to-black/60" />
      <div className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-4 md:space-y-6"
        >
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <div className="h-16 w-16 md:h-20 md:w-20 overflow-visible">
              {logo ? (
                <img src={logo} alt="Logo GardaSecurity" className="h-full w-full object-contain" />
              ) : null}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{siteName}</h1>
          </div>
          {/* Emphasis tagline to reinforce services */}
          <div
            className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3 py-1 text-xs md:text-sm text-[#D4AF37] font-semibold tracking-wide uppercase w-fit"
            aria-label="Outsourcing Jasa Pengamanan, Office Boy, dan Cleaning Service"
          >
            <span>OUTSOURCING JASA PENGAMANAN, OFFICE BOY DAN CLEANING SERVICE</span>
          </div>
          <p className="text-sm md:text-base text-foreground/80 max-w-3xl leading-relaxed break-words">
            Kami adalah PT. Lemos Jaya Perkasa, perusahaan outsourcing yang menghadirkan layanan pengamanan, office boy,
            dan cleaning service secara profesional, cepat, dan terpercaya. Dengan pengalaman dan tenaga kerja terlatih,
            kami membantu perusahaan menjaga keamanan, kebersihan, dan kenyamanan lingkungan kerja, sehingga Anda bisa
            fokus pada pertumbuhan bisnis tanpa khawatir dengan operasional pendukung. Kami memahami pentingnya kepercayaan
            dan konsistensi. Karena itu, setiap tenaga kerja kami diseleksi ketat, dibekali pelatihan berstandar tinggi,
            dan diawasi secara berkala untuk memastikan hasil kerja maksimal di setiap lokasi.
          </p>
        </motion.div>
      </div>
    </section>
  );
}