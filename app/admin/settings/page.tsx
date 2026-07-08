"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase, ACCENT_COLORS } from "@/lib/supabase";
import { ArrowLeft, Settings, AlertCircle, Check, User } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [greeting, setGreeting] = useState("");
  const [accent, setAccent] = useState("coral");
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/admin"); return; }
      setEmail(user.email ?? "");
      const meta = user.user_metadata ?? {};
      setDisplayName(meta.display_name ?? "Alexandra Rossi");
      setAvatarUrl(meta.avatar_url ?? "");
      setGreeting(meta.greeting ?? "");
      setAccent(meta.accent ?? "coral");
    }
    init();
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setSaving(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setPassword("");
    setConfirm("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  }

  async function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault();
    setProfileError("");
    setProfileSuccess(false);
    setSavingProfile(true);

    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        display_name: displayName.trim() || "Alexandra Rossi",
        avatar_url: avatarUrl.trim(),
        greeting: greeting.trim(),
        accent,
      },
    });

    setSavingProfile(false);

    if (updateError) {
      setProfileError(updateError.message);
      return;
    }

    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 4000);
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
          style={{ background: "radial-gradient(circle at 85% 0%, rgba(122,158,138,.3), transparent 55%)" }}
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
            <span className="flex h-9 w-9 items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(122,158,138,.18)", color: "#7A9E8A" }}>
              <Settings size={15} />
            </span>
            <h1 className="font-serif-custom text-2xl italic" style={{ color: "#F5EFE6" }}>
              Ajustes
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
            Contraseña actualizada correctamente.
          </div>
        )}
        {error && (
          <div
            className="mb-6 flex items-center gap-2 p-4 text-sm"
            style={{ backgroundColor: "rgba(212,87,58,.1)", color: "#D4573A", border: "1px solid rgba(212,87,58,.25)" }}
          >
            <AlertCircle size={15} />
            {error}
          </div>
        )}

        {profileSuccess && (
          <div
            className="mb-6 flex items-center gap-2 p-4 text-sm"
            style={{ backgroundColor: "rgba(26,122,138,.1)", color: "#0E3D45", border: "1px solid rgba(26,122,138,.25)" }}
          >
            <Check size={15} />
            Perfil actualizado correctamente.
          </div>
        )}
        {profileError && (
          <div
            className="mb-6 flex items-center gap-2 p-4 text-sm"
            style={{ backgroundColor: "rgba(212,87,58,.1)", color: "#D4573A", border: "1px solid rgba(212,87,58,.25)" }}
          >
            <AlertCircle size={15} />
            {profileError}
          </div>
        )}

        {/* Profile card */}
        <div className="bg-white p-8 mb-8" style={{ border: "1px solid #D8E6E3" }}>
          <p className="text-[.62rem] tracking-[.16em] uppercase font-semibold mb-2" style={{ color: "#1A7A8A" }}>
            Perfil
          </p>
          <p className="text-sm mb-8" style={{ color: "#5A7A80" }}>
            Así te verá el panel — y cómo apareces cuando publicas un post.
          </p>

          <form onSubmit={handleProfileSubmit} className="space-y-6">
            {/* Avatar preview + url */}
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: "#D8E6E3" }}
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User size={22} style={{ color: "#7A9E8A" }} />
                )}
              </div>
              <div className="flex-1">
                <label className="mb-2 block text-[.62rem] font-semibold tracking-[.16em] uppercase" style={{ color: "#1A7A8A" }}>
                  URL de tu foto de perfil
                </label>
                <input
                  type="url"
                  className={inputCls}
                  style={inputStyle}
                  placeholder="https://…"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[.62rem] font-semibold tracking-[.16em] uppercase" style={{ color: "#1A7A8A" }}>
                Nombre para mostrar
              </label>
              <input
                type="text"
                className={inputCls}
                style={inputStyle}
                placeholder="Alexandra Rossi"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-[.62rem] font-semibold tracking-[.16em] uppercase" style={{ color: "#1A7A8A" }}>
                Saludo personalizado (aparece en tu panel)
              </label>
              <input
                type="text"
                className={inputCls}
                style={inputStyle}
                placeholder="Ej. Lista para crear algo hermoso hoy"
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
                maxLength={60}
              />
            </div>

            <div>
              <label className="mb-3 block text-[.62rem] font-semibold tracking-[.16em] uppercase" style={{ color: "#1A7A8A" }}>
                Color de acento de tu panel
              </label>
              <div className="flex gap-3">
                {Object.entries(ACCENT_COLORS).map(([key, hex]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setAccent(key)}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                    style={{
                      backgroundColor: hex,
                      boxShadow: accent === key ? `0 0 0 3px #F5EFE6, 0 0 0 5px ${hex}` : "none",
                    }}
                    aria-label={key}
                  >
                    {accent === key && <Check size={16} className="text-white" />}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={savingProfile}
              className="px-6 py-3 text-[.68rem] font-semibold tracking-[.14em] uppercase transition-colors hover:bg-[#E8795A] disabled:opacity-50"
              style={{ backgroundColor: "#D4573A", color: "#F5EFE6" }}
            >
              {savingProfile ? "Guardando…" : "Guardar perfil"}
            </button>
          </form>
        </div>

        <div className="bg-white p-8" style={{ border: "1px solid #D8E6E3" }}>
          <p className="text-[.62rem] tracking-[.16em] uppercase font-semibold mb-2" style={{ color: "#1A7A8A" }}>
            Cuenta
          </p>
          <p className="text-sm mb-8" style={{ color: "#5A7A80" }}>{email}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-[.62rem] font-semibold tracking-[.16em] uppercase" style={{ color: "#1A7A8A" }}>
                Nueva contraseña
              </label>
              <input
                type="password"
                required
                minLength={8}
                className={inputCls}
                style={inputStyle}
                placeholder="Mínimo 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-[.62rem] font-semibold tracking-[.16em] uppercase" style={{ color: "#1A7A8A" }}>
                Confirmar contraseña
              </label>
              <input
                type="password"
                required
                minLength={8}
                className={inputCls}
                style={inputStyle}
                placeholder="Repite la contraseña"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 text-[.68rem] font-semibold tracking-[.14em] uppercase transition-colors hover:bg-[#E8795A] disabled:opacity-50"
              style={{ backgroundColor: "#D4573A", color: "#F5EFE6" }}
            >
              {saving ? "Guardando…" : "Actualizar contraseña"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
