"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function HelpForm() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const question = String(fd.get("question") || "").trim();
    const location = String(fd.get("location") || "").trim();
    const job = String(fd.get("job") || "").trim();
    const msg = String(fd.get("message") || "").trim();
    const subject = question ? `Pertanyaan: ${question}` : "Pertanyaan";
    const to = "pt.lemosjayaperkasa@gmail.com";
    const bodyText = `Nama: ${name}\nEmail: ${email}\n\n${msg}\n\nLokasi: ${location || "-"}\nPekerjaan: ${job || "-"}`;
    const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    try {
      window.open(href, "_self");
      setSubmitted(true);
      form.reset();
      setTimeout(() => setSubmitted(false), 3000);
    } catch {}
  };

  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-12 lg:py-20">
      <div className="rounded-2xl border border-zinc-800 bg-card/40 p-6 md:p-8">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="text-sm font-medium tracking-wide text-accent">Butuh Bantuan?</p>
            <h2 className="mt-1 text-xl md:text-2xl font-semibold tracking-tight">Konsultasi & Informasi Layanan</h2>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Kolom kiri: popular question copy */}
          <div className="col-span-12 lg:col-span-5">
            <div className="space-y-4 text-sm md:text-base text-muted-foreground">
              <p>
                Punya pertanyaan seputar layanan outsourcing tenaga kerja seperti satpam, office boy, atau cleaning service?
              </p>
              <p>
                Tim PT. Lemos Jaya Perkasa siap membantu Anda mulai dari konsultasi kebutuhan tenaga kerja, estimasi biaya,
                hingga mekanisme kerja sama sesuai regulasi dan kebutuhan lokasi Anda.
              </p>
              <p>
                Anda juga dapat menanyakan proses rekrutmen, kelengkapan legalitas, standar pelatihan, serta sistem pengawasan
                dan evaluasi kinerja tenaga kerja kami.
              </p>
              <p>
                Tulis pertanyaan Anda pada formulir di bawah ini — tim kami akan merespons secepatnya dengan solusi terbaik
                untuk kebutuhan perusahaan Anda.
              </p>
            </div>
          </div>

          {/* Kolom kanan: form pertanyaan */}
          <div className="col-span-12 lg:col-span-7">
            <form onSubmit={onSubmit} className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6">
                <label className="block text-xs font-medium text-muted-foreground">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  name="name"
                  className="mt-2 w-full rounded-lg border border-zinc-800 bg-card/30 px-3 py-2 text-sm outline-none transition focus:border-accent"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <label className="block text-xs font-medium text-muted-foreground">Alamat Email</label>
                <input
                  type="email"
                  required
                  name="email"
                  className="mt-2 w-full rounded-lg border border-zinc-800 bg-card/30 px-3 py-2 text-sm outline-none transition focus:border-accent"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <label className="block text-xs font-medium text-muted-foreground">Alamat / Lokasi</label>
                <input
                  type="text"
                  name="location"
                  className="mt-2 w-full rounded-lg border border-zinc-800 bg-card/30 px-3 py-2 text-sm outline-none transition focus:border-accent"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <label className="block text-xs font-medium text-muted-foreground">Pekerjaan</label>
                <input
                  type="text"
                  name="job"
                  className="mt-2 w-full rounded-lg border border-zinc-800 bg-card/30 px-3 py-2 text-sm outline-none transition focus:border-accent"
                />
              </div>
              <div className="col-span-12">
                <label className="block text-xs font-medium text-muted-foreground">Tuliskan Pertanyaan Anda</label>
                <input
                  type="text"
                  required
                  name="question"
                  className="mt-2 w-full rounded-lg border border-zinc-800 bg-card/30 px-3 py-2 text-sm outline-none transition focus:border-accent"
                />
              </div>
              <div className="col-span-12">
                <label className="block text-xs font-medium text-muted-foreground">Pesan</label>
                <textarea
                  rows={4}
                  name="message"
                  className="mt-2 w-full rounded-lg border border-zinc-800 bg-card/30 px-3 py-2 text-sm outline-none transition focus:border-accent"
                />
              </div>
              <div className="col-span-12 flex items-center justify-between gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-gradient-to-b from-accent/20 to-accent/10 px-4 py-2 text-sm text-accent transition hover:border-accent/60 hover:from-accent/30 hover:to-accent/20"
                >
                  Kirim Pertanyaan
                  <span aria-hidden>→</span>
                </button>
                {submitted && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-accent"
                  >
                    Pertanyaan Anda telah terkirim.
                  </motion.span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
