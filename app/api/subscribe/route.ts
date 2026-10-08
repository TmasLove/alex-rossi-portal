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

  const { email, page_path } = await req.json();

  if (!email || typeof email !== "string" || !email.includes("@")) {
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
