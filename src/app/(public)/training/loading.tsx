export default function LoadingTraining() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-10 lg:py-16">
      <div className="animate-pulse">
        <div className="h-6 w-48 bg-muted rounded" />
        <div className="mt-2 h-3 w-3/5 bg-muted rounded" />
      </div>
      <div className="mt-6 flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-9 w-28 rounded-md border bg-muted" />
        ))}
      </div>
      <div className="mt-8 grid grid-cols-12 gap-4 md:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="col-span-12 md:col-span-6 lg:col-span-4">
            <div className="animate-pulse rounded-xl border bg-card/40 p-6">
              <div className="h-4 w-3/5 bg-muted rounded" />
              <div className="mt-2 h-3 w-4/5 bg-muted rounded" />
              <div className="mt-4 h-3 w-2/5 bg-muted rounded" />
              <div className="mt-5 h-8 w-32 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}