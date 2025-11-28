"use client";
import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Props {
  open: boolean;
  images: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function LightboxModal({ open, images, index, onClose, onPrev, onNext }: Props) {
  const escHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", escHandler);
    return () => window.removeEventListener("keydown", escHandler);
  }, [open, escHandler]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <div className="absolute inset-0 grid place-items-center p-4" onClick={(e) => e.stopPropagation()}>
            <div className="relative max-w-5xl w-full">
              <Image
                src={images[index].src}
                alt={images[index].alt || "Gambar galeri"}
                width={1200}
                height={800}
                className="w-full h-auto rounded-xl border"
                priority
              />
              <div className="absolute inset-x-0 -bottom-14 flex items-center justify-between text-foreground">
                <button
                  onClick={onPrev}
                  className="rounded-full border border-foreground/30 bg-foreground/10 px-4 py-2 hover:bg-foreground/20"
                >
                  ← Prev
                </button>
                <button
                  onClick={onNext}
                  className="rounded-full border border-foreground/30 bg-foreground/10 px-4 py-2 hover:bg-foreground/20"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
