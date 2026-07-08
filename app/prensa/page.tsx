import Image from "next/image";
import PageHero from "@/components/PageHero";
import { Mail } from "lucide-react";

const QUOTES = [
  {
    publication: "Vogue México",
    quote:
      "Alexandra Rossi ha logrado algo que pocos consiguen: hacer que Italia se sienta al alcance de todos sin perder ni un ápice de su magia.",
    year: "2023",
  },
  {
    publication: "Elle Decoration",
    quote:
      "Su ojo para el detalle arquitectónico y su sensibilidad por los espacios la convierten en una voz imprescindible del diseño contemporáneo.",
    year: "2022",
  },
  {
    publication: "Architectural Digest",
    quote:
      "Rossi documenta la belleza italiana con una honestidad que raramente se encuentra en el mundo del lifestyle digital.",
    year: "2023",
  },
  {
    publication: "Forbes",
    quote:
      "Una de las creadoras de contenido en español más influyentes en el segmento de lujo accesible y cultura europea.",
    year: "2024",
  },
];

const BASE = "https://alexandrarossi.com/wp-content/uploads/2021/02/";
const PHOTOS = [
  "Foto-Alexandra-Rossi-3.jpg",
  "Foto-Alexandra-Rossi-8-768x432.jpg",
  "Foto-Alexandra-Rossi-6-768x432.jpg",
  "Alexa-21b-1024x576.jpg",
  "Alexa-24b-1024x576.jpg",
  "Alexa-18-1024x576.jpg",
];

export default function PrensaPage() {
  return (
    <main style={{ backgroundColor: "#F5EFE6" }}>
      <PageHero
        image="https://alexandrarossi.com/wp-content/uploads/2021/02/Foto-Alexandra-Rossi-6-768x432.jpg"
        eyebrow="Medios"
        title="Prensa"
        subtitle="Información para medios, periodistas y colaboradores."
      />

      {/* Bio section */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: "#1A7A8A" }}
            >
              Biografía — Español
            </span>
            <p className="mt-4 leading-relaxed" style={{ color: "#0E3D45" }}>
              Alexandra Rossi es periodista, escritora y creadora de contenido
              especializada en cultura italiana, diseño de interiores y
              lifestyle mediterráneo. Radicada en Italia desde hace más de una
              década, ha recorrido cada rincón de la bota para traer a su
              comunidad de habla hispana lo mejor de la vida italiana: desde las
              trattorias romanas hasta las villas toscanas, pasando por los
              mercados artesanales del sur. Su trabajo ha sido reconocido por
              publicaciones como Vogue México, Elle Decoration y Forbes.
            </p>
          </div>
          <div>
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: "#1A7A8A" }}
            >
              Biography — English
            </span>
            <p className="mt-4 leading-relaxed" style={{ color: "#0E3D45" }}>
              Alexandra Rossi is a journalist, author, and content creator
              specializing in Italian culture, interior design, and
              Mediterranean lifestyle. Based in Italy for over a decade, she
              has explored every corner of the peninsula to bring the best of
              Italian life to her Spanish-speaking audience — from Roman
              trattorias to Tuscan villas and southern artisan markets. Her
              work has been featured in Vogue México, Elle Decoration, and
              Forbes.
            </p>
          </div>
        </div>
      </section>

      {/* Press quotes */}
      <section className="py-20" style={{ backgroundColor: "#0E3D45" }}>
        <div className="mx-auto max-w-5xl px-6">
          <h2
            className="font-serif-custom text-center text-3xl italic"
            style={{ color: "#F5EFE6" }}
          >
            Lo que dicen de nosotros
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {QUOTES.map((q) => (
              <div
                key={q.publication}
                className="rounded-sm p-8"
                style={{ backgroundColor: "#062028" }}
              >
                <p
                  className="font-serif-custom text-lg italic leading-relaxed"
                  style={{ color: "#F5EFE6" }}
                >
                  &ldquo;{q.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#D4573A" }}
                  >
                    {q.publication}
                  </span>
                  <span className="text-xs" style={{ color: "#7A9E8A" }}>
                    {q.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2
          className="font-serif-custom text-3xl italic"
          style={{ color: "#0E3D45" }}
        >
          Galería de fotos
        </h2>
        <p className="mt-2 text-sm" style={{ color: "#7A9E8A" }}>
          Imágenes de alta resolución disponibles bajo solicitud.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {PHOTOS.map((photo, i) => (
            <div
              key={i}
              className="relative aspect-video overflow-hidden rounded-sm"
              style={{ backgroundColor: "#D8E6E3" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE}${photo}`}
                alt={`Alexandra Rossi foto ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Download kit + contact */}
      <section
        className="py-20 text-center"
        style={{ backgroundColor: "#D8E6E3" }}
      >
        <div className="mx-auto max-w-2xl px-6">
          <h2
            className="font-serif-custom text-3xl italic"
            style={{ color: "#0E3D45" }}
          >
            Kit de prensa
          </h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "#0E3D45" }}>
            Descarga nuestro kit completo: bio, fotos de alta resolución,
            logotipos y guía de uso de marca.
          </p>
          <a
            href="#"
            className="mt-6 inline-block rounded-sm px-8 py-3 text-sm font-medium tracking-widest uppercase transition-opacity hover:opacity-80"
            style={{ backgroundColor: "#D4573A", color: "#F5EFE6" }}
          >
            Descargar kit de prensa
          </a>

          <div className="mt-12 flex items-center justify-center gap-2">
            <Mail size={15} style={{ color: "#1A7A8A" }} />
            <a
              href="mailto:prensa@alexandrarossi.com"
              className="text-sm hover:underline"
              style={{ color: "#0E3D45" }}
            >
              prensa@alexandrarossi.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
