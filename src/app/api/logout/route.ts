import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "@/lib/supabase";

export async function POST() {
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
  await supabase.auth.signOut();
  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json({ status: "ok" });
}