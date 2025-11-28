"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ServiceTiles() {
  const tiles = [
    {
      title: "JASA SATPAM",
      descLines: [
        "Pengamanan profesional untuk area kantor, pabrik, ritel, dan fasilitas publik.",
        "Rekrutmen ketat, pelatihan berstandar, penempatan sesuai kebutuhan, serta pembinaan & pengawasan rutin.",
      ],
      href: "/contact?service=security",
      ariaLabel: "Selengkapnya tentang Jasa Satpam",
    },
    {
      title: "CLEANING SERVICE",
      descLines: [
        "Kebersihan harian dan berkala untuk kantor & area publik.",
        "Pembersihan ruang kerja, kaca & lantai, pengelolaan sampah, serta perawatan tanaman—rapi, higienis, dan konsisten.",
      ],
      href: "/contact?service=cleaning",
      ariaLabel: "Selengkapnya tentang Cleaning Service",
    },
    {
      title: "OFFICE BOY/GIRL",
      descLines: [
        "Dukungan operasional perkantoran yang sigap & disiplin.",
        "Penataan ruang, penyajian konsumsi, antar-dokumen, bantuan rapat/tamu, dan program evaluasi kinerja berkala.",
      ],
      href: "/contact?service=office",
      ariaLabel: "Selengkapnya tentang Office Boy/Girl",
    },
  ];
  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-10 lg:py-16">
      <div className="mb-6 md:mb-8">
        <p className="text-sm font-medium tracking-wide text-accent">Sorotan Layanan</p>
        <h2 className="mt-1 text-xl md:text-2xl font-semibold tracking-tight">Layanan Unggulan</h2>
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-6 items-stretch">
        {tiles.map((t, i) => (
          <motion.div
            key={t.title}
            className="col-span-12 sm:col-span-6 md:col-span-4 h-full"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.08 }}
          >
            <div className="group rounded-xl border bg-card/40 p-6 hover:border-accent/70 hover:shadow-lg transition h-full flex flex-col">
              <h2 className="text-xl font-semibold tracking-tight">{t.title}</h2>
              <div className="mt-2 space-y-1">
                {Array.isArray(t.descLines)
                  ? t.descLines.map((line, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground leading-relaxed">{line}</p>
                    ))
                  : null}
              </div>
              <div className="mt-6">
                <Link
                  href={t.href}
                  prefetch
                  aria-label={t.ariaLabel}
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:border-accent hover:text-accent transition focus-visible:ring-2 focus-visible:ring-accent/50"
                >
                  Selengkapnya
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
