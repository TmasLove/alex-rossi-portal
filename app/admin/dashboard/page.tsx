"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase, Post } from "@/lib/supabase";
import { Plus, Edit2, Trash2, LogOut } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/admin");
        return;
      }
      await fetchPosts();
    }
    init();
  }, [router]);

  async function fetchPosts() {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts(data ?? []);
    setLoading(false);
  }

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`¿Eliminar "${title}"? Esta acción no se puede deshacer.`)) return;
    setDeletingId(id);
    await supabase.from("posts").delete().eq("id", id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setDeletingId(null);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace("/admin");
  }

  const published = posts.filter((p) => p.published).length;
  const drafts = posts.filter((p) => !p.published).length;

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5EFE6" }}>
      {/* Top nav */}
      <nav
        className="flex items-center justify-between border-b px-6 py-4"
        style={{ backgroundColor: "#FFFFFF", borderColor: "#D8E6E3" }}
      >
        <span className="font-serif-custom text-lg italic" style={{ color: "#0E3D45" }}>
          Alexandra Rossi · Admin
        </span>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts/new"
            className="flex items-center gap-2 rounded-sm px-5 py-2 text-sm font-medium transition-opacity hover:opacity-80"
            style={{ backgroundColor: "#D4573A", color: "#F5EFE6" }}
          >
            <Plus size={15} />
            Nuevo Post
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-sm border px-4 py-2 text-sm transition-colors hover:bg-gray-50"
            style={{ borderColor: "#D8E6E3", color: "#0E3D45" }}
          >
            <LogOut size={14} />
            Cerrar sesión
          </button>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Stats */}
        <div className="mb-10 grid grid-cols-3 gap-4">
          {[
            { label: "Total de posts", value: posts.length },
            { label: "Publicados", value: published },
            { label: "Borradores", value: drafts },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-sm p-6 text-center"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #D8E6E3" }}
            >
              <p
                className="font-serif-custom text-4xl italic"
                style={{ color: "#0E3D45" }}
              >
                {s.value}
              </p>
              <p className="mt-1 text-xs tracking-wide" style={{ color: "#7A9E8A" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Posts table */}
        <div
          className="overflow-hidden rounded-sm"
          style={{ border: "1px solid #D8E6E3" }}
        >
          <div
            className="px-6 py-4"
            style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #D8E6E3" }}
          >
            <h2 className="text-sm font-medium" style={{ color: "#0E3D45" }}>
              Todos los posts
            </h2>
          </div>

          {loading ? (
            <div className="py-16 text-center" style={{ backgroundColor: "#FFFFFF" }}>
              <div
                className="mx-auto h-6 w-6 animate-spin rounded-full border-2"
                style={{ borderColor: "#D8E6E3", borderTopColor: "#1A7A8A" }}
              />
            </div>
          ) : posts.length === 0 ? (
            <div className="py-16 text-center" style={{ backgroundColor: "#FFFFFF" }}>
              <p className="text-sm" style={{ color: "#7A9E8A" }}>
                No hay posts aún.{" "}
                <Link href="/admin/posts/new" style={{ color: "#D4573A" }}>
                  Crea el primero.
                </Link>
              </p>
            </div>
          ) : (
            <table className="w-full" style={{ backgroundColor: "#FFFFFF" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #D8E6E3" }}>
                  {["Título", "Categoría", "Estado", "Fecha", "Acciones"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-6 py-3 text-left text-xs font-medium tracking-wide uppercase"
                        style={{ color: "#7A9E8A" }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {posts.map((post, i) => (
                  <tr
                    key={post.id}
                    style={{
                      borderBottom:
                        i < posts.length - 1 ? "1px solid #D8E6E3" : "none",
                    }}
                  >
                    <td className="px-6 py-4">
                      <span
                        className="font-medium text-sm line-clamp-1"
                        style={{ color: "#0E3D45" }}
                      >
                        {post.title}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm" style={{ color: "#1A7A8A" }}>
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="rounded-sm px-2 py-1 text-xs font-medium"
                        style={
                          post.published
                            ? { backgroundColor: "#D8E6E3", color: "#0E3D45" }
                            : { backgroundColor: "#F5EFE6", color: "#7A9E8A", border: "1px solid #D8E6E3" }
                        }
                      >
                        {post.published ? "Publicado" : "Borrador"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs" style={{ color: "#7A9E8A" }}>
                        {formatDate(post.created_at)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/posts/${post.id}`}
                          className="flex items-center gap-1 rounded-sm px-3 py-1.5 text-xs transition-colors hover:bg-gray-50"
                          style={{ border: "1px solid #D8E6E3", color: "#0E3D45" }}
                        >
                          <Edit2 size={12} />
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          disabled={deletingId === post.id}
                          className="flex items-center gap-1 rounded-sm px-3 py-1.5 text-xs transition-colors hover:opacity-80 disabled:opacity-40"
                          style={{
                            border: "1px solid #D4573A20",
                            color: "#D4573A",
                            backgroundColor: "#D4573A10",
                          }}
                        >
                          <Trash2 size={12} />
                          {deletingId === post.id ? "…" : "Eliminar"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
