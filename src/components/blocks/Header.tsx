"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Tentang" },
  { href: "/services", label: "Layanan" },
  { href: "/training", label: "Diklat" },
  { href: "/gallery", label: "Galeri" },
  { href: "/news", label: "Berita" },
  { href: "/contact", label: "Kontak" },
];

interface SiteConfig {
  siteName?: string;
  logoUrl?: string;
  whatsapp?: string;
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [site, setSite] = useState<SiteConfig | null>(null);
  const [logoError, setLogoError] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/site", { cache: "no-store" });
        const json = await res.json();
        setSite(json?.data ?? null);
      } catch {
        // ignore, fallback to static branding
      }
    })();
  }, []);

  useEffect(() => {
    void pathname;
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    try {
      document.body.style.overflow = mobileOpen ? "hidden" : "";
    } catch {}
    return () => {
      try {
        document.body.style.overflow = "";
      } catch {}
    };
  }, [mobileOpen]);

  const waHref = site?.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Halo Admin, saya ingin bertanya layanan.")}`
    : "https://wa.me/6281234567890?text=Halo%20Admin%2C%20saya%20ingin%20bertanya%20layanan.";

  return (
    <header
      className={
        `sticky top-0 z-50 transition-colors ${
          mobileOpen
            ? "bg-background border-b border-border shadow-sm"
            : scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`
      }
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:px-8 xl:px-12">
        <Link
          href="/"
          prefetch
          className={`inline-flex items-center gap-2 font-semibold tracking-tight ${scrolled ? "text-foreground" : "text-black"}`}
        >
          {site?.logoUrl ? (
            <Image
              src={(
                logoError
                  ? "/icons/shield.svg"
                  : (String(site.logoUrl).trim().replace(/&amp;/g, "&").replace(/[`'"\\]/g, "") || "/icons/shield.svg").replace(/^\/logo\.svg$/, "/icons/shield.svg")
              )}
              alt={site.siteName ?? "Logo"}
              width={28}
              height={28}
              className="rounded-sm"
              unoptimized
              referrerPolicy="no-referrer"
              onError={() => setLogoError(true)}
              priority
            />
          ) : (
            <span className="inline-block h-6 w-6 rounded-sm bg-accent" />
          )}
          <span>{site?.siteName ?? (<><span className="text-accent">Garda</span>Security</>)}</span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch
              className={`text-sm ${scrolled ? "text-foreground/90" : "text-black"} hover:text-accent hover:underline underline-offset-4 decoration-accent`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="rounded-full active:bg-accent active:text-accent-foreground">
            <Link href={waHref} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </Link>
          </Button>
          <button
            type="button"
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            type="button"
            aria-label="Tutup"
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-xs border-l bg-background shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="font-semibold tracking-tight">Menu</span>
              <button type="button" aria-label="Tutup" className="inline-flex h-8 w-8 items-center justify-center rounded-md border" onClick={() => setMobileOpen(false)}>
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="px-2 py-2">
              {nav.map((item) => (
                <Link
                  key={`m-${item.href}`}
                  href={item.href}
                  prefetch
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
