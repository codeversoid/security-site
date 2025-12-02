import type { MetadataRoute } from "next";
import { headers } from "next/headers";

type Post = { id?: string; date?: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
  const proto = h.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const origin = `${proto}://${host}`;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${origin}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${origin}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${origin}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${origin}/training`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${origin}/gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${origin}/news`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${origin}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${origin}/api/news`, { cache: "no-store" });
    const json = await res.json();
    const posts: Post[] = Array.isArray(json?.data?.posts) ? json.data.posts : [];
    dynamicRoutes = posts
      .filter((p) => p?.id)
      .map((p) => ({
        url: `${origin}/news/${p.id}`,
        lastModified: p?.date ? new Date(p.date) : new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      }));
  } catch {}

  return [...staticRoutes, ...dynamicRoutes];
}

