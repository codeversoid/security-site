"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type AboutData = {
  directorName?: string;
  directorTitle?: string;
  directorPhotoUrl?: string;
  directorMessage?: string;
  aboutLogoUrl?: string;
};

export default function DirectorMessage() {
  const [about, setAbout] = useState<AboutData | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/about", { cache: "no-store" });
        const json = await res.json();
        setAbout(json?.data ?? null);
      } catch {}
    })();
  }, []);

  const name = about?.directorName || "Direktur";
  const title = about?.directorTitle || "Sambutan Direktur";
  const msg = about?.directorMessage || "Terima kasih atas kepercayaan Anda.";
  const photo = about?.directorPhotoUrl || "";

  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-12 lg:py-20">
      <div className="grid gap-6 md:grid-cols-[200px_1fr] md:items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          <div className="h-40 w-40 rounded-full border bg-card/40 shadow-md overflow-hidden">
            {photo ? (
              <img src={photo} alt={name} className="h-full w-full object-cover object-center" />
            ) : null}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="rounded-xl border bg-card/40 p-6"
        >
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{msg}</p>
          <p className="mt-3 text-sm">— {name}</p>
        </motion.div>
      </div>
    </section>
  );
}