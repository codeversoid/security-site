import Script from "next/script";
import TrainingTabs from "@/components/blocks/TrainingTabs";

export default function TrainingPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Apa perbedaan Pratama, Madya, dan Utama?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pratama adalah dasar, Madya untuk penyelia/komandan regu, dan Utama untuk pimpinan keamanan/manajerial.",
        },
      },
      {
        "@type": "Question",
        name: "Apakah jadwal dapat disesuaikan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Jadwal contoh bersifat fleksibel sesuai jumlah peserta dan ketersediaan instruktur.",
        },
      },
    ],
  };

  return (
    <main className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-16 lg:py-24">
      <h1 className="text-2xl font-bold">Diklat Satpam (Gada)</h1>
      <p className="mt-2 text-muted-foreground">
        Pilih program: Pratama, Madya, atau Utama. Lihat persyaratan, durasi JP, jadwal contoh, dan biaya.
      </p>
      <TrainingTabs />
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqJsonLd)}
      </Script>
    </main>
  );
}