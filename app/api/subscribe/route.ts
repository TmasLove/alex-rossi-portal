import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Created per request, not at module load: `next build` imports this file
// while collecting page data, and a top-level createClient() with a missing
// key crashed every Vercel build ("supabaseKey is required").
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    console.error("[subscribe] NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set");
    return NextResponse.json({ error: "Servicio no disponible." }, { status: 503 });
  }

  let body: { email?: unknown; page_path?: unknown; website?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }
  const { email, website } = body;
  const page_path = typeof body.page_path === "string" ? body.page_path.slice(0, 300) : "";

  // Honeypot: a hidden field only bots fill in. Pretend it worked, store nothing.
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (
    typeof email !== "string" ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
  ) {
    return NextResponse.json({ error: "Correo inválido." }, { status: 400 });
  }

  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : req.headers.get("x-real-ip") ?? "";
  const userAgent = req.headers.get("user-agent") ?? "";
  const referrer = req.headers.get("referer") ?? "";
  const normalizedEmail = email.trim().toLowerCase();
  const now = new Date().toISOString();

  const { data: existing } = await supabaseAdmin
    .from("subscribers")
    .select("id, visit_count")
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (existing) {
    const { error } = await supabaseAdmin
      .from("subscribers")
      .update({
        last_seen_at: now,
        ip_address: ip,
        user_agent: userAgent,
        referrer,
        page_path: page_path ?? "",
        visit_count: (existing.visit_count ?? 1) + 1,
      })
      .eq("id", existing.id);

    if (error) {
      return NextResponse.json({ error: "No se pudo suscribir." }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  }

  const { error } = await supabaseAdmin.from("subscribers").insert({
    email: normalizedEmail,
    created_at: now,
    last_seen_at: now,
    visit_count: 1,
    ip_address: ip,
    user_agent: userAgent,
    referrer,
    page_path: page_path ?? "",
  });

  if (error) {
    return NextResponse.json({ error: "No se pudo suscribir." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
