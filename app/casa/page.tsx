"use client";
import { useState } from "react";
import Link from "next/link";
import { MapPin, BedDouble, Maximize2, Mail, ExternalLink, Search } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

const pillars = [
  { title: "Boutique Curation",    sub: "Hand-picked properties" },
  { title: "International Reach",  sub: "Italy · LatAm · USA · EU" },
  { title: "Local Expertise",      sub: "Vetted agents on the ground" },
  { title: "Concierge Service",    sub: "Paperwork · escrow · translation" },
];

const services = [
  { icon: "✦", title: "Curated Excellence",    desc: "Residences, villas, hotels, lots and projects selected with an aesthetic eye and a clear investment vision." },
  { icon: "✦", title: "International Backing", desc: "Strategic partners in every country — recognized experts across real estate, legal, and financial sectors." },
  { icon: "✦", title: "Personalized Guidance", desc: "Comprehensive advisory for those looking to buy, invest, or develop in international markets." },
];

const destinations = [
  "Italia","Argentina","Colombia","México","Francia","España",
  "Costa Rica","Puerto Rico","Miami","Mendoza","Cartagena",
  "Barcelona","Buenos Aires","Guanacaste","Marbella","Nice",
];

const listings = [
  { name: "Villa Toscana",          location: "Firenze, Italia",       beds: 5, sqm: 480, price: "€ 3,200,000", tag: "For Sale",   img: "https://alexandrarossi.com/wp-content/uploads/2021/02/Foto-Alexandra-Rossi-8-768x432.jpg" },
  { name: "Penthouse Cartagena",    location: "Cartagena, Colombia",   beds: 3, sqm: 210, price: "USD 890,000",  tag: "For Sale",   img: "https://alexandrarossi.com/wp-content/uploads/2021/02/Alexa-21b-1024x576.jpg" },
  { name: "Loft Miami Beach",       location: "Miami, FL · USA",       beds: 2, sqm: 165, price: "USD 1,100,000",tag: "For Rent",   img: "https://alexandrarossi.com/wp-content/uploads/2021/02/Alexa-24b-1024x576.jpg" },
  { name: "Finca Mendoza",          location: "Mendoza, Argentina",    beds: 6, sqm: 620, price: "USD 2,400,000",tag: "For Sale",   img: "https://alexandrarossi.com/wp-content/uploads/2021/02/Foto-Alexandra-Rossi-6-768x432.jpg" },
  { name: "Villa Marbella",         location: "Marbella, España",      beds: 4, sqm: 380, price: "€ 1,750,000", tag: "Vacation",   img: "https://alexandrarossi.com/wp-content/uploads/2021/02/Alexa-18-1024x576.jpg" },
  { name: "Apartamento Barcelona",  location: "Barcelona, España",     beds: 3, sqm: 190, price: "€ 980,000",   tag: "For Sale",   img: "https://alexandrarossi.com/wp-content/uploads/2021/02/Foto-Alexandra-Rossi-3.jpg" },
];

const tagColor: Record<string, string> = {
  "For Sale": "#D4573A",
  "For Rent": "#1A7A8A",
  "Vacation": "#7A9E8A",
};

const filters = ["All", "For Sale", "For Rent", "Vacation"];

export default function Casa() {
  const [activeFilter, setFilter] = useState("All");
  const filtered = activeFilter === "All" ? listings : listings.filter(l => l.tag === activeFilter);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-[#0D0A06]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://alexandrarossi.com/wp-content/uploads/2021/02/Alexa-21b-1024x576.jpg')" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(13,10,6,.3) 0%, rgba(13,10,6,.65) 60%, rgba(13,10,6,.9) 100%)" }} />

        <div className="relative z-10 px-6 max-w-4xl mx-auto pt-28 pb-20">
          <p className="text-[.58rem] tracking-[.3em] uppercase text-[#D4573A] font-medium mb-6">Alexandra Rossi · Global Real Estate</p>
          <h1 className="font-serif-custom text-[clamp(2.8rem,8vw,7rem)] italic text-[#F5EFE6] leading-[.92] mb-6">
            Discover the Art of<br />Inhabiting the World
          </h1>
          <p className="text-[.92rem] text-[rgba(245,239,230,.6)] max-w-xl mx-auto leading-relaxed mb-10">
            A boutique international firm curating exceptional properties, villas, and investment opportunities in the world's most inspiring destinations.
          </p>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-0 max-w-xl mx-auto mb-6">
            <div className="flex-1 flex items-center bg-[rgba(245,239,230,.07)] border border-[rgba(245,239,230,.18)] border-r-0 px-4 gap-2">
              <Search size={14} className="text-[rgba(245,239,230,.35)] flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by city, country, or property type..."
                className="flex-1 bg-transparent py-3.5 text-[.82rem] text-[#F5EFE6] placeholder-[rgba(245,239,230,.25)] outline-none"
              />
            </div>
            <a
              href="https://www.ladolcevitacasa.com/en/listings"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[.65rem] tracking-[.18em] uppercase font-semibold text-white bg-[#D4573A] px-7 py-3.5 hover:bg-[#E8795A] transition-colors whitespace-nowrap"
            >
              Search
            </a>
          </div>
          <div className="flex justify-center gap-3 flex-wrap">
            {["For Sale", "For Rent", "Vacation"].map(f => (
              <span key={f} className="text-[.58rem] tracking-[.16em] uppercase border border-[rgba(245,239,230,.2)] text-[rgba(245,239,230,.55)] px-4 py-1.5 hover:border-[#D4573A] hover:text-[#E8795A] cursor-pointer transition-colors">
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST PILLARS ── */}
      <section className="bg-[#F5EFE6] border-b border-[#D8E6E3]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {pillars.map((p, i) => (
            <RevealOnScroll key={p.title} delay={i * 80}>
              <div className={`px-8 py-8 text-center ${i < 3 ? "border-r border-[#D8E6E3]" : ""}`}>
                <p className="text-[.6rem] tracking-[.2em] uppercase font-bold text-[#0E3D45] mb-1">{p.title}</p>
                <p className="text-[.72rem] text-[#5A7A80]">{p.sub}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="max-w-5xl mx-auto px-8 md:px-12 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <RevealOnScroll>
          <p className="text-[.58rem] tracking-[.24em] uppercase text-[#D4573A] font-semibold mb-3">Our Story</p>
          <h2 className="font-serif-custom text-[clamp(2rem,4vw,3rem)] italic text-[#0E3D45] mb-6 leading-tight">More Than Real Estate</h2>
          <p className="text-[.88rem] text-[#2E5A62] leading-relaxed mb-4">
            Born from the aesthetic and cultural vision of Alexandra Rossi Collection, La Dolce Vita Casa is a boutique international firm dedicated to curating properties, residences, villas, hotels, estates, and investment opportunities in the world's most inspiring destinations.
          </p>
          <p className="text-[.88rem] text-[#2E5A62] leading-relaxed mb-8">
            More than a real estate portal, La Dolce Vita Casa is a lifestyle real estate experience — a way to discover the art of living and investing with purpose, elegance, and confidence.
          </p>
          <a
            href="https://www.ladolcevitacasa.com/en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[.65rem] tracking-[.18em] uppercase font-semibold text-white bg-[#0E3D45] px-7 py-3.5 hover:bg-[#D4573A] transition-colors duration-200"
          >
            Visit Full Site <ExternalLink size={12} />
          </a>
        </RevealOnScroll>
        <div className="space-y-6 pt-2">
          {services.map((s, i) => (
            <RevealOnScroll key={s.title} delay={i * 100 + 100} className="block">
              <div className="flex gap-4">
                <span className="text-[#D4573A] text-sm mt-0.5 flex-shrink-0">{s.icon}</span>
                <div>
                  <h4 className="font-serif-custom text-lg italic text-[#0E3D45] mb-1">{s.title}</h4>
                  <p className="text-[.8rem] text-[#5A7A80] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ── VISION QUOTE ── */}
      <RevealOnScroll className="block">
        <section className="bg-[#0D0A06] py-20 px-8 text-center">
          <p className="text-[.55rem] tracking-[.28em] uppercase text-[#D4573A] font-medium mb-8">Our Vision</p>
          <blockquote className="font-serif-custom text-[clamp(1.6rem,4vw,3rem)] italic text-[#F5EFE6] leading-snug max-w-3xl mx-auto mb-6">
            "Where beauty, profitability, and style meet under one seal."
          </blockquote>
          <p className="text-[.6rem] tracking-[.22em] uppercase text-[rgba(245,239,230,.35)]">— La Dolce Vita Casa</p>
        </section>
      </RevealOnScroll>

      {/* ── DESTINATIONS TICKER ── */}
      <div className="bg-[#0E3D45] py-4 overflow-hidden">
        <div className="flex gap-8 animate-[marquee_28s_linear_infinite] whitespace-nowrap">
          {[...destinations, ...destinations].map((d, i) => (
            <span key={i} className="text-[.6rem] tracking-[.2em] uppercase text-[rgba(245,239,230,.45)] font-medium flex-shrink-0">
              {d} <span className="text-[#D4573A] mx-2">✦</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      </div>

      {/* ── FEATURED LISTINGS ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[.58rem] tracking-[.24em] uppercase text-[#D4573A] font-semibold mb-2">Portfolio</p>
            <h2 className="font-serif-custom text-[clamp(2rem,4vw,3rem)] italic text-[#0E3D45]">Featured Listings</h2>
          </div>
          <a
            href="https://www.ladolcevitacasa.com/en/listings"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[.62rem] tracking-[.16em] uppercase font-semibold text-[#1A7A8A] border-b border-[rgba(26,122,138,.3)] hover:text-[#D4573A] hover:border-[#D4573A] transition-colors pb-0.5"
          >
            View all listings <ExternalLink size={11} />
          </a>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[.6rem] tracking-[.16em] uppercase font-semibold px-4 py-2 transition-all duration-200 ${
                activeFilter === f
                  ? "bg-[#D4573A] text-white"
                  : "border border-[rgba(26,122,138,.3)] text-[#2E5A62] hover:border-[#D4573A] hover:text-[#D4573A]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <RevealOnScroll key={p.name} delay={(i % 3) * 90}>
              <a
                href="https://www.ladolcevitacasa.com/en/listings"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white overflow-hidden group hover:shadow-xl transition-shadow duration-300 block"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500" />
                  <span className="absolute top-3 left-3 text-[.55rem] tracking-[.16em] uppercase font-bold px-2.5 py-1 text-white" style={{ background: tagColor[p.tag] }}>
                    {p.tag}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-1 text-[.68rem] text-[#5A7A80]">
                    <MapPin size={11} /><span>{p.location}</span>
                  </div>
                  <h3 className="font-serif-custom text-lg italic text-[#0E3D45] mb-2">{p.name}</h3>
                  <div className="flex items-center gap-4 text-[.72rem] text-[#5A7A80] mb-3">
                    <span className="flex items-center gap-1"><BedDouble size={12} /> {p.beds} bed.</span>
                    <span className="flex items-center gap-1"><Maximize2 size={12} /> {p.sqm} m²</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#D8E6E3]">
                    <span className="font-serif-custom text-lg italic text-[#D4573A]">{p.price}</span>
                    <span className="text-[.6rem] tracking-[.14em] uppercase text-[#1A7A8A] group-hover:text-[#D4573A] transition-colors">Ver →</span>
                  </div>
                </div>
              </a>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <RevealOnScroll className="block">
        <section className="bg-[#D8E6E3] py-16 px-8">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-[.58rem] tracking-[.24em] uppercase text-[#D4573A] font-semibold mb-2">Headquarters · Miami, FL</p>
              <h2 className="font-serif-custom text-2xl italic text-[#0E3D45]">Ready to find your property?</h2>
              <p className="text-[.82rem] text-[#5A7A80] mt-2">Italy · Argentina · Mexico · Colombia · Spain · France · USA</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="https://www.ladolcevitacasa.com/en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[.65rem] tracking-[.18em] uppercase font-semibold text-white bg-[#D4573A] px-7 py-3.5 hover:bg-[#E8795A] transition-colors"
              >
                Visit ladolcevitacasa.com <ExternalLink size={12} />
              </a>
              <a
                href="mailto:casa@alexandrarossi.com"
                className="inline-flex items-center gap-2 text-[.65rem] tracking-[.18em] uppercase font-semibold text-[#0E3D45] border border-[rgba(14,61,69,.3)] px-7 py-3.5 hover:border-[#D4573A] hover:text-[#D4573A] transition-colors"
              >
                <Mail size={13} /> Contact us
              </a>
            </div>
          </div>
        </section>
      </RevealOnScroll>
    </>
  );
}
