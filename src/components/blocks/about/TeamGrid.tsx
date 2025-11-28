"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Member = { name: string; role: string; imageUrl: string };

export default function TeamGrid() {
  const [team, setTeam] = useState<Member[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/about", { cache: "no-store" });
        const json = await res.json();
        const arr: Member[] = Array.isArray(json?.data?.team) ? (json.data.team as Member[]) : [];
        setTeam(arr);
      } catch {}
    })();
  }, []);

  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-12 lg:py-20">
      <h2 className="text-xl font-semibold tracking-tight">Struktur Tim</h2>
      <div className="mt-6 grid grid-cols-12 gap-4 md:gap-6">
        {team.map((m, i) => (
          <motion.div
            key={`${m.name}-${i}`}
            className="col-span-12 sm:col-span-6 md:col-span-4"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.08 }}
          >
            <div className="group rounded-xl border bg-card/40 p-5 transition hover:shadow-lg hover:-translate-y-[1px]">
              <div className="h-24 w-24 rounded-full ring-1 ring-border bg-card/60 overflow-hidden">
                {m.imageUrl ? (
                  <Image src={m.imageUrl} alt={m.name} width={96} height={96} className="object-cover object-center" />
                ) : null}
              </div>
              <h3 className="mt-4 font-semibold tracking-tight">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.role}</p>
              <div className="mt-3 h-px w-full bg-border" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
