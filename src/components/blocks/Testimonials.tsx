export default function Testimonials() {
  const items = [
    {
      quote:
        "Tim responsif dan disiplin, event kami berjalan aman tanpa kendala.",
      author: "Panitia Event Nasional",
    },
    {
      quote: "Laporan digital harian sangat membantu pengawasan kantor kami.",
      author: "Manajer Operasional",
    },
  ];
  return (
    <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-16 lg:py-24">
      <h2 className="text-xl font-semibold">Testimoni</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((t) => (
          <figure key={t.author} className="rounded-xl border bg-card/40 p-5">
            <blockquote className="text-sm">“{t.quote}”</blockquote>
            <figcaption className="mt-2 text-xs text-muted-foreground">— {t.author}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}