"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import LightboxModal from "./LightboxModal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type GalleryItem = { src: string; alt: string; category: string };
type Category = { id: string; name: string };

const fallbackCategories: Category[] = [
  { id: "diklat", name: "Diklat" },
  { id: "event", name: "Event" },
  { id: "sertifikasi", name: "Sertifikasi" },
];
const fallbackItems: GalleryItem[] = [
  { src: "/gallery/gallery-01.svg", alt: "Pelatihan Dasar Satpam", category: "diklat" },
  { src: "/gallery/gallery-02.svg", alt: "Latihan Kedisiplinan", category: "diklat" },
  { src: "/gallery/gallery-03.svg", alt: "Gada Pratama Angkatan XII", category: "diklat" },
  { src: "/gallery/gallery-04.svg", alt: "Pengamanan Event Korporasi", category: "event" },
  { src: "/gallery/gallery-05.svg", alt: "Manajemen Kerumunan", category: "event" },
  { src: "/gallery/gallery-06.svg", alt: "Protokol VIP", category: "event" },
  { src: "/gallery/gallery-07.svg", alt: "Uji Kompetensi Sertifikasi", category: "sertifikasi" },
  { src: "/gallery/gallery-08.svg", alt: "Penyerahan Sertifikat", category: "sertifikasi" },
];

export default function GalleryGrid() {
  const [categories, setCategories] = useState<Category[]>(fallbackCategories);
  const [items, setItems] = useState<GalleryItem[]>(fallbackItems);
  const [tab, setTab] = useState<string>(fallbackCategories[0].id);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const ITEMS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/gallery", { cache: "no-store" });
        const json = await res.json();
        const cats: Category[] = (json?.data?.categories ?? json?.categories) ?? fallbackCategories;
        const its: GalleryItem[] = (json?.data?.items ?? json?.items) ?? fallbackItems;
        setCategories(cats);
        setItems(its);
        setTab(cats[0]?.id ?? fallbackCategories[0].id);
      } catch {
        // keep fallback
      }
    })();
  }, []);

  const filtered = useMemo(() => items.filter((it) => it.category === tab), [items, tab]);
  const totalPages = useMemo(() => Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE)), [filtered.length]);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paged = useMemo(() => filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE), [filtered, startIdx]);

  useEffect(() => {
    // Reset ke halaman pertama saat ganti tab atau data berubah
    setCurrentPage(1);
  }, [tab, filtered.length]);

  const onOpen = (i: number) => {
    setIndex(i);
    setOpen(true);
  };
  const onPrev = () => setIndex((i) => (i === 0 ? filtered.length - 1 : i - 1));
  const onNext = () => setIndex((i) => (i === filtered.length - 1 ? 0 : i + 1));

  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-10 lg:py-16">
      {/* Tabs filter */}
      <div className="flex justify-end">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            {categories.map((c) => (
              <TabsTrigger key={c.id} value={c.id}>{c.name}</TabsTrigger>
            ))}
          </TabsList>
          {categories.map((c) => (
            <TabsContent key={c.id} value={c.id} />
          ))}
        </Tabs>
      </div>

      <div className="mt-6 grid grid-cols-12 gap-4 md:gap-6">
        {paged.map((img, i) => (
          <motion.button
            key={`${img.src}-${i}`}
            type="button"
            className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 group"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.05 }}
            onClick={() => onOpen(i)}
          >
            <div className="relative overflow-hidden rounded-xl border bg-card/40">
              <Image
                src={img.src}
                alt={img.alt || "Gambar galeri"}
                width={800}
                height={600}
                className="h-40 w-full object-cover md:h-52 lg:h-56 transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-start">
                  <p className="text-white font-medium">{img.alt}</p>
                </div>
              </div>
              <div className="absolute inset-0 rounded-xl ring-1 ring-transparent group-hover:ring-[#D4AF37]/70 transition" />
            </div>
          </motion.button>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground"
            aria-label="Sebelumnya"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            ←
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={`page-${p}`}
              type="button"
              className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full border px-3 text-sm ${
                currentPage === p ? "bg-primary text-primary-foreground" : "bg-background hover:bg-accent hover:text-accent-foreground"
              }`}
              aria-current={currentPage === p ? "page" : undefined}
              onClick={() => setCurrentPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground"
            aria-label="Berikutnya"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            →
          </button>
        </div>
      )}

      <LightboxModal
        open={open}
        images={filtered.map(({ src, alt }) => ({ src, alt }))}
        index={index}
        onClose={() => setOpen(false)}
        onPrev={onPrev}
        onNext={onNext}
      />
    </section>
  );
}
