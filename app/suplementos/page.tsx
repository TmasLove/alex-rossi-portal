import Link from "next/link";
import { ExternalLink, Mail, Check } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

const trustBadges = ["Vegan & Kosher", "Clinically Studied", "Made in Miami", "4.9 ★ from 3,000+", "No Water Needed", "Felt in Minutes"];

const products = [
  { name: "Beauty Support",       price: "$39.99", img: "https://www.dolcevitasupplements.com/cdn/shop/files/Dolce_Vita-Beauty_Support.jpg?v=1755799146&width=533", href: "https://www.dolcevitasupplements.com/products/beauty-support" },
  { name: "Sleep Support",        price: "$39.99", img: "https://www.dolcevitasupplements.com/cdn/shop/files/Sleep_Mockup.jpg?v=1756327071&width=533",              href: "https://www.dolcevitasupplements.com/products/sleep-support" },
  { name: "NAD+ Support",         price: "$39.99", img: "https://www.dolcevitasupplements.com/cdn/shop/files/Dolce_Vita_-_NAD_Support.jpg?v=1755799113&width=533",  href: "https://www.dolcevitasupplements.com/products/nad-support" },
  { name: "Hangover Support",     price: "$39.99", img: "https://www.dolcevitasupplements.com/cdn/shop/files/Dolce_Vita_-_Hangover_Strip.jpg?v=1755550836&width=533", href: "https://www.dolcevitasupplements.com/products/hangover-support" },
  { name: "Retatrutide Support",  price: "$39.99", img: "https://www.dolcevitasupplements.com/cdn/shop/files/WhatsAppImage2025-08-19at12.29.51.jpg?v=1755621908&width=533", href: "https://www.dolcevitasupplements.com/products/retatrutide-support" },
  { name: "Beauty Bundle",        price: "Bundle", img: "https://www.dolcevitasupplements.com/cdn/shop/files/WhatsApp_Image_2025-08-18_at_09.52.49_1.jpg?v=1755550783&width=533", href: "https://www.dolcevitasupplements.com/products/beauty-bundle" },
];

const compare = [
  { feature: "High bioavailability", strips: true },
  { feature: "Zero added sugar",     strips: true },
  { feature: "Precise dosage",       strips: true },
  { feature: "Quick action (under tongue)", strips: true },
  { feature: "Travel-friendly",      strips: true },
  { feature: "Vegan & kosher",       strips: true },
];

const steps = [
  { n: "01", title: "Pick your vibe",  desc: "Beauty, Sleep, NAD+, Retatrutide, Hangover — or the full Beauty Bundle for the maximalists." },
  { n: "02", title: "Pick your pace",  desc: "30, 45, or 60-day delivery. Tune it to your routine, never run out mid-week." },
  { n: "03", title: "Pocket the savings", desc: "15% off every recurring order. Skip a month or cancel anytime from your account." },
];

const testimonials = [
  { quote: "Beauty Support cleared up my skin in three weeks. The strips are genius — no water, no swallowing horse pills.", name: "Camila R.", city: "Miami, FL" },
  { quote: "Sleep Support is the only thing that's worked. I fall asleep in minutes and wake up clear-headed.", name: "Sofia M.", city: "New York, NY" },
  { quote: "Hangover Support saved my life after a long wedding weekend in Cartagena. Buying these by the case.", name: "Lucia D.", city: "Los Angeles, CA" },
];

export const metadata = { title: "Dolce Vita Supplements — Alexandra Rossi" };

export default function Suplementos() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-[#0E3D45]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('https://www.dolcevitasupplements.com/cdn/shop/files/Sleep_Mockup.jpg?v=1756327071&width=533')" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(14,61,69,.4) 0%, rgba(6,32,40,.75) 60%, rgba(6,32,40,.95) 100%)" }} />

        <div className="relative z-10 px-6 max-w-3xl mx-auto pt-28 pb-20">
          <p className="text-[.58rem] tracking-[.3em] uppercase text-[#D4573A] font-medium mb-6">Hi — we're glad you're here</p>
          <h1 className="font-serif-custom text-[clamp(2.6rem,7vw,5.5rem)] italic text-[#F5EFE6] leading-[.95] mb-6">
            Glow harder.<br />Sleep deeper.<br />Live louder.
          </h1>
          <p className="text-[.92rem] text-[rgba(245,239,230,.65)] max-w-lg mx-auto leading-relaxed mb-10">
            One little strip under the tongue. Sixty seconds. Felt in minutes. Welcome to supplements that actually show up for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <a
              href="https://www.dolcevitasupplements.com/collections/all"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-[.65rem] tracking-[.18em] uppercase font-semibold text-white bg-[#D4573A] px-8 py-4 hover:bg-[#E8795A] transition-colors"
            >
              Shop Now <ExternalLink size={12} />
            </a>
            <a
              href="https://www.dolcevitasupplements.com/pages/our-science"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-[.65rem] tracking-[.18em] uppercase font-semibold text-[#F5EFE6] border border-[rgba(245,239,230,.3)] px-8 py-4 hover:border-[#E8795A] hover:text-[#E8795A] transition-colors"
            >
              Our Science
            </a>
          </div>
          <p className="text-[.62rem] tracking-[.14em] uppercase text-[rgba(245,239,230,.4)]">Rated 4.9 / 5 by 3,000+ happy customers</p>
        </div>
      </section>

      {/* ── TRUST BADGES ── */}
      <div className="bg-[#062028] py-4 overflow-hidden">
        <div className="flex gap-8 animate-[marquee_24s_linear_infinite] whitespace-nowrap">
          {[...trustBadges, ...trustBadges].map((b, i) => (
            <span key={i} className="text-[.6rem] tracking-[.2em] uppercase text-[rgba(245,239,230,.45)] font-medium flex-shrink-0">
              {b} <span className="text-[#D4573A] mx-2">✦</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      </div>

      {/* ── WHY STRIPS ── */}
      <section className="max-w-4xl mx-auto px-8 md:px-12 py-20 text-center">
        <p className="text-[.58rem] tracking-[.24em] uppercase text-[#D4573A] font-semibold mb-3">Here's the wild part</p>
        <h2 className="font-serif-custom text-[clamp(2rem,4vw,3rem)] italic text-[#0E3D45] mb-6 leading-tight">1 strip &gt; 1 capsule.</h2>
        <p className="text-[.88rem] text-[#5A7A80] leading-relaxed max-w-xl mx-auto mb-12">
          Faster absorption, precise dosing, zero added sugar. Compare how strips outperform capsules, gummies, and tablets.
        </p>

        <RevealOnScroll className="block">
          <div className="bg-white border border-[#D8E6E3] text-left max-w-md mx-auto">
            {compare.map((c, i) => (
              <div key={c.feature} className={`flex items-center justify-between px-6 py-3.5 ${i !== compare.length - 1 ? "border-b border-[#D8E6E3]" : ""}`}>
                <span className="text-[.8rem] text-[#2E5A62]">{c.feature}</span>
                <span className="w-6 h-6 rounded-full bg-[#7A9E8A] flex items-center justify-center flex-shrink-0">
                  <Check size={13} className="text-white" />
                </span>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="bg-[#D8E6E3] py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[.58rem] tracking-[.24em] uppercase text-[#D4573A] font-semibold mb-2">Shop the strips</p>
              <h2 className="font-serif-custom text-[clamp(2rem,4vw,3rem)] italic text-[#0E3D45]">Pick your ritual</h2>
            </div>
            <a
              href="https://www.dolcevitasupplements.com/collections/all"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[.62rem] tracking-[.16em] uppercase font-semibold text-[#1A7A8A] border-b border-[rgba(26,122,138,.3)] hover:text-[#D4573A] hover:border-[#D4573A] transition-colors pb-0.5"
            >
              View full shop <ExternalLink size={11} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p, i) => (
              <RevealOnScroll key={p.name} delay={(i % 3) * 90}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white overflow-hidden group hover:shadow-xl transition-shadow duration-300 block"
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500" />
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <h3 className="font-serif-custom text-lg italic text-[#0E3D45]">{p.name}</h3>
                    <span className="text-[.75rem] font-semibold text-[#D4573A]">{p.price}</span>
                  </div>
                </a>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBSCRIPTION STEPS ── */}
      <section className="max-w-5xl mx-auto px-8 md:px-12 py-20">
        <div className="text-center mb-14">
          <p className="text-[.58rem] tracking-[.24em] uppercase text-[#D4573A] font-semibold mb-2">Save 15%</p>
          <h2 className="font-serif-custom text-[clamp(2rem,4vw,3rem)] italic text-[#0E3D45] mb-3">Set it. Forget it. Glow on.</h2>
          <p className="text-[.85rem] text-[#5A7A80] max-w-lg mx-auto leading-relaxed">
            Subscribe and we'll show up so you don't have to remember. Skip or cancel from your account in two clicks — no awkward phone call required.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((s, i) => (
            <RevealOnScroll key={s.n} delay={i * 100} className="block">
              <div className="text-center">
                <p className="font-serif-custom text-4xl italic text-[#D4573A] mb-3">{s.n}</p>
                <h4 className="text-[.75rem] tracking-[.12em] uppercase font-bold text-[#0E3D45] mb-2">{s.title}</h4>
                <p className="text-[.82rem] text-[#5A7A80] leading-relaxed">{s.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="https://www.dolcevitasupplements.com/collections/all"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[.65rem] tracking-[.18em] uppercase font-semibold text-white bg-[#0E3D45] px-8 py-4 hover:bg-[#D4573A] transition-colors"
          >
            Start your subscription <ExternalLink size={12} />
          </a>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-[#0D0A06] py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-[.55rem] tracking-[.28em] uppercase text-[#D4573A] font-medium mb-3 text-center">Rated 4.9 / 5 by 3,000+ very happy people</p>
          <h2 className="font-serif-custom text-[clamp(1.8rem,4vw,2.6rem)] italic text-[#F5EFE6] mb-12 text-center">Real people. Real rituals.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <RevealOnScroll key={t.name} delay={i * 100} className="block">
                <div className="border-t-2 border-[#D4573A] pt-5">
                  <p className="text-[.82rem] italic text-[rgba(245,239,230,.75)] leading-relaxed mb-5">"{t.quote}"</p>
                  <p className="text-[.65rem] tracking-[.1em] uppercase text-[#E8795A] font-semibold">{t.name}</p>
                  <p className="text-[.68rem] text-[rgba(245,239,230,.35)]">{t.city}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <RevealOnScroll className="block">
        <section className="bg-[#D8E6E3] py-16 px-8">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-[.58rem] tracking-[.24em] uppercase text-[#D4573A] font-semibold mb-2">Made in Miami, FL</p>
              <h2 className="font-serif-custom text-2xl italic text-[#0E3D45]">Ready to feel it in minutes?</h2>
              <p className="text-[.82rem] text-[#5A7A80] mt-2">Part of the La Dolce Vita family — plant-powered daily health essentials.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="https://www.dolcevitasupplements.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[.65rem] tracking-[.18em] uppercase font-semibold text-white bg-[#D4573A] px-7 py-3.5 hover:bg-[#E8795A] transition-colors"
              >
                Visit dolcevitasupplements.com <ExternalLink size={12} />
              </a>
              <a
                href="mailto:hello@dolcevitasupplements.com"
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
