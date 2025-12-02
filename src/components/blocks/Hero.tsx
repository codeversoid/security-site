"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [heroUrl, setHeroUrl] = useState<string>("");
  const [heroReady, setHeroReady] = useState<boolean>(false);
  const [site, setSite] = useState<{ whatsapp?: string } | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/site", { cache: "no-store" });
        const json = await res.json();
        const url = String(json?.data?.homeHeroImageUrl ?? "");
        setSite(json?.data ?? null);
        if (url) {
          try {
            const head = await fetch(url, { method: "HEAD" });
            if (head.ok) {
              setHeroUrl(url + (url.includes("?") ? "&" : "?") + `v=${Date.now()}`);
              setHeroReady(true);
            } else {
              setHeroUrl("");
              setHeroReady(false);
            }
          } catch {
            setHeroUrl("");
            setHeroReady(false);
          }
        }
      } catch {}
    })();
  }, []);
  const waHref = site?.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Halo%2C%20saya%20ingin%20konsultasi%20layanan%20keamanan")}`
    : "https://wa.me/6281234567890?text=Halo%2C%20saya%20ingin%20konsultasi%20layanan%20keamanan";
  return (
    <section className="relative overflow-hidden">
      {/* Background image + overlay gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/10 to-white/80" />

      <div className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-16 lg:py-24">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Aman & Bersih, Kami yang Urus — Anda Fokus Berkembang
            </h1>
            <p className="text-foreground/80">
              Kami menyediakan tenaga pengamanan, office boy, dan cleaning service terlatih agar
              perusahaan Anda tetap aman, bersih, dan produktif.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" className="rounded-full active:bg-accent active:text-accent-foreground">
                <Link href={waHref} target="_blank" rel="noopener noreferrer">
                  Konsultasi via WhatsApp
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/training" prefetch>Lihat Diklat Gada</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="aspect-video rounded-xl border overflow-hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            {heroUrl && heroReady ? (
              // gunakan img biasa agar tidak tergantung Next/Image config
              <img src={heroUrl} alt="Hero Image" className="h-full w-full object-cover object-center" />
            ) : (
              <div className="h-full w-full bg-card/40" />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
