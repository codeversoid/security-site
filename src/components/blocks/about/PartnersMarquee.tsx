"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Partner = { name?: string; logoUrl?: string };

export default function PartnersMarquee() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/about", { cache: "no-store" });
        const json = await res.json();
        const arr: any[] = Array.isArray(json?.data?.partners) ? json.data.partners : [];
        const normalized: Partner[] = arr
          .map((p) => ({ name: typeof p?.name === "string" ? p.name : undefined, logoUrl: typeof p?.logoUrl === "string" ? p.logoUrl : undefined }))
          .filter((p) => (p.name && p.name.trim()) || (p.logoUrl && p.logoUrl.trim()));
        setPartners(normalized);
      } catch {}
    })();
  }, []);

  const fallback: Partner[] = [
    { logoUrl: "/partners/partner-vision.svg", name: "Vision" },
    { logoUrl: "/partners/partner-axa.svg", name: "AXA" },
    { logoUrl: "/partners/partner-safecorp.svg", name: "SafeCorp" },
    { logoUrl: "/partners/partner-protecta.svg", name: "Protecta" },
    { logoUrl: "/partners/partner-guardline.svg", name: "GuardLine" },
  ];

  // Dedupe data secara deterministik, lalu bagi round-robin ke 3 baris.
  // Penting: tidak ada randomness di sini agar SSR dan initial client render identik.
  const lanes = useMemo(() => {
    const source = partners.length > 0 ? partners : fallback;
    const seen = new Set<string>();
    const unique: Partner[] = [];
    for (const p of source) {
      const id = (p.logoUrl || p.name || "").trim().toLowerCase();
      if (!id || seen.has(id)) continue;
      seen.add(id);
      unique.push(p);
    }
    const laneCount = 3;
    const out: Partner[][] = Array.from({ length: laneCount }, () => []);
    unique.forEach((p, idx) => {
      out[idx % laneCount].push(p);
    });
    return out;
  }, [partners]);

  // Setelah komponen mount di client, acak distribusi agar setiap baris berisi item yang random
  // tanpa memicu hydration mismatch (random hanya terjadi setelah mount).
  const [useRandom, setUseRandom] = useState(false);
  useEffect(() => {
    setUseRandom(true);
  }, []);

  const displayLanes = useMemo(() => {
    if (!useRandom) return lanes; // tahap SSR + initial client render aman
    const all = lanes.flat();
    if (all.length === 0) return lanes;
    const shuffled = all.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = tmp;
    }
    // Proporsi sama: bagi merata per baris, isi dengan wrap jika kurang
    const perLane = Math.ceil(shuffled.length / 3);
    const out: Partner[][] = [[], [], []];
    for (let laneIdx = 0; laneIdx < 3; laneIdx++) {
      for (let i = 0; i < perLane; i++) {
        const pick = shuffled[(laneIdx * perLane + i) % shuffled.length];
        out[laneIdx].push(pick);
      }
    }
    return out;
  }, [lanes, useRandom]);

  const Item = ({ p, i }: { p: Partner; i: number }) => (
    <div className="shrink-0 opacity-80 hover:opacity-100 transition">
      {p.logoUrl ? (
        <Image src={p.logoUrl} alt={p.name || "Logo mitra"} width={140} height={56} />
      ) : (
        <div className="px-4 py-2 rounded-full border border-zinc-800 bg-card/40 text-sm font-medium transition hover:border-accent hover:text-accent hover:shadow-md">
          {p.name}
        </div>
      )}
    </div>
  );

  const Row = ({ items, reverse = false }: { items: Partner[]; reverse?: boolean }) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const [distance, setDistance] = useState<number>(800);
    // Hitung jarak animasi berdasarkan lebar konten (setengah dari konten karena kita duplikasi array)
    useEffect(() => {
      const calc = () => {
        const el = innerRef.current;
        if (!el) return;
        const w = el.scrollWidth;
        const half = Math.max(400, Math.floor(w / 2));
        setDistance(half);
      };
      // Hitung saat mount dan ketika ukuran viewport berubah
      calc();
      window.addEventListener("resize", calc);
      return () => window.removeEventListener("resize", calc);
    }, [items.length]);

    // Kecepatan konstan (px/detik) agar durasi menyesuaikan jarak
    const speed = 100; // px/s
    const duration = Math.max(8, distance / speed);

    const renderItems = items.length > 0 ? items.concat(items) : fallback.concat(fallback);

    return (
      <div className="relative overflow-hidden">
        <motion.div
          ref={innerRef}
          className="flex items-center gap-10"
          initial={{ x: 0 }}
          animate={{ x: reverse ? [0, distance] : [0, -distance] }}
          transition={{ duration, ease: "linear", repeat: Infinity }}
        >
          {renderItems.map((p, i) => (
            <Item key={`${p.logoUrl || p.name || 'no-id'}-${i}`} p={p} i={i} />
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-10 lg:py-16">
      <p className="text-sm font-medium tracking-wide text-accent">Support</p>
      <h2 className="mt-1 text-xl md:text-2xl font-semibold tracking-tight">Rekan & Mitra</h2>
      <div className="mt-6 space-y-6">
        <Row items={displayLanes[0] || []} />
        <Row items={displayLanes[1] || []} />
        <Row items={displayLanes[2] || []} />
      </div>
    </section>
  );
}
