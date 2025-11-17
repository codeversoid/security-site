export default function LoadingContact() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-10 lg:py-16">
      <div className="animate-pulse">
        <div className="h-6 w-32 bg-muted rounded" />
        <div className="mt-2 h-3 w-2/3 bg-muted rounded" />
      </div>
      <div className="mt-6 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-6">
          <div className="space-y-3 animate-pulse rounded-2xl border bg-card/40 p-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-3 w-full bg-muted rounded" />
            ))}
            <div className="h-8 w-36 bg-muted rounded" />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className="animate-pulse rounded-2xl border bg-card/40 p-6">
            <div className="h-48 w-full bg-muted rounded" />
          </div>
        </div>
      </div>
    </main>
  );
}