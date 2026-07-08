import Link from "next/link";

const links = [
  { label: "Mi Perfil",     href: "/mi-perfil" },
  { label: "La Dolce Vita", href: "/la-dolce-vita" },
  { label: "Italia",        href: "/italia" },
  { label: "Colecciones",   href: "/colecciones" },
  { label: "Casa",          href: "/casa" },
  { label: "Suplementos",   href: "/suplementos" },
];

export default function Footer() {
  return (
    <footer className="bg-[#062028] text-[rgba(245,239,230,.6)]">
      <div className="max-w-6xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        <div>
          <img
            src="https://alexandrarossi.com/wp-content/uploads/2021/02/LOGO-ALEXANDRA-ROSSI-White-1024x374.png"
            alt="Alexandra Rossi"
            className="h-8 w-auto mb-4 opacity-80"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p className="text-[.8rem] leading-relaxed text-[rgba(245,239,230,.45)] max-w-xs">
            Lifestyle, cultura italiana y diseño de interiores.
          </p>
          <div className="flex gap-3 mt-5">
            {[
              { label: "YouTube",   href: "https://www.youtube.com/channel/UCGMPFUOe1ROvZthpEEA4HMg" },
              { label: "Instagram", href: "https://www.instagram.com/alexandrarossicom/" },
              { label: "Facebook",  href: "https://www.facebook.com/alexandrarossicom" },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 border border-[rgba(26,122,138,.3)] flex items-center justify-center text-[.55rem] font-bold text-[rgba(245,239,230,.45)] hover:border-[#D4573A] hover:text-[#D4573A] transition-all duration-200 tracking-tight"
              >
                {label.slice(0, 2).toUpperCase()}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[.58rem] tracking-[.2em] uppercase text-[#D4573A] font-semibold mb-5">Navegación</p>
          <ul className="flex flex-col gap-3">
            {links.map(l => (
              <li key={l.href}>
                <Link href={l.href} className="text-[.82rem] text-[rgba(245,239,230,.4)] hover:text-[#E8795A] transition-colors tracking-wide">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[.58rem] tracking-[.2em] uppercase text-[#D4573A] font-semibold mb-5">Contacto</p>
          <p className="text-[.82rem] text-[rgba(245,239,230,.4)] leading-relaxed">
            Para consultas de prensa, colaboraciones y<br />proyectos de interiorismo, escríbenos.
          </p>
          <a
            href="mailto:contacto@alexandrarossi.com"
            className="inline-block mt-4 text-[.68rem] tracking-[.15em] uppercase text-[#E8795A] border-b border-[rgba(212,87,58,.3)] pb-0.5 hover:border-[#E8795A] transition-colors"
          >
            Enviar mensaje
          </a>
        </div>
      </div>

      <div className="border-t border-[rgba(26,122,138,.12)] max-w-6xl mx-auto px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-[.65rem] tracking-[.06em] text-[rgba(245,239,230,.2)]">
          © {new Date().getFullYear()} Alexandra Rossi · Todos los derechos reservados
        </p>
        <p className="text-[.65rem] tracking-[.06em] text-[rgba(245,239,230,.15)]">
          alexandrarossi.com
        </p>
      </div>
    </footer>
  );
}
