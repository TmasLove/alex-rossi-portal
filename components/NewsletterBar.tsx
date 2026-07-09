"use client";

import { useState } from "react";
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

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        page_path: typeof window !== "undefined" ? window.location.pathname : "",
      }),
    });

    if (!res.ok) {
      setStatus("error");
      setErrorMsg("Hubo un problema. Intenta de nuevo.");
      return;
    }

    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 4000);
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

      {/* Toast */}
      <div
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-5 py-3.5 text-sm transition-all duration-300"
        style={{
          backgroundColor: "#062028",
          color: "#F5EFE6",
          opacity: status === "success" ? 1 : 0,
          transform: status === "success" ? "translateY(0)" : "translateY(12px)",
          pointerEvents: "none",
        }}
      >
        <Check size={15} style={{ color: "#7A9E8A" }} />
        ¡Grazie! Estás suscrita.
      </div>
    </section>
  );
}
