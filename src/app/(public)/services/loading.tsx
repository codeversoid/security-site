export default function LoadingServices() {
  return (
    <main>
      <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-10 lg:py-16">
        <div className="animate-pulse">
          <div className="h-6 w-44 bg-muted rounded" />
          <div className="mt-2 h-3 w-4/5 bg-muted rounded" />
        </div>
        <div className="mt-8 grid grid-cols-12 gap-4 md:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="col-span-12 md:col-span-6">
              <div className="animate-pulse rounded-xl border bg-card/40 p-6">
                <div className="h-4 w-2/5 bg-muted rounded" />
                <div className="mt-2 h-3 w-4/5 bg-muted rounded" />
                <div className="mt-4 h-8 w-32 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}