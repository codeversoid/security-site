"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SiteConfig { whatsapp?: string }

export default function FloatingWhatsApp() {
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
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Halo, saya ingin konsultasi layanan keamanan")}`
    : "https://wa.me/6281234567890?text=Halo%2C%20saya%20ingin%20konsultasi%20layanan%20keamanan";

  return (
    <Link
      href={waHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Buka WhatsApp untuk konsultasi"
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-background shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring hover:shadow-2xl"
    >
      <span className="text-xl">💬</span>
    </Link>
  );
}