"use client";
import { useEffect, useState } from "react";

interface SiteConfig { comproUrl?: string }

export default function BrochureCTA() {
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

  const brochureHref = "/download/compro";

  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-12 lg:py-20">
      <div className="rounded-2xl border border-accent/40 bg-gradient-to-b from-accent/10 to-accent/5 p-6 md:p-8">
        <h3 className="text-base md:text-lg font-semibold tracking-tight">
          Unduh brosur perusahaan dan Panduan Fitur Layanan
        </h3>
        <p className="mt-2 text-sm md:text-base text-accent/90">
          Dapatkan ringkasan layanan, legalitas, dan keunggulan fitur kami.
        </p>
        <div className="mt-4">
          {/* Gunakan route /download/compro agar selalu menuju URL terbaru dari database */}
          <a
            href={brochureHref}
            className="inline-flex items-center gap-2 rounded-xl border border-accent/50 bg-accent/15 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/25 transition"
          >
            Unduh PDF
            <span aria-hidden>↓</span>
          </a>
          {!site?.comproUrl && (
            <span className="ml-3 text-xs text-muted-foreground">
              Tempatkan file di `public/brochure.pdf` atau atur `comproUrl` di admin.
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
