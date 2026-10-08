"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, Check, Loader2, Mail } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const BAD_EMAIL = "Revisa tu correo — parece incompleto.";

export default function NewsletterBar() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — humans never see it
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clean = email.trim().toLowerCase();

    if (!EMAIL_RE.test(clean)) {
      setStatus("error");
      setErrorMsg(BAD_EMAIL);
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: clean,
          website,
          page_path: window.location.pathname,
        }),
      });

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(
          res.status === 400
            ? BAD_EMAIL
            : "No pudimos suscribirte ahora. Intenta de nuevo en un momento."
        );
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg("Sin conexión. Revisa tu internet e intenta de nuevo.");
    }
  }

  return (
    <section className="relative overflow-clip bg-gradient-to-br from-[#0E3D45] via-[#14606D] to-[#1A7A8A]">
      {/* Fine grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,239,230,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,239,230,.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* Warm glow in the corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#E8795A] opacity-[0.12] blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-[1.1fr_1fr] md:gap-16 md:px-8 md:py-20"
      >
        {/* Copy */}
        <div>
          <p className="mb-4 text-[.6rem] font-semibold uppercase tracking-[.28em] text-[#E8795A]">
            La Dolce Vita · Newsletter
          </p>
          <h2 className="font-serif-custom text-3xl italic leading-tight text-[#F5EFE6] md:text-4xl">
            Sé la primera en saberlo.
          </h2>
          <p className="mt-4 max-w-md text-[.9rem] leading-relaxed text-[rgba(245,239,230,.65)]">
            Novedades, viajes, diseño y la vida italiana de Alexandra — directo a
            tu correo. Sin spam, solo lo bueno.
          </p>
        </div>

        {/* Form / success */}
        <div className="w-full">
          <AnimatePresence mode="wait" initial={false}>
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-4 border border-[rgba(122,158,138,.45)] bg-[rgba(6,32,40,.45)] p-6 backdrop-blur-sm"
                role="status"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.1 }}
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#7A9E8A]"
                >
                  <Check size={18} className="text-[#062028]" strokeWidth={2.5} />
                </motion.span>
                <div>
                  <p className="font-serif-custom text-xl italic text-[#F5EFE6]">
                    ¡Grazie! Estás suscrita.
                  </p>
                  <p className="mt-1 text-[.8rem] text-[rgba(245,239,230,.6)]">
                    Te escribiremos pronto con lo mejor de Alexandra.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-3 text-[.62rem] uppercase tracking-[.18em] text-[#E8795A] underline-offset-4 hover:underline"
                  >
                    Suscribir otro correo
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Correo electrónico
                </label>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-0">
                  <div className="relative flex-1">
                    <Mail
                      size={16}
                      aria-hidden
                      className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[rgba(245,239,230,.45)]"
                    />
                    <input
                      id="newsletter-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      placeholder="tu@correo.com"
                      aria-invalid={status === "error"}
                      aria-describedby="newsletter-help"
                      className="w-full border border-[rgba(245,239,230,.18)] bg-[rgba(6,32,40,.55)] py-4 pl-11 pr-4 text-sm text-[#F5EFE6] placeholder:text-[rgba(245,239,230,.35)] outline-none backdrop-blur-sm transition-colors focus:border-[#E8795A] sm:border-r-0"
                    />
                  </div>
                  {/* Honeypot: off-screen, not tabbable — bots fill it, people don't */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group inline-flex items-center justify-center gap-2 bg-[#D4573A] px-7 py-4 text-[.68rem] font-semibold uppercase tracking-[.18em] text-white transition-colors hover:bg-[#E8795A] disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Enviando
                      </>
                    ) : (
                      <>
                        Suscribirme
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </div>

                <div id="newsletter-help" aria-live="polite" className="mt-3 min-h-[1.25rem] text-[.75rem]">
                  {status === "error" ? (
                    <span className="flex items-center gap-1.5 text-[#F0BCA9]">
                      <AlertCircle size={13} />
                      {errorMsg}
                    </span>
                  ) : (
                    <span className="text-[rgba(245,239,230,.4)]">
                      Puedes darte de baja cuando quieras.
                    </span>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
