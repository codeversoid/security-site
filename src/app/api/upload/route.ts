import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "@/lib/supabase";

export async function POST(request: Request) {
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

  // Only allow authenticated users to upload
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const bucket = (form.get("bucket") as string) || "assets";
  const folder = (form.get("folder") as string) || "images";

  if (!(file instanceof File)) {
    return NextResponse.json({ status: "error", message: "File tidak ditemukan" }, { status: 400 });
  }

  const timestamp = Date.now();
  const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${folder}/${user.id}-${timestamp}-${cleanName}`;

  const ext = cleanName.split(".").pop()?.toLowerCase();
  let contentType = (file.type || "").toLowerCase();
  if (!contentType || contentType === "application/octet-stream") {
    contentType =
      ext === "jpg" || ext === "jpeg"
        ? "image/jpeg"
        : ext === "png"
        ? "image/png"
        : ext === "webp"
        ? "image/webp"
        : ext === "svg"
        ? "image/svg+xml"
        : ext === "gif"
        ? "image/gif"
        : "image/jpeg";
  }

  const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: true,
    contentType,
    cacheControl: "public, max-age=31536000, immutable",
  });

  if (uploadError) {
    return NextResponse.json({ status: "error", message: uploadError.message }, { status: 400 });
  }

  const { data: pub } = supabase.storage.from(bucket).getPublicUrl(path);
  return NextResponse.json({ status: "ok", url: pub.publicUrl, path });
}
