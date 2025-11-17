import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "@/lib/supabase";
import fs from "fs";
import path from "path";

export async function GET() {
  const cookieStore = await cookies();
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {}
      },
    },
  });

  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) {
    return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
  }

  // Reuse logic in public GET by reading file if DB empty
  try {
    const { data, error } = await supabase
      .from("about_settings")
      .select("directorName,directorTitle,directorPhotoUrl,directorMessage,aboutLogoUrl,team,partners")
      .eq("id", 1)
      .maybeSingle();
    if (!error && data) {
      return NextResponse.json({ status: "ok", data });
    }
  } catch {}

  try {
    const p = path.join(process.cwd(), "public", "data", "about.json");
    const txt = fs.readFileSync(p, "utf-8");
    const json = JSON.parse(txt);
    return NextResponse.json({ status: "ok", data: json });
  } catch {
    return NextResponse.json({ status: "ok", data: {} });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {}
        },
      },
    });

    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const payload = {
      directorName: String(body?.directorName ?? ""),
      directorTitle: String(body?.directorTitle ?? ""),
      directorPhotoUrl: String(body?.directorPhotoUrl ?? ""),
      directorMessage: String(body?.directorMessage ?? ""),
      aboutLogoUrl: String(body?.aboutLogoUrl ?? ""),
      team: Array.isArray(body?.team) ? body.team : [],
      partners: Array.isArray(body?.partners) ? body.partners : [],
    };

    // Upsert ke Supabase jika tabel tersedia
    try {
      const { error } = await supabase.from("about_settings").upsert({ id: 1, ...payload });
      if (error) {
        // lanjut tulis file meski DB gagal
      }
    } catch {}

    // Simpan juga ke file JSON sebagai fallback
    try {
      const p = path.join(process.cwd(), "public", "data", "about.json");
      fs.writeFileSync(p, JSON.stringify(payload, null, 2), "utf-8");
    } catch {}

    return NextResponse.json({ status: "ok", data: payload });
  } catch (e) {
    return NextResponse.json({ status: "error", message: "Server error" }, { status: 500 });
  }
}