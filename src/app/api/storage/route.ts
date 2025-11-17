import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "@/lib/supabase";

// DELETE handler supports two modes:
// 1) Delete a specific file: { bucket, path }
// 2) Cleanup a folder keeping one file: { bucket, folder, keepPath }
export async function DELETE(request: Request) {
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

  // Only allow authenticated users
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
  }

  let body: any = null;
  try {
    body = await request.json();
  } catch {}

  const bucket = String(body?.bucket || "");
  if (!bucket) {
    return NextResponse.json({ status: "error", message: "bucket wajib diisi" }, { status: 400 });
  }

  // Delete specific path
  if (body?.path && typeof body.path === "string") {
    const { error } = await supabase.storage.from(bucket).remove([body.path]);
    if (error) {
      return NextResponse.json({ status: "error", message: error.message }, { status: 400 });
    }
    return NextResponse.json({ status: "ok", removed: [body.path] });
  }

  // Cleanup a folder keeping one file
  const folder = body?.folder;
  const keepPath = body?.keepPath;
  if (typeof folder === "string" && typeof keepPath === "string") {
    const { data: list, error: listErr } = await supabase.storage.from(bucket).list(folder, {
      limit: 1000,
      sortBy: { column: "name", order: "asc" },
    });
    if (listErr) {
      return NextResponse.json({ status: "error", message: listErr.message }, { status: 400 });
    }
    const toRemove = (list || [])
      .map((it) => `${folder}/${it.name}`)
      .filter((p) => p !== keepPath);

    if (toRemove.length === 0) {
      return NextResponse.json({ status: "ok", removed: [] });
    }
    const { error: remErr } = await supabase.storage.from(bucket).remove(toRemove);
    if (remErr) {
      return NextResponse.json({ status: "error", message: remErr.message }, { status: 400 });
    }
    return NextResponse.json({ status: "ok", removed: toRemove });
  }

  return NextResponse.json({ status: "error", message: "Payload tidak valid" }, { status: 400 });
}