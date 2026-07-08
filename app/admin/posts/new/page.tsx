"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase, CATEGORIES, autoSlug } from "@/lib/supabase";
import { AlertCircle, Check, ArrowLeft, FileEdit } from "lucide-react";

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
    const { data: { user } } = await supabase.auth.getUser();
    const meta = user?.user_metadata ?? {};

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
      author: meta.display_name ?? "Alexandra Rossi",
      author_avatar: meta.avatar_url ?? "",
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
    "w-full border px-4 py-3 text-sm outline-none transition-colors focus:border-[#1A7A8A]";
  const inputStyle = { borderColor: "#D8E6E3", color: "#0E3D45", backgroundColor: "#FAFAF7" };

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: "#F5EFE6" }}>
      {/* Header */}
      <div className="relative overflow-hidden" style={{ backgroundColor: "#0E3D45" }}>
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: "radial-gradient(circle at 85% 0%, rgba(212,87,58,.3), transparent 55%)" }}
        />
        <div className="absolute top-0 left-0 right-0 h-[3px] flex">
          <div className="flex-1" style={{ backgroundColor: "#D4573A" }} />
          <div className="flex-1" style={{ backgroundColor: "#F5EFE6" }} />
          <div className="flex-1" style={{ backgroundColor: "#1A7A8A" }} />
        </div>
        <div className="relative z-10 mx-auto max-w-2xl px-6 py-8">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-1.5 text-[.68rem] tracking-[.14em] uppercase font-semibold mb-4 transition-colors hover:text-[#E8795A]"
            style={{ color: "#7A9E8A" }}
          >
            <ArrowLeft size={13} /> Panel
          </Link>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(212,87,58,.15)", color: "#D4573A" }}>
              <FileEdit size={15} />
            </span>
            <h1 className="font-serif-custom text-2xl italic" style={{ color: "#F5EFE6" }}>
              Nuevo post
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-10">
        {success && (
          <div
            className="mb-6 flex items-center gap-2 p-4 text-sm"
            style={{ backgroundColor: "rgba(26,122,138,.1)", color: "#0E3D45", border: "1px solid rgba(26,122,138,.25)" }}
          >
            <Check size={15} />
            Post guardado correctamente. Redirigiendo…
          </div>
        )}

        {errors._global && (
          <div
            className="mb-6 flex items-center gap-2 p-4 text-sm"
            style={{ backgroundColor: "rgba(212,87,58,.1)", color: "#D4573A", border: "1px solid rgba(212,87,58,.25)" }}
          >
            <AlertCircle size={15} />
            {errors._global}
          </div>
        )}

        <div className="bg-white p-8" style={{ border: "1px solid #D8E6E3" }}>
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
          <div className="flex items-center gap-3 p-4" style={{ backgroundColor: "#F5EFE6" }}>
            <button
              type="button"
              onClick={() => set("published", !form.published)}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0"
              style={{
                backgroundColor: form.published ? "#1A7A8A" : "#D8E6E3",
              }}
            >
              <span
                className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                style={{ transform: form.published ? "translateX(22px)" : "translateX(4px)" }}
              />
            </button>
            <span className="text-sm font-medium" style={{ color: "#0E3D45" }}>
              {form.published ? "Se publicará inmediatamente" : "Se guardará como borrador"}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => save(false)}
              disabled={saving || success}
              className="px-6 py-3 text-[.68rem] font-semibold tracking-[.14em] uppercase transition-colors hover:border-[#0E3D45] disabled:opacity-50"
              style={{ border: "1px solid #D8E6E3", color: "#0E3D45" }}
            >
              Guardar como Borrador
            </button>
            <button
              onClick={() => save(true)}
              disabled={saving || success}
              className="px-6 py-3 text-[.68rem] font-semibold tracking-[.14em] uppercase transition-colors hover:bg-[#E8795A] disabled:opacity-50"
              style={{ backgroundColor: "#D4573A", color: "#F5EFE6" }}
            >
              {saving ? "Guardando…" : "Publicar"}
            </button>
          </div>
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
        className="mb-2 block text-[.62rem] font-semibold tracking-[.16em] uppercase"
        style={{ color: "#1A7A8A" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs" style={{ color: "#D4573A" }}>
          {error}
        </p>
      )}
    </div>
  );
}
