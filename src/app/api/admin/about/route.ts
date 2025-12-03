import { NextResponse } from "next/server";
import { cookies } from "next/headers";
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
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {}
      },
    },
  });

  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) {
    return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from("about_settings")
      .select("directorName,directorTitle,directorPhotoUrl,directorMessage,aboutLogoUrl,team,partners")
      .eq("id", 1)
      .maybeSingle();
    if (error) {
      return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
    }
    return NextResponse.json({ status: "ok", data: data || {} });
  } catch {
    return NextResponse.json({ status: "error", message: "Server error" }, { status: 500 });
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

    try {
      const { error } = await supabase.from("about_settings").upsert({ id: 1, ...payload });
      if (error) {
        return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
      }
    } catch {
      return NextResponse.json({ status: "error", message: "Server error" }, { status: 500 });
    }

    return NextResponse.json({ status: "ok", data: payload });
  } catch (e) {
    return NextResponse.json({ status: "error", message: "Server error" }, { status: 500 });
  }
}
