import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main>
      <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-10 lg:py-16">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Kebijakan Privasi</h1>
        <p className="mt-2 text-foreground">Cara kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda.</p>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 pb-12 lg:pb-16">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-12 lg:col-span-8">
            <div className="space-y-6 text-sm md:text-base text-muted-foreground">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground">Ringkasan</h2>
                <p className="mt-2">Kebijakan ini menjelaskan jenis data yang kami kumpulkan, tujuan pengolahan, serta hak-hak Anda sebagai subjek data.</p>
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground">Data yang Dikumpulkan</h2>
                <ul className="mt-2 list-disc pl-5 space-y-2">
                  <li>Identitas dasar seperti nama, email, nomor telepon.</li>
                  <li>Data operasional seperti permintaan layanan, preferensi, dan korespondensi.</li>
                  <li>Data teknis seperti alamat IP, jenis peramban, dan cookie.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground">Penggunaan Data</h2>
                <ul className="mt-2 list-disc pl-5 space-y-2">
                  <li>Menjawab pertanyaan dan menyediakan layanan yang diminta.</li>
                  <li>Meningkatkan pengalaman pengguna dan kualitas layanan.</li>
                  <li>Kepatuhan terhadap peraturan perundang-undangan yang berlaku.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground">Cookie</h2>
                <p className="mt-2">Cookie digunakan untuk menyimpan preferensi dan meningkatkan performa situs. Anda dapat mengatur cookie melalui pengaturan peramban.</p>
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground">Berbagi Data</h2>
                <p className="mt-2">Kami tidak menjual data pribadi. Data dapat dibagikan kepada pihak ketiga tepercaya hanya untuk mendukung operasional layanan dan sesuai hukum.</p>
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground">Keamanan</h2>
                <p className="mt-2">Kami menerapkan langkah teknis dan organisasi yang wajar untuk melindungi data dari akses tidak sah, kehilangan, atau kebocoran.</p>
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground">Hak Anda</h2>
                <ul className="mt-2 list-disc pl-5 space-y-2">
                  <li>Hak akses dan mendapatkan salinan data pribadi.</li>
                  <li>Hak perbaikan atau penghapusan data yang tidak akurat.</li>
                  <li>Hak menarik persetujuan dan mengajukan keberatan atas pengolahan tertentu.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground">Retensi</h2>
                <p className="mt-2">Data disimpan selama diperlukan untuk tujuan pengolahan atau sesuai ketentuan hukum yang berlaku.</p>
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground">Perubahan</h2>
                <p className="mt-2">Kebijakan ini dapat diperbarui sewaktu-waktu. Versi terbaru akan dipublikasikan di halaman ini.</p>
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground">Kontak</h2>
                <p className="mt-2">Ajukan pertanyaan atau permintaan terkait privasi melalui halaman kontak.</p>
                <Link href="/contact" prefetch className="inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-gradient-to-b from-accent/20 to-accent/10 px-4 py-2 text-accent transition hover:border-accent/60 hover:from-accent/30 hover:to-accent/20">Hubungi Kami<span aria-hidden>→</span></Link>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <div className="rounded-2xl border bg-card/40 p-5">
              <h3 className="text-sm font-semibold text-foreground">Ringkasan</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Kami mengumpulkan data seperlunya untuk layanan.</li>
                <li>Data tidak dijual dan hanya dibagi secara terbatas.</li>
                <li>Anda memiliki hak atas akses, perbaikan, dan penghapusan data.</li>
                <li>Perubahan kebijakan akan diumumkan di halaman ini.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
