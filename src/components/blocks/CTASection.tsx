"use client";

export default function CTASection() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-16 lg:py-24">
      <div className="mb-6">
        <p className="text-sm font-medium tracking-wide text-amber-300">Model Layanan</p>
        <h2 className="mt-1 text-xl md:text-2xl font-semibold tracking-tight">Bentuk Kerjasama</h2>
        <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">Pilih skema yang paling sesuai dengan kebutuhan operasional Anda.</p>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 md:col-span-4">
          <div className="group h-full rounded-xl border bg-card/40 p-6 transition hover:shadow-lg hover:-translate-y-[1px]">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-amber-300" />
              <span className="text-xs font-semibold tracking-wide text-amber-300">Full Outsource</span>
            </div>
            <h3 className="mt-2 text-lg font-semibold tracking-tight">Bentuk Kerjasama Full Outsource</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Seluruh kebutuhan (personil, alat kerja, seragam, pembinaan, pengawasan) disediakan oleh kami. Klien melakukan kontrol & audit.
            </p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4">
          <div className="group h-full rounded-xl border bg-card/40 p-6 transition hover:shadow-lg hover:-translate-y-[1px]">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-sky-300" />
              <span className="text-xs font-semibold tracking-wide text-sky-300">Outsource Manajemen</span>
            </div>
            <h3 className="mt-2 text-lg font-semibold tracking-tight">Outsource Manajemen</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Sistem kerja, pembinaan, dan pengawasan oleh kami; personil & alat disediakan oleh klien.
            </p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4">
          <div className="group h-full rounded-xl border bg-card/40 p-6 transition hover:shadow-lg hover:-translate-y-[1px]">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300" />
              <span className="text-xs font-semibold tracking-wide text-emerald-300">Outsource Personil</span>
            </div>
            <h3 className="mt-2 text-lg font-semibold tracking-tight">Outsource Personil</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Kami sediakan personil sesuai kualifikasi, sementara fasilitas & pengawasan disediakan oleh klien.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}