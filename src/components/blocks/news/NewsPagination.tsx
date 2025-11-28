import Link from "next/link";

interface Props {
  current: number;
  totalPages: number;
  basePath?: string;
  pageSize?: number;
  className?: string;
}

export default function NewsPagination({ current, totalPages, basePath = "/news", pageSize, className }: Props) {
  if (!totalPages || totalPages <= 1) return null;
  const makeHref = (p: number) => {
    const qs = pageSize ? `?page=${p}&pageSize=${pageSize}` : `?page=${p}`;
    return `${basePath}${qs}`;
  };
  const prevDisabled = current <= 1;
  const nextDisabled = current >= totalPages;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className={`mt-6 flex items-center justify-center gap-2 ${className ?? ""}`} aria-label="Pagination">
      <Link
        prefetch
        href={prevDisabled ? "#" : makeHref(current - 1)}
        className={`px-3 py-1.5 rounded-md border text-sm ${prevDisabled ? "pointer-events-none opacity-50" : "hover:border-accent hover:text-accent"}`}
      >
        Prev
      </Link>
      {pages.map((p) => (
        <Link
          key={p}
          prefetch
          href={makeHref(p)}
          className={`px-3 py-1.5 rounded-md border text-sm ${p === current ? "bg-accent/10 border-accent text-accent" : "hover:border-accent hover:text-accent"}`}
        >
          {p}
        </Link>
      ))}
      <Link
        prefetch
        href={nextDisabled ? "#" : makeHref(current + 1)}
        className={`px-3 py-1.5 rounded-md border text-sm ${nextDisabled ? "pointer-events-none opacity-50" : "hover:border-accent hover:text-accent"}`}
      >
        Next
      </Link>
    </nav>
  );
}
