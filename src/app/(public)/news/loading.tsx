export default function LoadingNewsList() {
  const Card = () => (
    <div className="animate-pulse rounded-xl border bg-card/40 overflow-hidden">
      <div className="h-48 md:h-56 lg:h-64 w-full bg-muted" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-3/5 bg-muted rounded" />
        <div className="h-3 w-4/5 bg-muted rounded" />
        <div className="h-3 w-2/5 bg-muted rounded" />
      </div>
    </div>
  );
  const SidebarItem = () => (
    <div className="animate-pulse rounded-md border border-transparent px-3 py-2">
      <div className="h-3 w-4/5 bg-muted rounded" />
    </div>
  );
  return (
    <main>
      <div className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-10 lg:py-16">
        <div className="h-6 w-24 bg-muted rounded" />
        <div className="mt-2 h-3 w-48 bg-muted rounded" />
      </div>

      <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 pb-12 lg:pb-16">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-12 lg:col-span-9">
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="col-span-12 sm:col-span-6 md:col-span-4">
                  <Card />
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-8 w-8 rounded-md border bg-muted" />
              ))}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-3">
            <div className="rounded-xl border bg-card/40 p-5 space-y-3">
              <div className="h-4 w-32 bg-muted rounded" />
              {Array.from({ length: 6 }).map((_, i) => (
                <SidebarItem key={i} />
              ))}
            </div>
            <div className="mt-6 rounded-xl border bg-card/40 p-5">
              <div className="h-4 w-40 bg-muted rounded" />
              <div className="mt-2 h-3 w-4/5 bg-muted rounded" />
              <div className="mt-4 h-8 w-32 bg-muted rounded" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
