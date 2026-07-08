"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase, Post, ACCENT_COLORS } from "@/lib/supabase";
import { Plus, Edit2, Trash2, LogOut, FileText, Eye, EyeOff, Users, Settings, User } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("Alexandra");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [greeting, setGreeting] = useState("");
  const [accent, setAccent] = useState("coral");

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/admin");
        return;
      }
      const meta = user.user_metadata ?? {};
      setDisplayName((meta.display_name ?? "Alexandra Rossi").split(" ")[0]);
      setAvatarUrl(meta.avatar_url ?? "");
      setGreeting(meta.greeting ?? "");
      setAccent(meta.accent ?? "coral");
      await fetchPosts();
    }
    init();
  }, [router]);

  const accentHex = ACCENT_COLORS[accent] ?? ACCENT_COLORS.coral;

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
      {/* Gradient header */}
      <div className="relative overflow-hidden" style={{ backgroundColor: "#0E3D45" }}>
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: `radial-gradient(circle at 15% 0%, ${accentHex}59, transparent 55%)` }}
        />
        <div className="absolute top-0 left-0 right-0 h-[3px] flex">
          <div className="flex-1" style={{ backgroundColor: "#D4573A" }} />
          <div className="flex-1" style={{ backgroundColor: "#F5EFE6" }} />
          <div className="flex-1" style={{ backgroundColor: "#1A7A8A" }} />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: "rgba(245,239,230,.12)" }}
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <User size={22} style={{ color: "#D8E6E3" }} />
              )}
            </div>
            <div>
              <p className="text-[.58rem] tracking-[.24em] uppercase font-semibold mb-1" style={{ color: accentHex }}>
                Panel de administración
              </p>
              <h1 className="font-serif-custom text-3xl italic" style={{ color: "#F5EFE6" }}>
                Bienvenida, {displayName}
              </h1>
              {greeting && (
                <p className="text-[.78rem] mt-1" style={{ color: "#D8E6E3" }}>
                  {greeting}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/admin/subscribers"
              className="flex items-center gap-2 px-4 py-2.5 text-[.68rem] font-semibold tracking-[.15em] uppercase transition-colors hover:border-[#E8795A] hover:text-[#E8795A]"
              style={{ border: "1px solid rgba(245,239,230,.25)", color: "#D8E6E3" }}
            >
              <Users size={13} />
              Suscriptores
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-2 px-4 py-2.5 text-[.68rem] font-semibold tracking-[.15em] uppercase transition-colors hover:border-[#E8795A] hover:text-[#E8795A]"
              style={{ border: "1px solid rgba(245,239,230,.25)", color: "#D8E6E3" }}
            >
              <Settings size={13} />
              Ajustes
            </Link>
            <Link
              href="/admin/posts/new"
              className="flex items-center gap-2 px-5 py-2.5 text-[.68rem] font-semibold tracking-[.15em] uppercase transition-opacity hover:opacity-85"
              style={{ backgroundColor: accentHex, color: "#F5EFE6" }}
            >
              <Plus size={14} />
              Nuevo Post
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2.5 text-[.68rem] font-semibold tracking-[.15em] uppercase transition-colors"
              style={{ border: "1px solid rgba(245,239,230,.25)", color: "#D8E6E3" }}
            >
              <LogOut size={13} />
              Salir
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Stats */}
        <div className="mb-12 grid grid-cols-3 gap-4">
          {[
            { label: "Total de posts", value: posts.length, icon: FileText, color: "#0E3D45" },
            { label: "Publicados",     value: published,    icon: Eye,      color: "#1A7A8A" },
            { label: "Borradores",     value: drafts,        icon: EyeOff,   color: "#D4573A" },
          ].map((s) => (
            <div
              key={s.label}
              className="p-6 text-center bg-white"
              style={{ borderTop: `2px solid ${s.color}` }}
            >
              <s.icon size={16} className="mx-auto mb-3" style={{ color: s.color }} />
              <p
                className="font-serif-custom text-4xl italic"
                style={{ color: "#0E3D45" }}
              >
                {s.value}
              </p>
              <p className="mt-1.5 text-[.62rem] tracking-[.14em] uppercase font-medium" style={{ color: "#7A9E8A" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Posts list */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif-custom text-xl italic" style={{ color: "#0E3D45" }}>
            Todos los posts
          </h2>
        </div>

        {loading ? (
          <div className="py-20 text-center bg-white border border-[#D8E6E3]">
            <div
              className="mx-auto h-6 w-6 animate-spin rounded-full border-2"
              style={{ borderColor: "#D8E6E3", borderTopColor: "#1A7A8A" }}
            />
          </div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center bg-white border border-[#D8E6E3]">
            <p className="text-sm" style={{ color: "#7A9E8A" }}>
              No hay posts aún.{" "}
              <Link href="/admin/posts/new" className="font-semibold" style={{ color: "#D4573A" }}>
                Crea el primero.
              </Link>
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-5 border border-[#D8E6E3] hover:border-[#D4573A] transition-colors"
              >
                {/* Cover thumbnail */}
                <div className="w-full sm:w-20 h-20 flex-shrink-0 overflow-hidden" style={{ backgroundColor: "#D8E6E3" }}>
                  {post.cover_image ? (
                    <img src={post.cover_image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText size={18} style={{ color: "#7A9E8A" }} />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span
                      className="text-[.58rem] tracking-[.12em] uppercase font-bold px-2 py-0.5"
                      style={
                        post.published
                          ? { backgroundColor: "rgba(26,122,138,.12)", color: "#1A7A8A" }
                          : { backgroundColor: "rgba(212,87,58,.1)", color: "#D4573A" }
                      }
                    >
                      {post.published ? "Publicado" : "Borrador"}
                    </span>
                    <span className="text-[.68rem] uppercase tracking-wide" style={{ color: "#7A9E8A" }}>
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-serif-custom text-lg italic truncate" style={{ color: "#0E3D45" }}>
                    {post.title}
                  </h3>
                  <p className="text-[.72rem] mt-0.5" style={{ color: "#7A9E8A" }}>
                    {formatDate(post.created_at)}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="flex items-center gap-1.5 px-4 py-2 text-[.68rem] font-semibold tracking-wide uppercase transition-colors hover:border-[#0E3D45]"
                    style={{ border: "1px solid #D8E6E3", color: "#0E3D45" }}
                  >
                    <Edit2 size={12} />
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    disabled={deletingId === post.id}
                    className="flex items-center gap-1.5 px-4 py-2 text-[.68rem] font-semibold tracking-wide uppercase transition-opacity hover:opacity-80 disabled:opacity-40"
                    style={{
                      border: "1px solid rgba(212,87,58,.25)",
                      color: "#D4573A",
                      backgroundColor: "rgba(212,87,58,.06)",
                    }}
                  >
                    <Trash2 size={12} />
                    {deletingId === post.id ? "…" : "Eliminar"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
