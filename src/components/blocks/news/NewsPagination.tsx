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
        className={`px-3 py-1.5 rounded-md border text-sm ${prevDisabled ? "pointer-events-none opacity-50" : "hover:border-[#D4AF37] hover:text-[#D4AF37]"}`}
      >
        Prev
      </Link>
      {pages.map((p) => (
        <Link
          key={p}
          prefetch
          href={makeHref(p)}
          className={`px-3 py-1.5 rounded-md border text-sm ${p === current ? "bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]" : "hover:border-[#D4AF37] hover:text-[#D4AF37]"}`}
        >
          {p}
        </Link>
      ))}
      <Link
        prefetch
        href={nextDisabled ? "#" : makeHref(current + 1)}
        className={`px-3 py-1.5 rounded-md border text-sm ${nextDisabled ? "pointer-events-none opacity-50" : "hover:border-[#D4AF37] hover:text-[#D4AF37]"}`}
      >
        Next
      </Link>
    </nav>
  );
}