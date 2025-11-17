"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

type Program = {
  key: "pratama" | "madya" | "utama";
  name: string;
  summary: string;
  requirements: string[];
  durationJP: number;
  schedule: string[];
  fee: string;
};

const programs: Program[] = [
  {
    key: "pratama",
    name: "Gada Pratama",
    summary:
      "Pelatihan dasar satpam untuk kompetensi layanan pengamanan level entry.",
    requirements: [
      "Fotokopi KTP",
      "Surat keterangan sehat",
      "Pas foto 3x4 (4 lembar)",
    ],
    durationJP: 232,
    schedule: ["12–20 Des", "10–18 Jan", "17–25 Feb"],
    fee: "Rp 2.750.000 (placeholder)",
  },
  {
    key: "madya",
    name: "Gada Madya",
    summary:
      "Pelatihan lanjutan untuk komandan regu/penyelia dengan fokus manajemen operasi.",
    requirements: [
      "Ijazah Gada Pratama",
      "Surat pengalaman kerja",
      "Surat keterangan sehat",
    ],
    durationJP: 160,
    schedule: ["5–12 Jan", "2–9 Feb", "9–16 Mar"],
    fee: "Rp 3.900.000 (placeholder)",
  },
  {
    key: "utama",
    name: "Gada Utama",
    summary:
      "Pelatihan pimpinan keamanan untuk perencanaan, audit, dan koordinasi lintas unit.",
    requirements: [
      "Ijazah Gada Madya",
      "Pengalaman sebagai penyelia",
      "Surat keterangan sehat",
    ],
    durationJP: 120,
    schedule: ["20–26 Jan", "17–23 Feb", "24–30 Mar"],
    fee: "Rp 5.500.000 (placeholder)",
  },
];

export default function TrainingTabs() {
  return (
    <section id="training-tabs" className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-16 lg:py-24">
      <h2 className="text-xl font-semibold">Program Diklat</h2>
      <Tabs defaultValue="pratama" className="mt-4">
        <TabsList>
          {programs.map((p) => (
            <TabsTrigger key={p.key} value={p.key} id={p.key}>
              {p.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {programs.map((p) => (
          <TabsContent key={p.key} value={p.key} className="mt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <h3 className="font-semibold">Ringkasan</h3>
                <p className="text-sm text-muted-foreground">{p.summary}</p>
                <h3 className="font-semibold">Durasi</h3>
                <p className="text-sm text-muted-foreground">{p.durationJP} JP</p>
                <h3 className="font-semibold">Jadwal Contoh</h3>
                <ul className="text-sm text-muted-foreground list-disc pl-5">
                  {p.schedule.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold">Persyaratan Dokumen</h3>
                <ul className="text-sm text-muted-foreground list-disc pl-5">
                  {p.requirements.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
                <h3 className="font-semibold">Biaya</h3>
                <p className="text-sm text-muted-foreground">{p.fee}</p>
                <div className="flex gap-3 pt-2">
                  <a
                    className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-white text-sm"
                    href={`https://wa.me/6281234567890?text=Halo%2C%20saya%20ingin%20daftar%20${encodeURIComponent(
                      p.name
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Daftar via WhatsApp
                  </a>
                  <Link
                    className="inline-flex items-center rounded-full border px-4 py-2 text-sm"
                    href="/download/compro"
                  >
                    Unduh Brosur (PDF dummy)
                  </Link>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}