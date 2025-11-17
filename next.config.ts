import type { NextConfig } from "next";

// Derive Supabase host from env to allow remote images from Storage
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
let supabaseHost: string | undefined;
try {
  if (SUPABASE_URL) {
    supabaseHost = new URL(SUPABASE_URL).host;
  }
} catch {}

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: supabaseHost
    ? {
        remotePatterns: [
          {
            protocol: "https",
            hostname: supabaseHost,
            pathname: "/storage/v1/object/public/**",
          },
        ],
      }
    : undefined,
};

export default nextConfig;
