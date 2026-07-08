"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import { Mail } from "lucide-react";

const SUBJECTS = [
  "General",
  "Prensa",
  "Colaboraciones",
  "Casa",
  "Colecciones",
];

const CONTACTS = [
  {
    label: "General",
    email: "contacto@alexandrarossi.com",
    description: "Para consultas generales, colaboraciones y todo lo demás.",
  },
  {
    label: "Prensa",
    email: "prensa@alexandrarossi.com",
    description: "Entrevistas, solicitudes de medios y kits de prensa.",
  },
  {
    label: "Casa / Real Estate",
    email: "casa@alexandrarossi.com",
    description: "Consultas sobre propiedades en Italia y proyectos de casa.",
  },
];

export default function ContactoPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate send (no backend wired yet)
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <main style={{ backgroundColor: "#F5EFE6" }}>
      <PageHero
        image="https://alexandrarossi.com/wp-content/uploads/2021/02/Foto-Alexandra-Rossi-8-768x432.jpg"
        eyebrow="Hablemos"
        title="Contacto"
        subtitle="Escríbenos — estamos encantadas de escucharte."
      />

      {/* Contact cards */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {CONTACTS.map((c) => (
            <div
              key={c.label}
              className="rounded-sm p-8"
              style={{ backgroundColor: "#D8E6E3" }}
            >
              <span
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: "#1A7A8A" }}
              >
                {c.label}
              </span>
              <div className="mt-3 flex items-center gap-2">
                <Mail size={15} style={{ color: "#0E3D45" }} />
                <a
                  href={`mailto:${c.email}`}
                  className="text-sm font-medium hover:underline"
                  style={{ color: "#0E3D45" }}
                >
                  {c.email}
                </a>
              </div>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#0E3D45" }}>
                {c.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact form */}
      <section
        className="py-20"
        style={{ backgroundColor: "#0E3D45" }}
      >
        <div className="mx-auto max-w-2xl px-6">
          <h2
            className="font-serif-custom text-3xl italic"
            style={{ color: "#F5EFE6" }}
          >
            Envíanos un mensaje
          </h2>
          <p className="mt-2 text-sm" style={{ color: "#D8E6E3" }}>
            Respondemos en un plazo de 48 horas.
          </p>

          {submitted ? (
            <div
              className="mt-10 rounded-sm p-8 text-center"
              style={{ backgroundColor: "#1A7A8A" }}
            >
              <p
                className="font-serif-custom text-2xl italic"
                style={{ color: "#F5EFE6" }}
              >
                ¡Grazie mille!
              </p>
              <p className="mt-2 text-sm" style={{ color: "#D8E6E3" }}>
                Hemos recibido tu mensaje y te escribiremos pronto.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    className="mb-1 block text-xs tracking-widest uppercase"
                    style={{ color: "#D8E6E3" }}
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-sm border-0 px-4 py-3 text-sm outline-none"
                    style={{
                      backgroundColor: "#062028",
                      color: "#F5EFE6",
                    }}
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label
                    className="mb-1 block text-xs tracking-widest uppercase"
                    style={{ color: "#D8E6E3" }}
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-sm border-0 px-4 py-3 text-sm outline-none"
                    style={{
                      backgroundColor: "#062028",
                      color: "#F5EFE6",
                    }}
                    placeholder="tu@correo.com"
                  />
                </div>
              </div>

              <div>
                <label
                  className="mb-1 block text-xs tracking-widest uppercase"
                  style={{ color: "#D8E6E3" }}
                >
                  Asunto
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-sm border-0 px-4 py-3 text-sm outline-none"
                  style={{
                    backgroundColor: "#062028",
                    color: "#F5EFE6",
                  }}
                >
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="mb-1 block text-xs tracking-widest uppercase"
                  style={{ color: "#D8E6E3" }}
                >
                  Mensaje
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-sm border-0 px-4 py-3 text-sm outline-none"
                  style={{
                    backgroundColor: "#062028",
                    color: "#F5EFE6",
                  }}
                  placeholder="Cuéntanos en qué podemos ayudarte…"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="rounded-sm px-8 py-3 text-sm font-medium tracking-widest uppercase transition-opacity hover:opacity-80 disabled:opacity-50"
                style={{ backgroundColor: "#D4573A", color: "#F5EFE6" }}
              >
                {loading ? "Enviando…" : "Enviar mensaje"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Social links */}
      <section className="py-16 text-center" style={{ backgroundColor: "#F5EFE6" }}>
        <p
          className="text-xs tracking-widest uppercase"
          style={{ color: "#1A7A8A" }}
        >
          Síguenos
        </p>
        <div className="mt-4 flex justify-center gap-8">
          <a
            href="https://www.youtube.com/@alexandrarossi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline-offset-2 hover:underline"
            style={{ color: "#0E3D45" }}
          >
            YouTube
          </a>
          <a
            href="https://www.instagram.com/alexandrarossioficial"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline-offset-2 hover:underline"
            style={{ color: "#0E3D45" }}
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/alexandrarossioficial"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline-offset-2 hover:underline"
            style={{ color: "#0E3D45" }}
          >
            Facebook
          </a>
        </div>
      </section>
    </main>
  );
}
