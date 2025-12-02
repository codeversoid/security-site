import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function robots(): Promise<MetadataRoute.Robots> {
  let host = "security-site-orcin.vercel.app";
  let proto = "https";
  try {
    const h = await headers();
    host = h.get("x-forwarded-host") || h.get("host") || host;
    proto = h.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  } catch {}
  const site = `${proto}://${host}`;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/*", "/login", "/admin"],
    },
    sitemap: `${site}/sitemap.xml`,
    host: site,
  };
}

