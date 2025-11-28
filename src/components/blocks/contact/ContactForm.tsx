"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const schema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  phone: z
    .string()
    .min(8, "No. Telp minimal 8 digit")
    .max(20, "No. Telp terlalu panjang")
    .regex(/^[+0-9\-\s()]+$/, "Masukkan angka/plus saja"),
  subject: z.string().min(3, "Subjek minimal 3 karakter"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      // Simulasi submit; integrasikan ke API saat siap
      setStatus("idle");
      await new Promise((r) => setTimeout(r, 900));
      setStatus("success");
      reset();
    } catch (e) {
      setStatus("error");
    }
  };

  return (
    <section aria-label="Formulir Kontak" className="relative">
      <motion.form
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{}}
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border bg-card/40 p-6 md:p-8 shadow-lg"
      >
        <motion.h3 variants={fadeUp} className="text-xl md:text-2xl font-semibold text-foreground">
          Kirimkan Ulasan Anda
        </motion.h3>
        <motion.p variants={fadeUp} className="mt-2 text-sm md:text-base text-foreground">
          Silakan menyampaikan kesan dan pesan Anda di kolom di bawah ini.
        </motion.p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div variants={fadeUp}>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Nama</label>
            <input
              {...register("name")}
              placeholder="Nama lengkap"
              className="mt-2 w-full rounded-xl border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-400">{errors.name.message}</p>
            )}
          </motion.div>

          <motion.div variants={fadeUp}>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="alamat@email.com"
              className="mt-2 w-full rounded-xl border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-400">{errors.email.message}</p>
            )}
          </motion.div>

          <motion.div variants={fadeUp}>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">No. Telp</label>
            <input
              {...register("phone")}
              placeholder="Contoh: +62 812xxxx"
              className="mt-2 w-full rounded-xl border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-rose-400">{errors.phone.message}</p>
            )}
          </motion.div>

          <motion.div variants={fadeUp}>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Subjek</label>
            <input
              {...register("subject")}
              placeholder="Judul pesan"
              className="mt-2 w-full rounded-xl border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
            {errors.subject && (
              <p className="mt-1 text-xs text-rose-400">{errors.subject.message}</p>
            )}
          </motion.div>

          <motion.div variants={fadeUp} className="md:col-span-2">
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Pesan</label>
            <textarea
              {...register("message")}
              rows={5}
              placeholder="Tuliskan kebutuhan atau pertanyaan Anda..."
              className="mt-2 w-full rounded-xl border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
            {errors.message && (
              <p className="mt-1 text-xs text-rose-400">{errors.message.message}</p>
            )}
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-gradient-to-b from-accent/20 to-accent/10 px-4 py-3 text-accent transition-all hover:border-accent/60 hover:from-accent/30 hover:to-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-60"
          >
            {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
          </button>
          {status === "success" && (
            <span className="text-sm text-emerald-400">Berhasil terkirim. Kami akan menghubungi Anda.</span>
          )}
          {status === "error" && (
            <span className="text-sm text-rose-400">Gagal mengirim. Coba lagi nanti.</span>
          )}
        </motion.div>
      </motion.form>
    </section>
  );
}
