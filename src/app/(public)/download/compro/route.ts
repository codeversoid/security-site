import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "@/lib/supabase";

export async function GET() {
  const cookieStore = await cookies();
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // ignore in RSC
        }
      },
    },
  });

  const { data, error } = await supabase
    .from("site_settings")
    .select("comproUrl")
    .eq("id", 1)
    .maybeSingle();
  const href = String(data?.comproUrl || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf");
  if (error) {
    const h = await headers();
    const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
    const proto = h.get("x-forwarded-proto") || "http";
    const origin = `${proto}://${host}`;
    return NextResponse.redirect(new URL("/brochure.pdf", origin));
  }
  // If href is absolute, redirect directly; if relative, resolve against site URL
  try {
    const isAbs = /^https?:\/\//.test(href);
    if (isAbs) {
      return NextResponse.redirect(href);
    }
    const h = await headers();
    const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
    const proto = h.get("x-forwarded-proto") || "http";
    const origin = `${proto}://${host}`;
    return NextResponse.redirect(new URL(href, origin));
  } catch {
    const h = await headers();
    const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
    const proto = h.get("x-forwarded-proto") || "http";
    const origin = `${proto}://${host}`;
    return NextResponse.redirect(new URL("/brochure.pdf", origin));
  }
}