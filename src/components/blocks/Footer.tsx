"use client";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { useEffect, useState } from "react";

interface SiteConfig {
  siteName?: string;
  address?: string;
  email?: string;
  phone?: string;
}

export default function Footer() {
  const [site, setSite] = useState<SiteConfig | null>(null);
  const [latest, setLatest] = useState<{ slug: string; title: string }[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/site", { cache: "no-store" });
        const json = await res.json();
        setSite(json?.data ?? null);
      } catch {
        // ignore
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/news?limit=4", { cache: "force-cache" });
        const json = await res.json();
        const posts = Array.isArray(json?.data?.posts) ? json.data.posts : [];
        const top4 = posts.slice(0, 4).map((p: any) => ({
          slug: String(p.slug || ""),
          title: String(p.title || ""),
        }));
        setLatest(top4);
      } catch {
        // ignore; if fails, keep latest empty
      }
    })();
  }, []);

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <h3 className="text-sm font-semibold">Perusahaan</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {site?.siteName ? `${site.siteName} — layanan pengamanan, konsultasi, dan diklat satpam.` : "Perusahaan Keamanan Profesional — layanan pengamanan, konsultasi, dan diklat satpam."}
          </p>
          <p className="mt-3 text-sm">
            {site?.address ?? "Jl. Contoh No. 123, Jakarta Pusat 10110"}
            <br />
            Telp/WA: {site?.phone ?? "0812-3456-7890"}
            <br />
            Email: {site?.email ?? "info@contoh-security.id"}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Berita Terbaru</h3>
          <ul className="mt-2 space-y-2 text-sm">
            {latest.length > 0 ? (
              latest.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/news/${p.slug}`}
                    prefetch
                    className="hover:text-[#D4AF37] transition-colors line-clamp-2"
                  >
                    {p.title}
                  </Link>
                </li>
              ))
            ) : (
              Array.from({ length: 4 }).map((_, i) => (
                <li key={i}>
                  <div className="h-3 w-4/5 bg-zinc-800 rounded animate-pulse" />
                </li>
              ))
            )}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Kebijakan</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li><Link href="/privacy" prefetch className="hover:text-primary">Privasi</Link></li>
            <li><Link href="/terms" prefetch className="hover:text-primary">Syarat & Ketentuan</Link></li>
          </ul>
          <h3 className="mt-6 text-sm font-semibold">Media Sosial</h3>
          <ul className="mt-2 flex items-center gap-3 wpsw-social-links">
            <li>
              <a
                href="https://www.facebook.com/graha.y.muda"
                target="_self"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                <Facebook className="size-4" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/pt.lemosjayaperkasa4/"
                target="_self"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                <Instagram className="size-4" />
              </a>
            </li>
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">© {new Date().getFullYear()} {site?.siteName ?? "GardaSecurity"}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}