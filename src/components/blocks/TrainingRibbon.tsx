"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type LegalKey = "perizinan" | "sertifikasi" | "jaminan";

type LegalItem = { label: string; value?: string };

const legalCategories: {
  key: LegalKey;
  name: string;
  items: LegalItem[];
}[] = [
  {
    key: "perizinan",
    name: "Perizinan",
    items: [
      { label: "NIB", value: "8120311082194" },
      { label: "NPWP", value: "86.091.863.0-406.000" },
      { label: "SPPKP", value: "S-18490KT/WPJ.09/KP.0603/2018" },
      { label: "SIUP", value: "503/638/PM/B/DPMPTSP/2018" },
      { label: "TDP", value: "10.06.1.47.01978" },
      { label: "Akta Pendirian & Perubahan" },
      { label: "Terdaftar Kemenkumham" },
    ],
  },
  {
    key: "sertifikasi",
    name: "Sertifikasi",
    items: [
      { label: "SIO POLRI", value: "1386/I/SIO-POLRI/2024" },
      { label: "Keanggotaan ABUJAPI", value: "02460/28-12-2018" },
      { label: "Keanggotaan APKLINDO", value: "00567/BDG/III/2024" },
      {
        label: "Sertifikat MSCB IGC — ISO 45001:2018",
        value: "Occupational Health and Safety Management Systems",
      },
      {
        label: "Sertifikat MSCB IGC — ISO 9001:2015",
        value: "Quality Management System",
      },
    ],
  },
  {
    key: "jaminan",
    name: "Jaminan Karyawan",
    items: [{ label: "BPJS Kesehatan" }, { label: "BPJS Ketenagakerjaan" }],
  },
];

export default function TrainingRibbon() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-16 lg:py-24">
      <div className="rounded-2xl border border-zinc-800 bg-card/40 p-6 md:p-8">
        <div className="mb-4">
          <p className="text-sm font-medium tracking-wide text-accent">Legalitas & Sertifikasi</p>
          <h2 className="mt-1 text-xl md:text-2xl font-semibold tracking-tight">Perizinan, Sertifikasi, dan Jaminan</h2>
        </div>
        <Tabs defaultValue="perizinan">
          <div className="flex flex-wrap items-center gap-3">
            <TabsList className="flex flex-wrap gap-2 bg-transparent p-0 h-auto">
              {legalCategories.map((c) => (
                <TabsTrigger
                  key={c.key}
                  value={c.key}
                  className="rounded-full border px-3 py-1 text-sm hover:border-accent/70 flex-none h-auto whitespace-nowrap transition-colors data-[state=active]:bg-background data-[state=active]:border-accent data-[state=active]:text-accent data-[state=active]:shadow-sm"
                  id={c.key}
                  aria-label={`Tampilkan ${c.name}`}
                >
                  {c.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {legalCategories.map((c) => (
            <TabsContent key={c.key} value={c.key} className="mt-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {c.items.map((item) => (
                  <div
                    key={item.label + (item.value ?? "")}
                    className="rounded-lg border bg-card/50 p-3 sm:p-4 text-sm flex items-start gap-3"
                    aria-label={`${c.name} — ${item.label}${item.value ? ": " + item.value : ""}`}
                  >
                    <span
                      aria-hidden
                      className="inline-grid place-items-center size-5 rounded-full border border-[#28a745]/40 bg-[#28a745]/10 text-[#28a745]"
                    >
                      ✓
                    </span>
                    <div className="min-w-0">
                      <div className="font-medium text-foreground">{item.label}</div>
                      {item.value && (
                        <div className="mt-0.5 text-xs sm:text-sm text-muted-foreground break-words">
                          {item.value}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href="https://wa.me/628120311082194?text=Halo%2C%20mohon%20info%20Legalitas%20%26%20Sertifikasi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-gradient-to-b from-accent/20 to-accent/10 px-4 py-2 text-sm text-accent transition hover:border-accent/60 hover:from-accent/30 hover:to-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/40"
                  aria-label="Verifikasi dokumen via WhatsApp"
                >
                  Verifikasi via WhatsApp
                  <span aria-hidden>→</span>
                </a>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      </section>
  );
}
