"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { supabase, Post, CATEGORIES, autoSlug } from "@/lib/supabase";
import { AlertCircle, Check, Trash2 } from "lucide-react";

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: CATEGORIES[0],
    cover_image: "",
    excerpt: "",
    content: "",
    geo_region: "",
    published: false,
  });
  const [loadingPost, setLoadingPost] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/admin"); return; }

      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (!data) { router.replace("/admin/dashboard"); return; }

      const p = data as Post;
      setForm({
        title: p.title,
        slug: p.slug,
        category: p.category,
        cover_image: p.cover_image ?? "",
        excerpt: p.excerpt ?? "",
        content: p.content ?? "",
        geo_region: p.geo_region ?? "",
        published: p.published,
      });
      setLoadingPost(false);
    }
    init();
  }, [id, router]);

  function set(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "El título es obligatorio.";
    if (!form.slug.trim()) e.slug = "El slug es obligatorio.";
    if (!form.content.trim()) e.content = "El contenido es obligatorio.";
    if (form.excerpt.length > 160) e.excerpt = "Máximo 160 caracteres.";
    return e;
  }

  async function save(publish: boolean) {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setSaving(true);
    const now = new Date().toISOString();

    const { error } = await supabase
      .from("posts")
      .update({
        title: form.title.trim(),
        slug: form.slug.trim(),
        category: form.category,
        cover_image: form.cover_image.trim(),
        excerpt: form.excerpt.trim(),
        content: form.content.trim(),
        geo_region: form.geo_region.trim(),
        published: publish,
        published_at: publish ? now : null,
        updated_at: now,
      })
      .eq("id", id);

    setSaving(false);

    if (error) { setErrors({ _global: error.message }); return; }

    setForm((prev) => ({ ...prev, published: publish }));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  }

  async function handleDelete() {
    if (!window.confirm("¿Eliminar este post permanentemente?")) return;
    setDeleting(true);
    await supabase.from("posts").delete().eq("id", id);
    router.replace("/admin/dashboard");
  }

  const inputCls =
    "w-full rounded-sm border px-4 py-3 text-sm outline-none focus:ring-1";
  const inputStyle = { borderColor: "#D8E6E3", color: "#0E3D45" };

  if (loadingPost) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: "#F5EFE6" }}>
        <div
          className="h-8 w-8 animate-spin rounded-full border-2"
          style={{ borderColor: "#D8E6E3", borderTopColor: "#1A7A8A" }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: "#F5EFE6" }}>
      {/* Nav */}
      <nav
        className="flex items-center justify-between border-b px-6 py-4"
        style={{ backgroundColor: "#FFFFFF", borderColor: "#D8E6E3" }}
      >
        <Link href="/admin/dashboard" className="text-sm hover:underline" style={{ color: "#1A7A8A" }}>
          ← Panel
        </Link>
        <span className="font-serif-custom italic" style={{ color: "#0E3D45" }}>
          Editar post
        </span>
        <div className="w-20" />
      </nav>

      <div className="mx-auto max-w-2xl px-6 py-10">
        {success && (
          <div
            className="mb-6 flex items-center gap-2 rounded-sm p-4 text-sm"
            style={{ backgroundColor: "#D8E6E3", color: "#0E3D45" }}
          >
            <Check size={15} />
            Cambios guardados correctamente.
          </div>
        )}

        {errors._global && (
          <div
            className="mb-6 flex items-center gap-2 rounded-sm p-4 text-sm"
            style={{ backgroundColor: "#D4573A15", color: "#D4573A" }}
          >
            <AlertCircle size={15} />
            {errors._global}
          </div>
        )}

        <div className="space-y-6">
          {/* Title */}
          <Field label="Título" error={errors.title}>
            <input
              type="text"
              className={inputCls}
              style={inputStyle}
              value={form.title}
              onChange={(e) => {
                set("title", e.target.value);
                set("slug", autoSlug(e.target.value));
              }}
            />
          </Field>

          {/* Slug */}
          <Field label="Slug (URL)" error={errors.slug}>
            <input
              type="text"
              className={inputCls}
              style={inputStyle}
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
            />
          </Field>

          {/* Category */}
          <Field label="Categoría">
            <select
              className={inputCls}
              style={inputStyle}
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>

          {/* Cover image */}
          <Field label="URL de imagen de portada">
            <input
              type="url"
              className={inputCls}
              style={inputStyle}
              placeholder="https://…"
              value={form.cover_image}
              onChange={(e) => set("cover_image", e.target.value)}
            />
            {form.cover_image && (
              <div className="mt-2 overflow-hidden rounded-sm" style={{ maxHeight: 160 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.cover_image} alt="Preview" className="h-full w-full object-cover" />
              </div>
            )}
          </Field>

          {/* Excerpt */}
          <Field label={`Extracto (${form.excerpt.length}/160)`} error={errors.excerpt}>
            <textarea
              rows={3}
              className={`${inputCls} resize-none`}
              style={inputStyle}
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              maxLength={160}
            />
          </Field>

          {/* Content */}
          <Field label="Contenido" error={errors.content}>
            <textarea
              rows={14}
              className={`${inputCls} resize-y`}
              style={inputStyle}
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
            />
          </Field>

          {/* Geo region */}
          <Field label="Región geográfica">
            <input
              type="text"
              className={inputCls}
              style={inputStyle}
              value={form.geo_region}
              onChange={(e) => set("geo_region", e.target.value)}
            />
          </Field>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4">
            <button
              onClick={() => save(false)}
              disabled={saving}
              className="rounded-sm border px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-50 disabled:opacity-50"
              style={{ borderColor: "#D8E6E3", color: "#0E3D45" }}
            >
              Guardar cambios
            </button>
            <button
              onClick={() => save(!form.published)}
              disabled={saving}
              className="rounded-sm px-6 py-3 text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-50"
              style={{ backgroundColor: form.published ? "#1A7A8A" : "#D4573A", color: "#F5EFE6" }}
            >
              {saving ? "Guardando…" : form.published ? "Despublicar" : "Publicar"}
            </button>
          </div>

          {/* Danger zone */}
          <div
            className="mt-10 rounded-sm border p-6"
            style={{ borderColor: "#D4573A30" }}
          >
            <p className="mb-3 text-sm font-medium" style={{ color: "#D4573A" }}>
              Zona de peligro
            </p>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-50"
              style={{ backgroundColor: "#D4573A", color: "#F5EFE6" }}
            >
              <Trash2 size={14} />
              {deleting ? "Eliminando…" : "Eliminar este post permanentemente"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium tracking-wide uppercase" style={{ color: "#7A9E8A" }}>
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs" style={{ color: "#D4573A" }}>{error}</p>}
    </div>
  );
}
