"use client";
import { useState } from "react";
import Link from "next/link";

export default function Tienda() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex flex-col">

      {/* Full-bleed cinematic background */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-[#062028]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://alexandrarossi.com/wp-content/uploads/2021/02/Alexa-24b-1024x576.jpg')" }}
        />
        {/* Subtle texture overlay */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, rgba(26,122,138,.15) 0%, rgba(212,87,58,.08) 100%)"
        }} />

        <div className="relative z-10 flex flex-col items-center text-center px-6 py-32 max-w-2xl mx-auto">

          {/* Eyebrow */}
          <p className="text-[.6rem] tracking-[.3em] uppercase text-[#E8795A] font-medium mb-8">
            Alexandra Rossi Collections
          </p>

          {/* Headline */}
          <h1 className="font-serif-custom text-[clamp(3rem,9vw,7rem)] italic text-[#F5EFE6] leading-[.9] mb-6">
            Muy pronto
          </h1>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-10 bg-[#D4573A] opacity-50" />
            <span className="text-[.6rem] tracking-[.28em] uppercase text-[rgba(245,239,230,.4)]">La tienda está en camino</span>
            <div className="h-px w-10 bg-[#D4573A] opacity-50" />
          </div>

          {/* Description */}
          <p className="text-[.92rem] text-[rgba(245,239,230,.6)] leading-relaxed max-w-md mb-12">
            Papeles pintados, ropa de cama y textiles con alma italiana. Estamos preparando algo especial — sé el primero en saberlo.
          </p>

          {/* Sign-up form */}
          {submitted ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border border-[#009246] flex items-center justify-center text-[#009246] text-xl mb-2">✓</div>
              <p className="font-serif-custom text-xl italic text-[#F5EFE6]">¡Gracias! Ya estás en la lista.</p>
              <p className="text-[.78rem] text-[rgba(245,239,230,.45)]">Te avisaremos en cuanto abramos la tienda.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="flex gap-0">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="flex-1 bg-[rgba(245,239,230,.06)] border border-[rgba(26,122,138,.3)] border-r-0 px-4 py-3.5 text-[.85rem] text-[#F5EFE6] placeholder-[rgba(245,239,230,.25)] outline-none focus:border-[rgba(212,87,58,.5)] transition-colors"
                />
                <button
                  type="submit"
                  className="text-[.65rem] tracking-[.18em] uppercase font-semibold text-white bg-[#D4573A] px-6 py-3.5 hover:bg-[#E8795A] transition-colors whitespace-nowrap"
                >
                  Avisarme
                </button>
              </div>
              <p className="text-[.62rem] text-[rgba(245,239,230,.25)] mt-3 tracking-wide">
                Sin spam. Solo te escribimos cuando la tienda esté lista.
              </p>
            </form>
          )}

          {/* Back link */}
          <Link
            href="/colecciones"
            className="mt-14 text-[.6rem] tracking-[.2em] uppercase text-[rgba(245,239,230,.3)] hover:text-[#E8795A] transition-colors border-b border-transparent hover:border-[rgba(232,121,90,.3)] pb-0.5"
          >
            ← Ver las colecciones
          </Link>
        </div>
      </div>

    </div>
  );
}
