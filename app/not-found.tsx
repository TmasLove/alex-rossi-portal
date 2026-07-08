import Link from "next/link";

export default function NotFound() {
  const portals = [
    { href: "/italia", label: "Italia" },
    { href: "/la-dolce-vita", label: "La Dolce Vita" },
    { href: "/casa", label: "Casa & Real Estate" },
    { href: "/colecciones", label: "Colecciones" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <div
      style={{ backgroundColor: "#062028", minHeight: "100vh" }}
      className="flex flex-col"
    >
      {/* Italian flag stripe */}
      <div className="flex h-2 w-full">
        <div className="flex-1" style={{ backgroundColor: "#009246" }} />
        <div className="flex-1" style={{ backgroundColor: "#FFFFFF" }} />
        <div className="flex-1" style={{ backgroundColor: "#CE2B37" }} />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        {/* Big italic serif 404 */}
        <p
          className="font-serif-custom italic leading-none"
          style={{ fontSize: "clamp(6rem, 20vw, 14rem)", color: "#D4573A" }}
        >
          404
        </p>

        <h1
          className="font-serif-custom mt-4 text-3xl font-normal italic sm:text-4xl"
          style={{ color: "#F5EFE6" }}
        >
          Ci siamo persi per strada
        </h1>

        <p
          className="mt-4 max-w-md text-base leading-relaxed"
          style={{ color: "#D8E6E3" }}
        >
          La página que buscas no existe, pero Italia siempre tiene algo mejor
          esperándote.
        </p>

        {/* Back home */}
        <Link
          href="/"
          className="mt-10 inline-block rounded-sm px-8 py-3 text-sm font-medium tracking-widest uppercase transition-opacity hover:opacity-80"
          style={{ backgroundColor: "#D4573A", color: "#F5EFE6" }}
        >
          Volver al inicio
        </Link>

        {/* Portal grid */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {portals.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="rounded-sm border px-5 py-3 text-sm tracking-wide transition-colors hover:border-transparent"
              style={{
                borderColor: "#1A7A8A",
                color: "#D8E6E3",
              }}
            >
              {p.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
