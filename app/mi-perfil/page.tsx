import PageHero from "@/components/PageHero";
import RevealOnScroll from "@/components/RevealOnScroll";

const press = [
  { pub: "Vogue México",     quote: "Un referente del lifestyle italiano en Latinoamérica." },
  { pub: "Elle Decoration",  quote: "Su ojo para el diseño transforma cada espacio en una obra de arte." },
  { pub: "Architectural Digest", quote: "Alexandra Rossi redefine la belleza mediterránea." },
];

const gallery = [
  "https://alexandrarossi.com/wp-content/uploads/2021/02/Foto-Alexandra-Rossi-3.jpg",
  "https://alexandrarossi.com/wp-content/uploads/2021/02/Foto-Alexandra-Rossi-8-768x432.jpg",
  "https://alexandrarossi.com/wp-content/uploads/2021/02/Foto-Alexandra-Rossi-6-768x432.jpg",
];

export const metadata = { title: "Mi Perfil — Alexandra Rossi" };

export default function MiPerfil() {
  return (
    <>
      <PageHero
        image="https://alexandrarossi.com/wp-content/uploads/2021/02/Foto-Alexandra-Rossi-3.jpg"
        eyebrow="Sobre mí"
        title="Alexandra Rossi"
        subtitle="Conductora, diseñadora de interiores y apasionada de la cultura italiana."
      />

      {/* BIO */}
      <section className="max-w-5xl mx-auto px-8 md:px-12 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <RevealOnScroll>
          <p className="text-[.58rem] tracking-[.24em] uppercase text-[#D4573A] font-semibold mb-4">Biografía</p>
          <h2 className="font-serif-custom text-3xl italic text-[#0E3D45] mb-6 leading-snug">La mujer detrás de la marca</h2>
          <div className="space-y-4 text-[.88rem] text-[#2E5A62] leading-relaxed">
            <p>Alexandra Rossi es conductora de televisión, diseñadora de interiores y embajadora cultural de la vida italiana. Nacida con pasión por el arte, el buen gusto y el viaje, ha construido un universo de marca que une el lujo accesible con la autenticidad mediterránea.</p>
            <p>Su programa <em>La Dolce Vita</em> lleva a las audiencias latinoamericanas a recorrer los rincones más bellos de Italia: desde los palacios florentinos hasta las costas de Amalfi, descubriendo artesanía, gastronomía y diseño en cada episodio.</p>
            <p>Con su línea de colecciones —papeles pintados, ropa de cama y textiles— Alexandra traslada la estética italiana al hogar, haciendo de cada pieza una experiencia sensorial única.</p>
          </div>
        </RevealOnScroll>

        <div className="space-y-4">
          {gallery.map((src, i) => (
            <RevealOnScroll key={i} delay={i * 100 + 100}>
              <div className="overflow-hidden">
                <img src={src} alt={`Alexandra Rossi ${i + 1}`} className="w-full object-cover hover:scale-[1.02] transition-transform duration-500" style={{ height: i === 0 ? "280px" : "180px" }} />
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* PRESS */}
      <section className="bg-[#D8E6E3] py-16 px-8">
        <div className="max-w-5xl mx-auto">
          <RevealOnScroll className="block text-center">
            <p className="text-[.58rem] tracking-[.24em] uppercase text-[#D4573A] font-semibold mb-8">Prensa</p>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {press.map((p, i) => (
              <RevealOnScroll key={p.pub} delay={i * 100}>
                <div className="bg-white p-7 border-t-2 border-[#D4573A] h-full">
                  <p className="text-[.82rem] italic text-[#0E3D45] leading-relaxed mb-4">"{p.quote}"</p>
                  <p className="text-[.62rem] tracking-[.15em] uppercase text-[#5A7A80] font-semibold">{p.pub}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL */}
      <RevealOnScroll className="block">
        <section className="max-w-5xl mx-auto px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[.58rem] tracking-[.24em] uppercase text-[#D4573A] font-semibold mb-2">Redes sociales</p>
            <h3 className="font-serif-custom text-2xl italic text-[#0E3D45]">Sígueme en todas las plataformas</h3>
          </div>
          <div className="flex gap-4">
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
                className="flex items-center gap-2 px-5 py-2.5 border border-[rgba(26,122,138,.3)] text-[.65rem] tracking-[.14em] uppercase text-[#2E5A62] hover:border-[#D4573A] hover:text-[#D4573A] transition-all"
              >
                {label}
              </a>
            ))}
          </div>
        </section>
      </RevealOnScroll>
    </>
  );
}
