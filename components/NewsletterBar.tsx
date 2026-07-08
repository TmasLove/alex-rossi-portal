"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Check, AlertCircle } from "lucide-react";

export default function NewsletterBar() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    const { error } = await supabase.from("subscribers").upsert(
      { email: email.trim().toLowerCase(), created_at: new Date().toISOString() },
      { onConflict: "email" }
    );

    if (error) {
      setStatus("error");
      setErrorMsg("Hubo un problema. Intenta de nuevo.");
      return;
    }

    setStatus("success");
    setEmail("");
  }

  return (
    <section
      className="py-10"
      style={{ backgroundColor: "#1A7A8A" }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <p
          className="font-serif-custom max-w-md text-lg italic leading-snug"
          style={{ color: "#F5EFE6" }}
        >
          Sé la primera en saberlo — recibe las novedades de Alexandra
          directamente en tu correo.
        </p>

        <div className="w-full max-w-sm">
          {status === "success" ? (
            <div
              className="flex items-center gap-2 rounded-sm px-5 py-3 text-sm"
              style={{ backgroundColor: "#062028", color: "#F5EFE6" }}
            >
              <Check size={15} style={{ color: "#7A9E8A" }} />
              ¡Grazie! Estás suscrita.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="flex-1 rounded-sm border-0 px-4 py-3 text-sm outline-none"
                style={{ backgroundColor: "#062028", color: "#F5EFE6" }}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-sm px-5 py-3 text-sm font-medium tracking-wide transition-opacity hover:opacity-80 disabled:opacity-50"
                style={{ backgroundColor: "#D4573A", color: "#F5EFE6" }}
              >
                {status === "loading" ? "…" : "Suscribirse"}
              </button>
            </form>
          )}

          {status === "error" && (
            <div
              className="mt-2 flex items-center gap-1 text-xs"
              style={{ color: "#F5EFE6" }}
            >
              <AlertCircle size={12} />
              {errorMsg}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
