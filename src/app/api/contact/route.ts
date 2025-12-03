import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "@/lib/supabase";

function s(v: unknown) {
  return String(v ?? "").trim();
}

function isEmail(v: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = s(body.name);
    const email = s(body.email);
    const phone = s(body.phone);
    const subject = s(body.subject);
    const message = s(body.message);
    if (!name || !isEmail(email) || !subject || !message) {
      return NextResponse.json({ status: "error", message: "Data tidak valid" }, { status: 400 });
    }

    let recipient = "pt.lemosjayaperkasa@gmail.com";
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
      const { data } = await supabase.from("site_settings").select("email").eq("id", 1).maybeSingle();
      const configured = s((data as { email?: string } | null)?.email);
      if (configured) recipient = configured;
    } catch {}

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ status: "error", message: "Email belum dikonfigurasi" }, { status: 500 });
    }

    const html = `
      <div style="font-family: Arial, sans-serif; color: #111;">
        <h2 style="margin:0 0 12px;">Form Kontak</h2>
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Telp:</strong> ${phone}</p>` : ""}
        <p><strong>Subjek:</strong> ${subject}</p>
        <div style="margin-top:12px; white-space:pre-wrap;">${message}</div>
      </div>
    `;

    const payload = {
      from: "onboarding@resend.dev",
      to: [recipient],
      subject: `[Kontak] ${subject}`,
      reply_to: email,
      html,
    };

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });
    const json = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      const j = json as { message?: string };
      const msg = s(j?.message) || "Gagal mengirim";
      return NextResponse.json({ status: "error", message: msg }, { status: 500 });
    }
    return NextResponse.json({ status: "ok", message: "Terkirim" });
  } catch {
    return NextResponse.json({ status: "error", message: "Server error" }, { status: 500 });
  }
}
