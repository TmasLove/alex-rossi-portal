import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  published: boolean;
  published_at: string;
  created_at: string;
  geo_region: string;
  author: string;
};

async function getPost(slug: string): Promise<Post | null> {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return data ?? null;
}

async function getRelated(category: string, excludeId: string): Promise<Post[]> {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("category", category)
    .eq("published", true)
    .neq("id", excludeId)
    .order("published_at", { ascending: false })
    .limit(3);
  return data ?? [];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Post no encontrado" };

  return {
    title: `${post.title} — Alexandra Rossi`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.cover_image ? [{ url: post.cover_image }] : [],
      type: "article",
      publishedTime: post.published_at,
      authors: [post.author],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const related = await getRelated(post.category, post.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Alexandra Rossi",
      logo: {
        "@type": "ImageObject",
        url: "https://alexandrarossi.com/logo.png",
      },
    },
    datePublished: post.published_at,
    dateModified: post.updated_at ?? post.published_at,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main style={{ backgroundColor: "#F5EFE6" }}>
        {/* Cover image hero */}
        {post.cover_image && (
          <div
            className="relative w-full overflow-hidden"
            style={{ height: "60vh" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_image}
              alt={post.title}
              className="h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 40%, rgba(6,32,40,0.7) 100%)",
              }}
            />
          </div>
        )}

        {/* Article content */}
        <article className="mx-auto max-w-2xl px-6 py-16">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="rounded-sm px-3 py-1 text-xs font-medium tracking-widest uppercase"
              style={{ backgroundColor: "#D4573A", color: "#F5EFE6" }}
            >
              {post.category}
            </span>
            <span className="text-xs" style={{ color: "#7A9E8A" }}>
              {formatDate(post.published_at ?? post.created_at)}
            </span>
            <span className="text-xs" style={{ color: "#7A9E8A" }}>
              {post.author}
            </span>
          </div>

          <h1
            className="font-serif-custom mt-6 text-4xl italic leading-tight sm:text-5xl"
            style={{ color: "#0E3D45" }}
          >
            {post.title}
          </h1>

          {post.excerpt && (
            <p
              className="mt-4 text-lg leading-relaxed"
              style={{ color: "#1A7A8A" }}
            >
              {post.excerpt}
            </p>
          )}

          <div
            className="prose mt-10 max-w-none"
            style={{ color: "#0E3D45" }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Geo badge */}
          {post.geo_region && (
            <div className="mt-12 flex items-center gap-2">
              <span
                className="rounded-sm px-3 py-1 text-xs font-medium"
                style={{ backgroundColor: "#D8E6E3", color: "#0E3D45" }}
              >
                📍 {post.geo_region}
              </span>
            </div>
          )}

          {/* Back link */}
          <div className="mt-12 border-t pt-8" style={{ borderColor: "#D8E6E3" }}>
            <Link
              href="/blog"
              className="text-sm font-medium hover:underline"
              style={{ color: "#1A7A8A" }}
            >
              ← Volver al blog
            </Link>
          </div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section
            className="py-20"
            style={{ backgroundColor: "#0E3D45" }}
          >
            <div className="mx-auto max-w-5xl px-6">
              <h2
                className="font-serif-custom text-2xl italic"
                style={{ color: "#F5EFE6" }}
              >
                También te puede interesar
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/blog/${r.slug}`}
                    className="group block overflow-hidden rounded-sm"
                    style={{ backgroundColor: "#062028" }}
                  >
                    {r.cover_image && (
                      <div className="aspect-video overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={r.cover_image}
                          alt={r.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <span
                        className="text-xs font-medium tracking-wide"
                        style={{ color: "#D4573A" }}
                      >
                        {r.category}
                      </span>
                      <h3
                        className="font-serif-custom mt-1 text-lg italic leading-snug"
                        style={{ color: "#F5EFE6" }}
                      >
                        {r.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
