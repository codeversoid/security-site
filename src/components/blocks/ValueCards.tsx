import Image from "next/image";

export default function ValueCards() {
  const values = [
    {
      title: "Profesional",
      desc: "Personel bersertifikat dan pembinaan berkelanjutan.",
      icon: "/icons/badge.svg",
    },
    {
      title: "Legal",
      desc: "Perizinan lengkap dan kepatuhan regulasi industri.",
      icon: "/icons/shield.svg",
    },
    {
      title: "Berpengalaman",
      desc: "Jam terbang tinggi di berbagai sektor dan skala.",
      icon: "/icons/handshake.svg",
    },
    {
      title: "Terintegrasi Teknologi",
      desc: "Sistem monitoring, patroli digital, dan laporan real-time.",
      icon: "/icons/cctv.svg",
    },
  ];
  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-16 lg:py-24">
      <div className="mb-6 md:mb-8">
        <p className="text-sm font-medium tracking-wide text-accent">Keunggulan Layanan</p>
        <h2 className="mt-1 text-xl md:text-2xl font-semibold tracking-tight">Mengapa Memilih Kami</h2>
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {values.map((v) => (
          <div key={v.title} className="col-span-12 sm:col-span-6 md:col-span-3">
            <div className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-card/40 p-5 transition hover:border-accent/70 hover:shadow-lg">
              {/* ring aksen saat hover */}
              <div className="absolute inset-0 rounded-xl ring-1 ring-transparent group-hover:ring-accent/70 transition" />
              {/* ikon */}
              <div className="inline-flex items-center justify-center rounded-lg border border-zinc-700 bg-background/40 p-2">
                <Image src={v.icon} alt={v.title} width={24} height={24} style={{ filter: "invert(32%) sepia(78%) saturate(548%) hue-rotate(185deg) brightness(95%) contrast(92%)" }} />
              </div>
              <h3 className="mt-3 font-semibold">{v.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
