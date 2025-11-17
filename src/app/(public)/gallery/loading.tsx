export default function LoadingGallery() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-10 lg:py-16">
      <div className="animate-pulse">
        <div className="h-6 w-36 bg-muted rounded" />
        <div className="mt-2 h-3 w-3/5 bg-muted rounded" />
      </div>
      <div className="mt-8 grid grid-cols-12 gap-4 md:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
            <div className="animate-pulse aspect-square rounded-xl border overflow-hidden">
              <div className="h-full w-full bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}