export default function LoadingNewsDetail() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-10 lg:py-16">
      <div className="animate-pulse mb-6">
        <div className="h-3 w-20 bg-muted rounded" />
        <div className="mt-2 h-6 w-2/3 bg-muted rounded" />
        <div className="mt-2 h-3 w-1/3 bg-muted rounded" />
      </div>
      <div className="animate-pulse mb-8 overflow-hidden rounded-xl border">
        <div className="h-64 w-full bg-muted md:h-80 lg:h-96" />
      </div>
      <article className="prose prose-zinc dark:prose-invert max-w-none">
        <div className="animate-pulse space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-3 w-full bg-muted rounded" />
          ))}
        </div>
      </article>
    </main>
  );
}