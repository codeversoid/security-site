"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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

  const waHref = site?.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Halo Admin, saya ingin bertanya layanan.")}`
    : "https://wa.me/6281234567890?text=Halo%20Admin%2C%20saya%20ingin%20bertanya%20layanan.";

  return (
    <header
      className={
        `sticky top-0 z-50 transition-colors ${
          scrolled ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
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
            <Image src={site.logoUrl} alt={site.siteName ?? "Logo"} width={28} height={28} className="rounded-sm" />
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
        </div>
      </div>
    </header>
  );
}
