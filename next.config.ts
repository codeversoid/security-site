import type { NextConfig } from "next";

// Derive Supabase host from env to allow remote images from Storage
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
let supabaseHost: string | undefined;
try {
  if (SUPABASE_URL) {
    supabaseHost = new URL(SUPABASE_URL).host;
  }
} catch {}
// Fallback to known project host to avoid 400 on image optimizer when env is missing
const fallbackSupabaseHost = "qncuvkaxslksfxnqwsjf.supabase.co";
const remoteHost = supabaseHost || fallbackSupabaseHost;

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: remoteHost,
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
