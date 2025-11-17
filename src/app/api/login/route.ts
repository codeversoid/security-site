import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "@/lib/supabase";

export async function GET() {
  return NextResponse.json({ status: "ok", message: "Login API" });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body || {};
    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email dan password harus diisi" }, { status: 400 });
    }
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
            // no-op in Server Components; middleware refreshes tokens
          }
        },
      },
    });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      const code = error.message.includes("Invalid login") ? 401 : 500;
      return NextResponse.json({ success: false, message: error.message }, { status: code });
    }
    // cookies diset oleh auth-helpers otomatis
    return NextResponse.json({
      success: true,
      message: "Login berhasil",
      user: data.user,
      session: data.session,
    });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 });
  }
}