"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase, Post, CATEGORIES } from "@/lib/supabase";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("Todos");

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false });
      setPosts(data ?? []);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  const filtered =
    activeCategory === "Todos"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const featured = filtered[0] ?? null;
  const rest = filtered.slice(1);

  return (
    <main style={{ backgroundColor: "#F5EFE6", minHeight: "100vh" }}>
      {/* Page header */}
      <section
        className="py-20 text-center"
        style={{ backgroundColor: "#0E3D45" }}
      >
        <span
          className="text-xs font-medium tracking-widest uppercase"
          style={{ color: "#D4573A" }}
        >
          El blog de Alexandra
        </span>
        <h1
          className="font-serif-custom mt-3 text-5xl italic"
          style={{ color: "#F5EFE6" }}
        >
          Notas desde Italia
        </h1>
        <p className="mt-3 text-sm" style={{ color: "#D8E6E3" }}>
          Historias, recetas, diseño y la vida bella.
        </p>
      </section>

      {/* Category filter */}
      <section
        className="sticky top-0 z-10 border-b py-4"
        style={{ backgroundColor: "#F5EFE6", borderColor: "#D8E6E3" }}
      >
        <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-6">
          {["Todos", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="rounded-sm px-4 py-1.5 text-xs font-medium tracking-wide transition-colors"
              style={
                activeCategory === cat
                  ? { backgroundColor: "#0E3D45", color: "#F5EFE6" }
                  : { backgroundColor: "#D8E6E3", color: "#0E3D45" }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16">
        {loading ? (
          <div className="py-24 text-center">
            <div
              className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"
              style={{ borderColor: "#1A7A8A", borderTopColor: "transparent" }}
            />
          </div>
        ) : filtered.length === 0 ? (
          /* Empty state */
          <div className="py-32 text-center">
            <p
              className="font-serif-custom text-4xl italic"
              style={{ color: "#D4573A" }}
            >
              Próximamente
            </p>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: "#0E3D45" }}
            >
              Alexandra está escribiendo algo especial.
              <br />
              Vuelve pronto.
            </p>
          </div>
        ) : (
          <>
            {/* Featured hero post */}
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="group mb-16 block overflow-hidden rounded-sm"
                style={{ backgroundColor: "#0E3D45" }}
              >
                <div className="grid md:grid-cols-2">
                  {featured.cover_image && (
                    <div className="relative aspect-video md:aspect-auto md:min-h-[400px] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={featured.cover_image}
                        alt={featured.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-col justify-center p-10">
                    <span
                      className="text-xs font-medium tracking-widest uppercase"
                      style={{ color: "#D4573A" }}
                    >
                      {featured.category}
                    </span>
                    <h2
                      className="font-serif-custom mt-3 text-3xl italic leading-snug"
                      style={{ color: "#F5EFE6" }}
                    >
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="mt-4 text-sm leading-relaxed line-clamp-3" style={{ color: "#D8E6E3" }}>
                        {featured.excerpt}
                      </p>
                    )}
                    <div className="mt-6 flex items-center gap-4">
                      <span className="text-xs" style={{ color: "#7A9E8A" }}>
                        {formatDate(featured.published_at ?? featured.created_at)}
                      </span>
                      <span
                        className="text-xs font-medium underline-offset-2 group-hover:underline"
                        style={{ color: "#D4573A" }}
                      >
                        Leer más →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Post grid */}
            {rest.length > 0 && (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col overflow-hidden rounded-sm"
                    style={{ backgroundColor: "#FFFFFF" }}
                  >
                    {post.cover_image && (
                      <div className="relative aspect-video overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <span
                        className="text-xs font-medium tracking-widest uppercase"
                        style={{ color: "#D4573A" }}
                      >
                        {post.category}
                      </span>
                      <h3
                        className="font-serif-custom mt-2 text-xl italic leading-snug"
                        style={{ color: "#0E3D45" }}
                      >
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p
                          className="mt-3 flex-1 text-sm leading-relaxed line-clamp-3"
                          style={{ color: "#0E3D45" }}
                        >
                          {post.excerpt}
                        </p>
                      )}
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs" style={{ color: "#7A9E8A" }}>
                          {formatDate(post.published_at ?? post.created_at)}
                        </span>
                        <span
                          className="text-xs font-medium"
                          style={{ color: "#1A7A8A" }}
                        >
                          Leer más →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
