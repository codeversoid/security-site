import Hero from "@/components/blocks/Hero";
import ValueCards from "@/components/blocks/ValueCards";
import ServiceTiles from "@/components/blocks/services/ServiceTiles";
import TrainingRibbon from "@/components/blocks/TrainingRibbon";
import GalleryGrid from "@/components/blocks/gallery/GalleryGrid";
import NewsPreview from "@/components/blocks/home/NewsPreview";
import PartnersMarquee from "@/components/blocks/about/PartnersMarquee";
import CTASection from "@/components/blocks/CTASection";
import AboutPreview from "@/components/blocks/home/AboutPreview";
import StatsOverview from "@/components/blocks/home/StatsOverview";
import HelpForm from "@/components/blocks/home/HelpForm";
import BrochureCTA from "@/components/blocks/home/BrochureCTA";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueCards />
      <AboutPreview />
      <ServiceTiles />
      {/* Blok statistik dengan narasi jaminan layanan */}
      <StatsOverview />
      <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12">
        <div className="p-6 md:p-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-medium tracking-wide text-accent">Mengapa Memilih Kami</p>
            <h2 className="mt-1 text-lg md:text-xl font-semibold tracking-tight">Legalitas Lengkap & Kredibilitas Teruji</h2>
            <p className="mt-2 text-sm text-muted-foreground">Ringkasan pengakuan dan perizinan utama yang membuktikan kualitas layanan kami.</p>
          </div>
          <div className="mt-8 grid grid-cols-12 gap-6 md:gap-8 items-start">
            {/* Daftar kiri */}
            <div className="col-span-12 md:col-span-5">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-3 w-3 rounded-full ring-2 ring-accent" />
                  <div>
                    <h3 className="font-medium">Akta Pendirian & SK Kemenkumham</h3>
                    <p className="text-sm text-muted-foreground">Dokumen legal perusahaan lengkap dan valid.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-3 w-3 rounded-full ring-2 ring-accent" />
                  <div>
                    <h3 className="font-medium">Pengesahan Peraturan Perusahaan</h3>
                    <p className="text-sm text-muted-foreground">Kepatuhan terhadap standar kerja dan keselamatan.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-3 w-3 rounded-full ring-2 ring-accent" />
                  <div>
                    <h3 className="font-medium">Terdaftar di Asosiasi Jasa Keamanan</h3>
                    <p className="text-sm text-muted-foreground">Keanggotaan resmi sebagai penyedia jasa pengamanan.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-3 w-3 rounded-full ring-2 ring-accent" />
                  <div>
                    <h3 className="font-medium">Disnaker</h3>
                    <p className="text-sm text-muted-foreground">Terdaftar dan diawasi instansi ketenagakerjaan.</p>
                  </div>
                </li>
              </ul>
            </div>
            {/* Gambar tengah */}
            <div className="col-span-12 md:col-span-2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl ring-1 ring-transparent md:group-hover:ring-accent/70" />
                <Image src="/team/rudi.svg" alt="Figur Satpam" width={140} height={140} className="h-40 w-auto md:h-56" />
              </div>
            </div>
            {/* Daftar kanan */}
            <div className="col-span-12 md:col-span-5">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-3 w-3 rounded-full ring-2 ring-accent" />
                  <div>
                    <h3 className="font-medium">Izin Operasional Mabes Polri</h3>
                    <p className="text-sm text-muted-foreground">Rekomendasi dan izin resmi untuk operasional pengamanan.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-3 w-3 rounded-full ring-2 ring-accent" />
                  <div>
                    <h3 className="font-medium">Surat Keterangan Domisili</h3>
                    <p className="text-sm text-muted-foreground">Identitas alamat operasional yang terdokumentasi.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-3 w-3 rounded-full ring-2 ring-accent" />
                  <div>
                    <h3 className="font-medium">Tanda Daftar Perusahaan (TDP/NIB)</h3>
                    <p className="text-sm text-muted-foreground">Terdaftar secara resmi sebagai badan usaha.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-3 w-3 rounded-full ring-2 ring-accent" />
                  <div>
                    <h3 className="font-medium">Sertifikasi ISO / ICS</h3>
                    <p className="text-sm text-muted-foreground">Sistem manajemen mutu dan keselamatan kerja terstandarisasi.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <TrainingRibbon />
      {/* Galeri: heading yang lebih jelas */}
      <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-12 lg:py-20">
        <p className="text-sm font-medium tracking-wide text-accent">Lihat Pengalaman Kami</p>
        <h2 className="mt-1 text-xl md:text-2xl font-semibold tracking-tight">Galeri Foto</h2>
      </section>
      <GalleryGrid />
      <NewsPreview />
      <PartnersMarquee />
      {/* Form bantuan di Home */}
      <HelpForm />
      <CTASection />
      {/* CTA unduhan brosur */}
      <BrochureCTA />
    </>
  );
}
