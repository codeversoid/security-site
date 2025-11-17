"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9819958142957!2d107.53585191436713!3d-6.8927565693650665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e5ad9af09abf%3A0xaa21bd0d5500bdb0!2sGADA%2086%20Comando!5e0!3m2!1sen!2sid!4v1591876630041!5m2!1sen!2sid";

export default function ContactMap() {
  const [interactive, setInteractive] = useState(false);

  return (
    <section aria-label="Peta Lokasi" className="relative">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-2xl border border-zinc-800 ring-1 ring-zinc-800 bg-zinc-900/40 overflow-hidden shadow-lg shadow-black/20"
      >
        <div className="flex items-center justify-between p-4 md:p-5">
          <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight">Lokasi Kantor</h3>
          <a
            href="https://maps.google.com/?q=GADA%2086%20Comando"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs md:text-sm text-amber-300 hover:text-amber-200 transition"
          >
            Buka di Google Maps
          </a>
        </div>

        <div className="relative aspect-video">
          <iframe
            title="Lokasi GADA 86 Comando"
            src={EMBED_SRC}
            className="h-full w-full"
            style={{ border: 0, pointerEvents: interactive ? "auto" : "none" }}
            loading="lazy"
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Top gradient to add depth */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/30 to-transparent" />

          {/* Overlay CTA to enable interaction */}
          {!interactive && (
            <div className="absolute inset-0 flex items-end p-4 md:p-5">
              <button
                type="button"
                onClick={() => setInteractive(true)}
                aria-label="Aktifkan interaksi peta"
                className="inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] text-black px-4 py-2 font-medium shadow-sm hover:bg-[#C9A02E] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/60"
              >
                Interaksi Peta
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}