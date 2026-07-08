import PageHero from "@/components/PageHero";
import { ShoppingBag } from "lucide-react";

export const metadata = { title: "Colecciones — Alexandra Rossi" };

const collections = [
  {
    cat: "Papeles Pintados",
    items: [
      { name: "Damasco Toscano",   color: "#DDD5C6", desc: "Motivo clásico en tonos neutros con hilo de oro" },
      { name: "Botanico Siciliano",color: "#C8D9C0", desc: "Inspirado en los jardines mediterráneos" },
      { name: "Geométrico Veneto", color: "#B8CDD8", desc: "Formas geométricas en azul laguna y blanco" },
      { name: "Fiorentino Rosa",   color: "#E8C4C0", desc: "Florales delicados en rosa empolvado" },
    ],
  },
  {
    cat: "Ropa de Cama",
    items: [
      { name: "Lino Romano",       color: "#E8E0D0", desc: "100% lino belga, lavado a la piedra" },
      { name: "Percal Capri",      color: "#D8E8E4", desc: "Percal de 400 hilos, azul cielo de Capri" },
      { name: "Seda Amalfitana",   color: "#F0E8E0", desc: "Mezcla de seda natural y algodón egipcio" },
      { name: "Bordar Florentino", color: "#E4D8C8", desc: "Bordado artesanal con motivos de Florencia" },
    ],
  },
];

export default function Colecciones() {
  return (
    <>
      <PageHero
        image="https://alexandrarossi.com/wp-content/uploads/2021/02/Alexa-24b-1024x576.jpg"
        eyebrow="Alexandra Rossi Collections"
        title="Colecciones"
        subtitle="Papeles pintados, ropa de cama y textiles con alma italiana."
        tint="rgba(14,61,69,.72)"
      />

      {/* INTRO */}
      <section className="max-w-5xl mx-auto px-8 md:px-12 py-20 grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
        <div className="sticky top-28">
          <p className="text-[.58rem] tracking-[.24em] uppercase text-[#D4573A] font-semibold mb-3">La colección</p>
          <h2 className="font-serif-custom text-3xl italic text-[#0E3D45] mb-6 leading-snug">Italia para el hogar</h2>
          <p className="text-[.88rem] text-[#2E5A62] leading-relaxed mb-4">
            <em>Alexandra Rossi Collections</em> lleva la estética italiana al hogar latinoamericano. Cada pieza nace de la observación directa de materiales, colores y técnicas artesanales que Alexandra recoge en sus viajes por Italia.
          </p>
          <p className="text-[.88rem] text-[#2E5A62] leading-relaxed mb-8">
            Papeles pintados que transforman habitaciones, ropa de cama de lino y percal de primera calidad, y textiles que convierten cada espacio en una experiencia sensorial.
          </p>
          <a
            href="/tienda"
            className="inline-flex items-center gap-2 text-[.68rem] tracking-[.18em] uppercase font-semibold text-white bg-[#D4573A] px-7 py-3.5 hover:bg-[#E8795A] transition-colors duration-200"
          >
            <ShoppingBag size={14} /> Visitar la tienda
          </a>
        </div>

        <div className="space-y-10">
          {collections.map(cat => (
            <div key={cat.cat}>
              <p className="text-[.6rem] tracking-[.2em] uppercase text-[#1A7A8A] font-semibold mb-4">{cat.cat}</p>
              <div className="grid grid-cols-2 gap-3">
                {cat.items.map(item => (
                  <div key={item.name} className="group cursor-pointer">
                    <div
                      className="aspect-square mb-3 transition-transform duration-300 group-hover:scale-[1.02]"
                      style={{ backgroundColor: item.color }}
                    />
                    <h4 className="font-serif-custom text-[1rem] italic text-[#0E3D45] mb-1">{item.name}</h4>
                    <p className="text-[.72rem] text-[#5A7A80] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TIENDA CTA */}
      <section className="bg-[#0E3D45] py-16 px-8 text-center">
        <p className="text-[.58rem] tracking-[.24em] uppercase text-[#D4573A] font-semibold mb-2">Tienda en línea</p>
        <h2 className="font-serif-custom text-3xl italic text-[#F5EFE6] mb-3">Disponible ahora</h2>
        <p className="text-[.85rem] text-[rgba(245,239,230,.55)] mb-8 max-w-md mx-auto">Compra las colecciones de Alexandra Rossi directamente desde nuestra tienda oficial.</p>
        <a
          href="/tienda"
          className="inline-flex items-center gap-2 text-[.68rem] tracking-[.18em] uppercase font-semibold text-white bg-[#D4573A] px-8 py-3.5 hover:bg-[#E8795A] transition-colors"
        >
          <ShoppingBag size={14} /> Ir a la tienda
        </a>
      </section>
    </>
  );
}
