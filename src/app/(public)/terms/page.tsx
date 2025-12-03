import Link from "next/link";

export default function TermsPage() {
  return (
    <main>
      <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-10 lg:py-16">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Syarat & Ketentuan</h1>
        <p className="mt-2 text-foreground">Ketentuan umum penggunaan situs dan layanan perusahaan.</p>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 pb-12 lg:pb-16">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-12 lg:col-span-8">
            <div className="space-y-6 text-sm md:text-base text-muted-foreground">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground">Pendahuluan</h2>
                <p className="mt-2">Dengan mengakses atau menggunakan situs ini, Anda setuju untuk terikat pada Syarat & Ketentuan berikut. Jika Anda tidak menyetujuinya, mohon hentikan penggunaan situs.</p>
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground">Definisi</h2>
                <ul className="mt-2 list-disc pl-5 space-y-2">
                  <li>&quot;Kami&quot; merujuk pada perusahaan penyedia layanan keamanan dan outsourcing.</li>
                  <li>&quot;Anda&quot; merujuk pada pengguna situs dan/atau calon klien.</li>
                  <li>&quot;Layanan&quot; mencakup konsultasi, pengadaan tenaga kerja, pelatihan, dan layanan terkait.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground">Penggunaan Situs</h2>
                <ul className="mt-2 list-disc pl-5 space-y-2">
                  <li>Gunakan situs secara wajar dan sesuai hukum yang berlaku.</li>
                  <li>Dilarang mengunggah atau menyebarkan konten yang melanggar hak, bersifat menipu, atau berbahaya.</li>
                  <li>Informasi yang disajikan bersifat umum dan dapat berubah sewaktu-waktu.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground">Akun & Keamanan</h2>
                <ul className="mt-2 list-disc pl-5 space-y-2">
                  <li>Tanggung jawab atas kerahasiaan kredensial login berada pada pengguna.</li>
                  <li>Segera beri tahu kami jika ada dugaan akses tidak sah.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground">Konten & Hak Cipta</h2>
                <ul className="mt-2 list-disc pl-5 space-y-2">
                  <li>Seluruh materi situs (teks, gambar, logo) dilindungi hak cipta dan tidak boleh didistribusikan tanpa izin.</li>
                  <li>Tautan ke situs lain hanya sebagai referensi; kami tidak bertanggung jawab atas konten eksternal.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground">Pembatasan Tanggung Jawab</h2>
                <ul className="mt-2 list-disc pl-5 space-y-2">
                  <li>Kami tidak menjamin situs bebas dari kesalahan atau gangguan teknis.</li>
                  <li>Kerugian tidak langsung, insidental, atau konsekuensial akibat penggunaan situs tidak menjadi tanggung jawab kami.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground">Perubahan</h2>
                <p className="mt-2">Syarat & Ketentuan dapat diperbarui sewaktu-waktu tanpa pemberitahuan. Versi terbaru berlaku sejak dipublikasikan di halaman ini.</p>
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground">Kontak</h2>
                <p className="mt-2">Untuk pertanyaan terkait kebijakan ini, hubungi kami melalui halaman kontak.</p>
                <Link href="/contact" prefetch className="inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-gradient-to-b from-accent/20 to-accent/10 px-4 py-2 text-accent transition hover:border-accent/60 hover:from-accent/30 hover:to-accent/20">Hubungi Kami<span aria-hidden>→</span></Link>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <div className="rounded-2xl border bg-card/40 p-5">
              <h3 className="text-sm font-semibold text-foreground">Ringkasan</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Penggunaan situs harus sesuai hukum.</li>
                <li>Kerahasiaan akun menjadi tanggung jawab pengguna.</li>
                <li>Materi situs dilindungi hak cipta.</li>
                <li>Kebijakan dapat berubah sewaktu-waktu.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
