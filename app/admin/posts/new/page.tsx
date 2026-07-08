"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase, CATEGORIES, autoSlug } from "@/lib/supabase";
import { AlertCircle, Check } from "lucide-react";

export default function NewPostPage() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.replace("/admin");
    });
  }, [router]);

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  function set(field: string, value: string | boolean) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "title" && typeof value === "string") {
        next.slug = autoSlug(value);
      }
      return next;
    });
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

    const { error } = await supabase.from("posts").insert({
      title: form.title.trim(),
      slug: form.slug.trim(),
      category: form.category,
      cover_image: form.cover_image.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      geo_region: form.geo_region.trim(),
      published: publish,
      published_at: publish ? now : null,
      created_at: now,
      updated_at: now,
      author: "Alexandra Rossi",
    });

    setSaving(false);

    if (error) {
      setErrors({ _global: error.message });
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/admin/dashboard"), 1200);
  }

  const inputCls =
    "w-full rounded-sm border px-4 py-3 text-sm outline-none focus:ring-1";
  const inputStyle = { borderColor: "#D8E6E3", color: "#0E3D45" };

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: "#F5EFE6" }}>
      {/* Nav */}
      <nav
        className="flex items-center justify-between border-b px-6 py-4"
        style={{ backgroundColor: "#FFFFFF", borderColor: "#D8E6E3" }}
      >
        <Link
          href="/admin/dashboard"
          className="text-sm hover:underline"
          style={{ color: "#1A7A8A" }}
        >
          ← Panel
        </Link>
        <span className="font-serif-custom italic" style={{ color: "#0E3D45" }}>
          Nuevo post
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
            Post guardado correctamente. Redirigiendo…
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
              placeholder="El título del post"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </Field>

          {/* Slug */}
          <Field label="Slug (URL)" error={errors.slug}>
            <input
              type="text"
              className={inputCls}
              style={inputStyle}
              placeholder="mi-titulo-del-post"
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
                <img
                  src={form.cover_image}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </Field>

          {/* Excerpt */}
          <Field
            label={`Extracto (${form.excerpt.length}/160)`}
            error={errors.excerpt}
          >
            <textarea
              rows={3}
              className={`${inputCls} resize-none`}
              style={inputStyle}
              placeholder="Resumen breve para SEO y vistas previas…"
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              maxLength={160}
            />
          </Field>

          {/* Content */}
          <Field label="Contenido (HTML o texto)" error={errors.content}>
            <textarea
              rows={14}
              className={`${inputCls} resize-y`}
              style={inputStyle}
              placeholder="Escribe el contenido del post. Puedes usar HTML."
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
              placeholder="Italia, Toscana · México, CDMX"
              value={form.geo_region}
              onChange={(e) => set("geo_region", e.target.value)}
            />
          </Field>

          {/* Published toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => set("published", !form.published)}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
              style={{
                backgroundColor: form.published ? "#1A7A8A" : "#D8E6E3",
              }}
            >
              <span
                className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                style={{ transform: form.published ? "translateX(22px)" : "translateX(4px)" }}
              />
            </button>
            <span className="text-sm" style={{ color: "#0E3D45" }}>
              {form.published ? "Publicar inmediatamente" : "Guardar como borrador"}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => save(false)}
              disabled={saving || success}
              className="rounded-sm border px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-50 disabled:opacity-50"
              style={{ borderColor: "#D8E6E3", color: "#0E3D45" }}
            >
              Guardar como Borrador
            </button>
            <button
              onClick={() => save(true)}
              disabled={saving || success}
              className="rounded-sm px-6 py-3 text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-50"
              style={{ backgroundColor: "#D4573A", color: "#F5EFE6" }}
            >
              {saving ? "Guardando…" : "Publicar"}
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
      <label
        className="mb-1 block text-xs font-medium tracking-wide uppercase"
        style={{ color: "#7A9E8A" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs" style={{ color: "#D4573A" }}>
          {error}
        </p>
      )}
    </div>
  );
}
