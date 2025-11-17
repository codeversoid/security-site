export default function LoadingAbout() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-12 lg:py-20">
      <div className="animate-pulse rounded-2xl border bg-card/40 p-6 md:p-8">
        <div className="h-6 w-40 bg-muted rounded" />
        <div className="mt-2 h-3 w-4/5 bg-muted rounded" />
        <div className="mt-6 grid grid-cols-12 gap-6 md:gap-8 items-start">
          <div className="col-span-12 md:col-span-7 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-3 w-full bg-muted rounded" />
            ))}
          </div>
          <div className="col-span-12 md:col-span-5">
            <div className="aspect-video rounded-xl border overflow-hidden">
              <div className="h-full w-full bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}