import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "@/lib/supabase";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          res.cookies.set(name, value, options);
        },
        remove(name: string, options: any) {
          res.cookies.set(name, "", { ...options, maxAge: 0 });
        },
      },
    });
    const { data: { session } } = await supabase.auth.getSession();

    const pathname = req.nextUrl.pathname;
    if (pathname.startsWith("/admin") && !session) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return res;
  } catch (e) {
    // Jika env tidak terpasang, jangan blokir akses agar tidak mematahkan dev
    return res;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};