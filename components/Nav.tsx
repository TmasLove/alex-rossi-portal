"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Mi Perfil",      href: "/mi-perfil" },
  { label: "La Dolce Vita",  href: "/la-dolce-vita" },
  { label: "Italia",         href: "/italia" },
  { label: "Colecciones",    href: "/colecciones" },
  { label: "Casa",           href: "/casa" },
  { label: "Suplementos",    href: "/suplementos" },
  { label: "Blog",           href: "/blog" },
];

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobile]   = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobile(false); }, [pathname]);

  const navBg = scrolled || !isHome
    ? "bg-[rgba(245,239,230,0.95)] backdrop-blur-xl border-b border-[rgba(26,122,138,0.12)] shadow-sm"
    : "bg-transparent border-b border-transparent";

  const linkColor = scrolled || !isHome ? "text-[#5A7A80] hover:text-coral" : "text-[rgba(245,239,230,0.8)] hover:text-[#E8795A]";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 transition-all duration-300 ${navBg}`}
           style={{ paddingTop: scrolled || !isHome ? ".75rem" : "1.25rem", paddingBottom: scrolled || !isHome ? ".75rem" : "1.25rem" }}>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img
            src="https://alexandrarossi.com/wp-content/uploads/2021/02/LOGO-ALEXANDRA-ROSSI-White-1024x374.png"
            alt="Alexandra Rossi"
            className="h-7 w-auto transition-all duration-300"
            style={{
              filter: scrolled || !isHome
                ? "brightness(0) sepia(1) saturate(3) hue-rotate(150deg) brightness(.45)"
                : "brightness(0) invert(1)"
            }}
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[.65rem] tracking-[.18em] uppercase font-medium transition-colors duration-200 ${
                pathname === l.href ? "text-coral" : linkColor
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile burger */}
        <button
          className={`md:hidden p-1 transition-colors ${scrolled || !isHome ? "text-[#0E3D45]" : "text-[rgba(245,239,230,.85)]"}`}
          onClick={() => setMobile(o => !o)}
          aria-label="Menú"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-40 bg-[#062028] flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className="text-[.75rem] tracking-[.22em] uppercase text-[rgba(245,239,230,.75)] hover:text-[#E8795A] transition-colors font-medium"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </>
  );
}
