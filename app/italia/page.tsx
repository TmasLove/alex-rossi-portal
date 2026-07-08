import PageHero from "@/components/PageHero";

export const metadata = { title: "Italia — Alexandra Rossi" };

const regions = [
  { name: "Toscana",      desc: "Colinas de cipreses, vinos legendarios y ciudades renacentistas.", color: "#D4573A" },
  { name: "Roma",         desc: "La Ciudad Eterna y sus dos mil años de historia viva.",             color: "#1A7A8A" },
  { name: "Amalfi",       desc: "Acantilados de ensueño, limoncello y puestas de sol.",              color: "#7A9E8A" },
  { name: "Sicilia",      desc: "Fusión de culturas, templos griegos y cocina explosiva.",            color: "#D4573A" },
  { name: "Venezia",      desc: "Canales, carnavales y el cristal de Murano.",                       color: "#1A7A8A" },
  { name: "Puglia",       desc: "Trulli, olive oil y el sur más auténtico de Italia.",               color: "#7A9E8A" },
];

const features = [
  { emoji: "🍷", title: "Gastronomía",    desc: "Rutas de vino, mercados locales y restaurantes con historia centenaria." },
  { emoji: "🏛️", title: "Arte & Cultura", desc: "Palacios, museos y talleres de artesanos que mantienen viva la tradición." },
  { emoji: "🏡", title: "Diseño",         desc: "Interiores italianos, materiales nobles y espacios que inspiran." },
  { emoji: "✈️", title: "Viajes",         desc: "Guías exclusivas de Alexandra para explorar Italia como una local." },
];

export default function Italia() {
  return (
    <>
      <PageHero
        image="https://alexandrarossi.com/wp-content/uploads/2021/02/Alexa-18-1024x576.jpg"
        eyebrow="Portal Italiano"
        title="La Dolce Vita Italia"
        subtitle="Descubre Italia a través de los ojos de Alexandra Rossi."
        tint="rgba(14,61,69,.78)"
      />

      {/* INTRO */}
      <section className="max-w-5xl mx-auto px-8 md:px-12 py-20 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-[.58rem] tracking-[.24em] uppercase text-[#D4573A] font-semibold mb-3">El portal</p>
          <h2 className="font-serif-custom text-3xl italic text-[#0E3D45] mb-6 leading-snug">Italia vista por Alexandra</h2>
          <p className="text-[.88rem] text-[#2E5A62] leading-relaxed mb-4">
            El portal <em>La Dolce Vita Italia</em> es el espacio digital dedicado exclusivamente a Italia: guías de viaje curadas, recomendaciones de hoteles y restaurantes, cultura, arte, gastronomía y diseño italiano en su máxima expresión.
          </p>
          <p className="text-[.88rem] text-[#2E5A62] leading-relaxed mb-8">
            Un recurso vivo, actualizado con cada viaje de Alexandra, para quienes quieren vivir Italia de manera auténtica.
          </p>
          <a
            href="/la-dolce-vita-italia"
            className="inline-flex items-center gap-2 text-[.68rem] tracking-[.18em] uppercase font-semibold text-white bg-[#1A7A8A] px-7 py-3.5 hover:bg-[#D4573A] transition-colors duration-200"
          >
            Visitar el portal →
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {["https://alexandrarossi.com/wp-content/uploads/2021/02/Alexa-18-1024x576.jpg",
            "https://alexandrarossi.com/wp-content/uploads/2021/02/Alexa-21b-1024x576.jpg",
            "https://alexandrarossi.com/wp-content/uploads/2021/02/Alexa-24b-1024x576.jpg",
            "https://alexandrarossi.com/wp-content/uploads/2021/02/Foto-Alexandra-Rossi-6-768x432.jpg",
          ].map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden">
              <img src={src} alt="" className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="bg-[#D8E6E3] py-16 px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-[.58rem] tracking-[.24em] uppercase text-[#D4573A] font-semibold mb-8 text-center">Contenidos</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(f => (
              <div key={f.title} className="bg-white p-6">
                <div className="text-2xl mb-3">{f.emoji}</div>
                <h3 className="font-serif-custom text-lg italic text-[#0E3D45] mb-2">{f.title}</h3>
                <p className="text-[.78rem] text-[#5A7A80] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGIONS */}
      <section className="max-w-5xl mx-auto px-8 py-20">
        <p className="text-[.58rem] tracking-[.24em] uppercase text-[#D4573A] font-semibold mb-3">Destinos</p>
        <h2 className="font-serif-custom text-3xl italic text-[#0E3D45] mb-10">Regiones favoritas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {regions.map(r => (
            <div key={r.name} className="border-l-2 pl-5 py-2" style={{ borderColor: r.color }}>
              <h3 className="font-serif-custom text-xl italic text-[#0E3D45] mb-1">{r.name}</h3>
              <p className="text-[.8rem] text-[#5A7A80] leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
