"use client";
import { useState } from "react";
import Link from "next/link";

export default function LaDolceVitaItalia() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      img: "http://ladolcevitaitalia.alexandrarossi.com/wp-content/uploads/2021/05/Alexa-12.png",
      icon: "http://ladolcevitaitalia.alexandrarossi.com/wp-content/uploads/2021/05/alexaIcon.png",
      name: "Alexandra Rossi",
      bio: "É una donna commovente, emotiva, sensibile alla conoscenza e alle esperienze multiculturali, con la conoscenza dei piaceri della vita e lo spirito gioviale per goderseli.",
      cta: { label: "Así soy", href: "/mi-perfil" },
    },
    {
      img: "http://ladolcevitaitalia.alexandrarossi.com/wp-content/uploads/2021/04/propiedades.jpeg",
      icon: "http://ladolcevitaitalia.alexandrarossi.com/wp-content/uploads/2021/05/tulioIcon.png",
      name: "Dr. Tullio Zembo",
      bio: "Asesor legal · Cavaliere (título honorífico del Presidente de la República Italiana) · Director del diario L'Italiano.",
      cta: { label: "Contáctenos", href: "#contacto" },
    },
  ];

  const categories = [
    {
      title: "Propiedades",
      desc: "Italia es un país de ensueño y ofrece grandes beneficios para comprar propiedades. Conoce la oferta de casas, villas y apartamentos que tenemos para ti.",
      img: "http://ladolcevitaitalia.alexandrarossi.com/wp-content/uploads/2021/04/propiedades.jpeg",
      color: "#009246",
    },
    {
      title: "Turismo",
      desc: "Con nuestra oferta turística podrás tener las mejores experiencias de tu vida en uno de los mejores destinos del mundo, la bella Italia.",
      img: "http://ladolcevitaitalia.alexandrarossi.com/wp-content/uploads/2021/04/WhatsApp-Image-2021-04-21-at-9.25.58-PM.jpg",
      color: "#D4573A",
    },
    {
      title: "Italianos en el mundo",
      desc: "Si eres italiano o descendiente que vive en otros países, aquí encontrarás toda una comunidad con la información que necesitas para mantener el arraigo con Italia.",
      img: "http://ladolcevitaitalia.alexandrarossi.com/wp-content/uploads/2021/04/italianos.jpeg",
      color: "#CE2B37",
    },
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="bg-[#F5EFE6]">

      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden bg-[#062028]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('http://ladolcevitaitalia.alexandrarossi.com/wp-content/uploads/2021/04/propiedades.jpeg')" }}
        />
        {/* Italian flag stripe at top */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-[#009246]" />
          <div className="flex-1 bg-white opacity-60" />
          <div className="flex-1 bg-[#CE2B37]" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <img
            src="http://ladolcevitaitalia.alexandrarossi.com/wp-content/uploads/elementor/thumbs/LA-DOLCE-VITA-Italia-1-p62m1ul547jot0epj15x4al2a99lesl235xzc6yek0.png"
            alt="La Dolce Vita Italia"
            className="w-48 md:w-64 mb-8 drop-shadow-xl"
          />
          <h1 className="font-serif-custom text-[clamp(2.5rem,7vw,6rem)] italic text-[#F5EFE6] leading-tight mb-6">
            La Dolce Vita Italia
          </h1>
          <p className="text-[1rem] md:text-[1.1rem] text-[rgba(245,239,230,.75)] max-w-2xl leading-relaxed">
            Este espacio está dedicado a las maravillas que Italia tiene para ofrecer al mundo y que a través de Alexandra Rossi y LA DOLCE VITA podrás disfrutar.
          </p>
          <div className="flex flex-wrap gap-4 mt-10 justify-center">
            <a href="#categorias" className="text-[.68rem] tracking-[.18em] uppercase font-semibold text-white bg-[#009246] px-7 py-3.5 hover:bg-[#00773a] transition-colors">
              Explorar
            </a>
            <a href="#contacto" className="text-[.68rem] tracking-[.18em] uppercase font-semibold text-[rgba(245,239,230,.8)] border border-[rgba(245,239,230,.3)] px-7 py-3.5 hover:border-[#D4573A] hover:text-[#E8795A] transition-colors">
              Contáctenos
            </a>
          </div>
        </div>

        {/* Bottom flag stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-[#009246]" />
          <div className="flex-1 bg-white opacity-60" />
          <div className="flex-1 bg-[#CE2B37]" />
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="categorias" className="max-w-6xl mx-auto px-6 md:px-10 py-20">
        <p className="text-[.58rem] tracking-[.24em] uppercase text-[#D4573A] font-semibold mb-2 text-center">Nuestros servicios</p>
        <h2 className="font-serif-custom text-[clamp(2rem,4vw,3rem)] italic text-[#0E3D45] text-center mb-12">Todo lo que Italia tiene para ti</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map(cat => (
            <div key={cat.title} className="group overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,32,40,.75) 0%, transparent 60%)" }} />
                <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: cat.color }} />
              </div>
              <div className="p-6">
                <h3 className="font-serif-custom text-xl italic text-[#0E3D45] mb-3" style={{ borderLeft: `3px solid ${cat.color}`, paddingLeft: "0.75rem" }}>
                  {cat.title}
                </h3>
                <p className="text-[.83rem] text-[#5A7A80] leading-relaxed">{cat.desc}</p>
                <button className="mt-4 text-[.6rem] tracking-[.16em] uppercase font-semibold transition-colors" style={{ color: cat.color }}>
                  Ver más →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROGRAMA / CAROUSEL ── */}
      <section className="bg-[#0E3D45] py-20 px-6">
        <p className="text-[.58rem] tracking-[.24em] uppercase text-[#D4573A] font-semibold mb-2 text-center">El programa</p>
        <h2 className="font-serif-custom text-3xl italic text-[#F5EFE6] text-center mb-12">Programa La Dolce Vita</h2>

        <div className="max-w-4xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={slides[slide].img}
                  alt={slides[slide].name}
                  className="w-full h-full object-cover object-top transition-opacity duration-300"
                />
              </div>
              <div className="absolute top-0 left-0 right-0 h-1 flex">
                <div className="flex-1 bg-[#009246]" />
                <div className="flex-1 bg-white opacity-40" />
                <div className="flex-1 bg-[#CE2B37]" />
              </div>
            </div>

            {/* Content */}
            <div className="text-center md:text-left">
              <p className="text-[.58rem] tracking-[.24em] uppercase text-[#7A9E8A] font-semibold mb-4">La Dolce Vita Italia</p>
              <div className="flex items-center gap-4 mb-4 justify-center md:justify-start">
                <img
                  src={slides[slide].icon}
                  alt={slides[slide].name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#D4573A]"
                />
                <h3 className="font-serif-custom text-2xl italic text-[#F5EFE6]">{slides[slide].name}</h3>
              </div>
              <p className="text-[.88rem] text-[rgba(245,239,230,.65)] leading-relaxed mb-8">{slides[slide].bio}</p>
              <a
                href={slides[slide].cta.href}
                className="inline-block text-[.68rem] tracking-[.18em] uppercase font-semibold text-white bg-[#009246] px-7 py-3 hover:bg-[#00773a] transition-colors"
              >
                {slides[slide].cta.label}
              </a>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${i === slide ? "bg-[#D4573A] scale-125" : "bg-[rgba(245,239,230,.3)]"}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() => setSlide(s => (s - 1 + slides.length) % slides.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 bg-[rgba(6,32,40,.6)] hover:bg-[#D4573A] text-white flex items-center justify-center transition-colors text-lg"
          >‹</button>
          <button
            onClick={() => setSlide(s => (s + 1) % slides.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 bg-[rgba(6,32,40,.6)] hover:bg-[#D4573A] text-white flex items-center justify-center transition-colors text-lg"
          >›</button>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="text-[.58rem] tracking-[.24em] uppercase text-[#D4573A] font-semibold mb-3">Quiénes somos</p>
        <h2 className="font-serif-custom text-3xl italic text-[#0E3D45] mb-6">Una comunidad para los amigos de Italia</h2>
        <p className="text-[.9rem] text-[#2E5A62] leading-relaxed mb-4">
          La Dolce Vita Italia es un espacio para la comunidad italiana en el mundo y para todos los amigos de La Dolce Vita que quieran conocer más sobre esta maravillosa región.
        </p>
        <p className="text-[1rem] italic font-serif-custom text-[#1A7A8A]">¡Vive con nosotros una Dolce Vita Italia!</p>
      </section>

      {/* ── CONTACT ── */}
      <section id="contacto" className="bg-[#D8E6E3] py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          <div>
            <p className="text-[.58rem] tracking-[.24em] uppercase text-[#D4573A] font-semibold mb-3">Contáctenos</p>
            <h2 className="font-serif-custom text-3xl italic text-[#0E3D45] mb-4">¿Tienes alguna duda?</h2>
            <p className="text-[.88rem] text-[#2E5A62] leading-relaxed mb-6">
              Si tienes una duda, un comentario o simplemente deseas enviarnos un saludo, ¡escríbenos!
            </p>
            <div className="space-y-3 text-[.82rem] text-[#2E5A62]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#009246] flex items-center justify-center text-white text-xs font-bold">IT</div>
                <span>ladolcevitaitalia.alexandrarossi.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#D4573A] flex items-center justify-center text-white text-xs font-bold">AR</div>
                <span>alexandrarossi.com</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 space-y-4">
            {sent ? (
              <div className="py-8 text-center">
                <p className="font-serif-custom text-xl italic text-[#009246] mb-2">¡Mensaje enviado!</p>
                <p className="text-[.82rem] text-[#5A7A80]">Gracias por escribirnos. Te responderemos pronto.</p>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-[.62rem] tracking-[.14em] uppercase text-[#5A7A80] mb-1.5">Nombre</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full border border-[#D8E6E3] px-4 py-2.5 text-[.85rem] text-[#0E3D45] outline-none focus:border-[#1A7A8A] transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-[.62rem] tracking-[.14em] uppercase text-[#5A7A80] mb-1.5">Correo electrónico</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full border border-[#D8E6E3] px-4 py-2.5 text-[.85rem] text-[#0E3D45] outline-none focus:border-[#1A7A8A] transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-[.62rem] tracking-[.14em] uppercase text-[#5A7A80] mb-1.5">Mensaje</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full border border-[#D8E6E3] px-4 py-2.5 text-[.85rem] text-[#0E3D45] outline-none focus:border-[#1A7A8A] transition-colors resize-none"
                    placeholder="Escribe tu mensaje aquí..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-[.68rem] tracking-[.18em] uppercase font-semibold text-white bg-[#009246] py-3.5 hover:bg-[#00773a] transition-colors"
                >
                  Enviar
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* ── MINI FOOTER ── */}
      <section className="bg-[#062028] py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src="http://ladolcevitaitalia.alexandrarossi.com/wp-content/uploads/2021/04/cropped-LA-DOLCE-VITA-Italia-1-300x206.png"
              alt="La Dolce Vita Italia"
              className="h-12 w-auto"
            />
            <div>
              <p className="text-[.7rem] text-[rgba(245,239,230,.4)] leading-relaxed max-w-xs">
                Un espacio para la comunidad italiana en el mundo.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-[.62rem] tracking-[.14em] uppercase">
            {[
              { label: "Inicio",        href: "/la-dolce-vita-italia" },
              { label: "La Dolce Vita", href: "/la-dolce-vita" },
              { label: "Colecciones",   href: "/colecciones" },
              { label: "Volver al sitio", href: "/" },
            ].map(l => (
              <Link key={l.href} href={l.href} className="text-[rgba(245,239,230,.4)] hover:text-[#D4573A] transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
