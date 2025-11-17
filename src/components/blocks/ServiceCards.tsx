export default function ServiceCards() {
  const services = [
    { title: "Perkantoran", href: "/contact?service=office" },
    { title: "Pabrik/Proyek", href: "/contact?service=industrial" },
    { title: "Event", href: "/contact?service=event" },
    { title: "Konsultasi", href: "/contact?service=consulting" },
    { title: "Sistem Keamanan", href: "/contact?service=systems" },
  ];
  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-16 lg:py-24">
      <h2 className="text-xl font-semibold">Layanan Unggulan</h2>
      <div className="mt-6 grid grid-cols-12 gap-4 md:gap-6">
        {services.map((s) => (
          <a
            key={s.title}
            href={s.href}
            className="col-span-12 sm:col-span-6 md:col-span-4 rounded-xl border bg-card/40 p-5 hover:border-accent/70 hover:shadow-lg transition"
          >
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground">Klik untuk konsultasi cepat.</p>
          </a>
        ))}
      </div>
    </section>
  );
}