import PageHero from "@/components/PageHero";
import YoutubeModalTrigger from "@/components/YoutubeModalTrigger";
import { Play } from "lucide-react";

export const metadata = { title: "La Dolce Vita — Alexandra Rossi" };

const CHANNEL_EMBED = "https://www.youtube.com/embed/videoseries?list=UUGMPFUOe1ROvZthpEEA4HMg";

const episodes = [
  { n: "01", title: "Roma Eterna",     desc: "Los secretos de la ciudad que nunca duerme.", img: "https://alexandrarossi.com/wp-content/uploads/2021/02/Alexa-21b-1024x576.jpg" },
  { n: "02", title: "Toscana Divina",  desc: "Vino, cipreses y palazzos en el corazón verde de Italia.", img: "https://alexandrarossi.com/wp-content/uploads/2021/02/Alexa-24b-1024x576.jpg" },
  { n: "03", title: "Costiera",        desc: "La magia incomparable de la Costa Amalfitana.", img: "https://alexandrarossi.com/wp-content/uploads/2021/02/Alexa-18-1024x576.jpg" },
  { n: "04", title: "Venezia",         desc: "Entre canales, máscaras y cristal de Murano.", img: "https://alexandrarossi.com/wp-content/uploads/2021/02/Foto-Alexandra-Rossi-8-768x432.jpg" },
  { n: "05", title: "Sicilia",         desc: "Aromas árabes, templos griegos y sabores únicos.", img: "https://alexandrarossi.com/wp-content/uploads/2021/02/Foto-Alexandra-Rossi-6-768x432.jpg" },
  { n: "06", title: "Cinque Terre",    desc: "Cinco pueblos, mil colores, un solo corazón.", img: "https://alexandrarossi.com/wp-content/uploads/2021/02/Foto-Alexandra-Rossi-7.jpg" },
];

export default function LaDolceVita() {
  return (
    <>
      <PageHero
        image="https://alexandrarossi.com/wp-content/uploads/2021/04/Alexa_homer-.jpg"
        eyebrow="Programa de TV"
        title="La Dolce Vita"
        subtitle="Un viaje por la cultura, el diseño y la gastronomía de Italia."
        tint="rgba(14,61,69,.8)"
      />

      {/* SHOW LOGO + ABOUT */}
      <section className="max-w-5xl mx-auto px-8 md:px-12 py-20 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <div>
          <img
            src="https://alexandrarossi.com/wp-content/uploads/2021/02/LOGO-BIG-Azul-Marinob-1024x569.png"
            alt="La Dolce Vita logo"
            className="w-full max-w-xs mb-8"
          />
          <p className="text-[.58rem] tracking-[.24em] uppercase text-[#D4573A] font-semibold mb-3">El programa</p>
          <p className="text-[.88rem] text-[#2E5A62] leading-relaxed mb-4">
            <em>La Dolce Vita</em> es el programa de televisión de Alexandra Rossi que lleva a las audiencias latinoamericanas por los rincones más bellos e inesperados de Italia: palacios históricos, talleres de artesanos, mercados medievales y restaurantes con recetas centenarias.
          </p>
          <p className="text-[.88rem] text-[#2E5A62] leading-relaxed">
            Cada episodio es un ensayo visual sobre el arte de vivir bien — la filosofía que Alexandra ha convertido en su marca personal.
          </p>
        </div>

        <div className="relative aspect-video bg-[#0E3D45] overflow-hidden group cursor-pointer">
          <img
            src="https://alexandrarossi.com/wp-content/uploads/2021/04/Alexa_homer-.jpg"
            alt="La Dolce Vita — trailer"
            className="w-full h-full object-cover opacity-70 group-hover:opacity-85 transition-opacity duration-300"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <YoutubeModalTrigger
              embedUrl={CHANNEL_EMBED}
              className="w-16 h-16 bg-[#D4573A] flex items-center justify-center hover:bg-[#E8795A] transition-colors duration-200"
            >
              <Play fill="#fff" size={22} className="ml-1" />
            </YoutubeModalTrigger>
          </div>
          <p className="absolute bottom-3 left-4 text-[.58rem] tracking-[.2em] uppercase text-[rgba(245,239,230,.6)]">Ver tráiler</p>
        </div>
      </section>

      {/* EPISODES */}
      <section className="bg-[#0E3D45] py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-[.58rem] tracking-[.24em] uppercase text-[#D4573A] font-semibold mb-3 text-center">Temporada 1</p>
          <h2 className="font-serif-custom text-3xl italic text-[#F5EFE6] mb-12 text-center">Episodios</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {episodes.map((ep) => (
              <YoutubeModalTrigger
                key={ep.n}
                embedUrl={CHANNEL_EMBED}
                className="group relative overflow-hidden bg-[#163A44] block text-left w-full"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img src={ep.img} alt={ep.title} className="w-full h-full object-cover opacity-65 group-hover:opacity-85 group-hover:scale-[1.04] transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 bg-[#D4573A] flex items-center justify-center">
                      <Play fill="#fff" size={16} className="ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-[.55rem] tracking-[.2em] uppercase text-[#7A9E8A] font-semibold">Ep. {ep.n}</span>
                  <h3 className="font-serif-custom text-xl italic text-[#F5EFE6] mt-1 mb-2">{ep.title}</h3>
                  <p className="text-[.78rem] text-[rgba(245,239,230,.5)] leading-relaxed">{ep.desc}</p>
                </div>
              </YoutubeModalTrigger>
            ))}
          </div>
        </div>
      </section>

      {/* WATCH CTA */}
      <section className="py-16 px-8 text-center bg-[#D8E6E3]">
        <p className="text-[.58rem] tracking-[.24em] uppercase text-[#D4573A] font-semibold mb-2">Disponible ahora</p>
        <h2 className="font-serif-custom text-3xl italic text-[#0E3D45] mb-6">Mira todos los episodios</h2>
        <YoutubeModalTrigger
          embedUrl={CHANNEL_EMBED}
          className="inline-flex items-center gap-2 text-[.68rem] tracking-[.18em] uppercase font-semibold text-white bg-[#D4573A] px-8 py-3.5 hover:bg-[#E8795A] transition-colors"
        >
          <Play size={14} fill="white" /> Ver episodios
        </YoutubeModalTrigger>
      </section>
    </>
  );
}
