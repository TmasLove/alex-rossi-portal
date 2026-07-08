"use client";
import { useEffect, useRef } from "react";

interface PageHeroProps {
  image: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  tint?: string;
}

export default function PageHero({ image, eyebrow, title, subtitle, tint = "rgba(6,32,40,.75)" }: PageHeroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const eyeRef  = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setTimeout(() => {
      eyeRef.current?.classList.add("in");
      setTimeout(() => titleRef.current?.classList.add("in"), 120);
    }, 80);
  }, []);

  return (
    <div className="relative w-full h-[60vh] min-h-[440px] flex items-end overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-[1.03] transition-transform duration-[8s] ease-out"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${tint} 0%, rgba(6,32,40,.25) 60%, transparent 100%)` }} />
      <div className="relative z-10 px-10 md:px-16 pb-14 max-w-4xl">
        <p ref={eyeRef} className="reveal text-[.6rem] tracking-[.28em] uppercase text-[#E8795A] font-medium mb-4">{eyebrow}</p>
        <h1 ref={titleRef} className="reveal font-serif-custom text-[clamp(2.8rem,7vw,6rem)] leading-[.92] text-[#F5EFE6] font-normal italic">{title}</h1>
        {subtitle && <p className="mt-4 text-[.8rem] text-[rgba(245,239,230,.6)] tracking-wide max-w-lg">{subtitle}</p>}
      </div>
    </div>
  );
}
