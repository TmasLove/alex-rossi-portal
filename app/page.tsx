"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";

const portals = [
  { title: "Mi Perfil",     sub: "Biografía & Prensa",   href: "/mi-perfil",     img: "https://alexandrarossi.com/wp-content/uploads/2021/02/Foto-Alexandra-Rossi-3.jpg",    accent: "#D4573A" },
  { title: "La Dolce Vita", sub: "Programa de TV",        href: "/la-dolce-vita", img: "https://alexandrarossi.com/wp-content/uploads/2021/04/Alexa_homer-.jpg",             accent: "#1A7A8A" },
  { title: "Italia",        sub: "Portal Italiano",       href: "/italia",        img: "https://alexandrarossi.com/wp-content/uploads/2021/02/Alexa-18-1024x576.jpg",         accent: "#7A9E8A" },
  { title: "Colecciones",   sub: "Papeles & Textiles",    href: "/colecciones",   img: "https://alexandrarossi.com/wp-content/uploads/2021/02/Alexa-24b-1024x576.jpg",        accent: "#D4573A" },
  { title: "Casa",          sub: "Bienes Raíces",         href: "/casa",          img: "https://alexandrarossi.com/wp-content/uploads/2021/02/Alexa-21b-1024x576.jpg",        accent: "#1A7A8A" },
  { title: "Suplementos",   sub: "Dolce Vita Supplements", href: "/suplementos",  img: "https://www.dolcevitasupplements.com/cdn/shop/files/Sleep_Mockup.jpg?v=1756327071&width=533", accent: "#7A9E8A" },
];

export default function Home() {
  const heroRef  = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = heroRef.current?.querySelector(".hero-photo") as HTMLElement;
    if (img) setTimeout(() => (img.style.transform = "scale(1.04)"), 100);
    setTimeout(() => {
      titleRef.current?.querySelectorAll(".reveal").forEach((el, i) =>
        setTimeout(() => el.classList.add("in"), i * 150)
      );
    }, 200);
  }, []);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative w-full min-h-screen flex flex-col justify-end overflow-hidden bg-[#062028]">
        <div
          className="hero-photo absolute inset-0 bg-cover bg-[center_20%] transition-transform duration-[8s] ease-out"
          style={{ backgroundImage: "url('https://alexandrarossi.com/wp-content/uploads/2021/02/Foto-Alexandra-Rossi-7.jpg')", opacity: .42 }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(6,32,40,.92) 0%,rgba(6,32,40,.38) 55%,rgba(6,32,40,.18) 100%)" }} />

        <div ref={titleRef} className="relative z-10 px-10 md:px-20 pb-16 md:pb-28 max-w-5xl">
          <p className="reveal text-[.62rem] tracking-[.3em] uppercase text-[#E8795A] font-medium mb-6">Lifestyle · Cultura · Diseño</p>
          <h1 className="font-serif-custom leading-[.9] text-[#F5EFE6]">
            <span className="reveal block text-[clamp(4rem,10vw,9.5rem)] italic font-normal">Alexandra</span>
            <span className="reveal block text-[clamp(3rem,7.5vw,7.5rem)] font-bold tracking-[.05em] text-[#E8795A]">Rossi</span>
          </h1>
          <div className="reveal flex items-center gap-4 mt-6">
            <div className="h-px w-12 bg-[#D4573A] opacity-50" />
            <span className="text-[.65rem] tracking-[.28em] uppercase text-[rgba(245,239,230,.45)]">La Dolce Vita</span>
          </div>
          <div className="reveal flex flex-wrap items-center gap-5 mt-8">
            <Link href="/mi-perfil" className="inline-flex items-center gap-2 text-[.68rem] tracking-[.18em] uppercase font-semibold text-white bg-[#D4573A] px-7 py-3.5 hover:bg-[#E8795A] transition-colors duration-200">
              Conoce a Alexandra
            </Link>
            <Link href="/la-dolce-vita" className="text-[.68rem] tracking-[.18em] uppercase font-medium text-[rgba(245,239,230,.6)] border-b border-[rgba(212,87,58,.35)] pb-0.5 hover:text-[#E8795A] hover:border-[#E8795A] transition-colors">
              Ver el programa
            </Link>
          </div>
        </div>
      </section>

      {/* PORTALS */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <RevealOnScroll className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[.58rem] tracking-[.24em] uppercase text-[#D4573A] font-semibold mb-2">El Ecosistema</p>
            <h2 className="font-serif-custom text-[clamp(2rem,5vw,3.5rem)] italic font-normal text-[#0E3D45] leading-tight">Todos los portales</h2>
          </div>
          <p className="text-[.85rem] text-[#5A7A80] max-w-xs leading-relaxed">Un universo de contenido, estilo y diseño.</p>
        </RevealOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {portals.map((p, i) => (
            <RevealOnScroll key={p.href} delay={i * 90}>
              <Link href={p.href} className="group relative overflow-hidden aspect-[4/3] bg-[#163A44] block">
                <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-500 group-hover:opacity-80 group-hover:scale-[1.04]" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(6,32,40,.85) 0%,transparent 60%)" }} />
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="text-[.55rem] tracking-[.2em] uppercase font-semibold mb-1" style={{ color: p.accent }}>{p.sub}</p>
                  <h3 className="font-serif-custom text-2xl italic font-normal text-[#F5EFE6]">{p.title}</h3>
                  <div className="mt-3 flex items-center gap-2 text-[.62rem] tracking-[.15em] uppercase text-[rgba(245,239,230,.45)] group-hover:text-[#E8795A] transition-colors">
                    <span>Explorar</span><span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* SOCIAL CTA */}
      <RevealOnScroll className="block">
        <section className="bg-[#0E3D45] py-16 px-8 text-center">
          <p className="text-[.58rem] tracking-[.24em] uppercase text-[#D4573A] font-semibold mb-2">Sígueme</p>
          <h2 className="font-serif-custom text-3xl italic text-[#F5EFE6] mb-6">@alexandrarossicom</h2>
          <a href="https://www.instagram.com/alexandrarossicom/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[.68rem] tracking-[.18em] uppercase font-semibold text-white bg-[#D4573A] px-7 py-3 hover:bg-[#E8795A] transition-colors">
            Ver Instagram
          </a>
        </section>
      </RevealOnScroll>
    </>
  );
}
