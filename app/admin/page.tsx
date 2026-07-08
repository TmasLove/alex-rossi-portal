"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { AlertCircle, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      setError("Credenciales incorrectas. Por favor intenta de nuevo.");
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12"
      style={{ backgroundColor: "#062028" }}
    >
      {/* Ambient background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[.14]"
        style={{ backgroundImage: "url('https://alexandrarossi.com/wp-content/uploads/2021/02/Foto-Alexandra-Rossi-3.jpg')" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 20%, rgba(26,122,138,.25), transparent 60%), linear-gradient(to bottom, rgba(6,32,40,.4), rgba(6,32,40,.95))" }}
      />
      <div className="absolute top-0 left-0 right-0 h-[3px] flex">
        <div className="flex-1" style={{ backgroundColor: "#D4573A" }} />
        <div className="flex-1" style={{ backgroundColor: "#F5EFE6" }} />
        <div className="flex-1" style={{ backgroundColor: "#0E3D45" }} />
      </div>

      {/* Logo */}
      <div className="relative z-10 mb-10 text-center">
        <img
          src="https://alexandrarossi.com/wp-content/uploads/2021/02/LOGO-ALEXANDRA-ROSSI-White-1024x374.png"
          alt="Alexandra Rossi"
          className="h-8 w-auto mx-auto mb-4 opacity-90"
        />
        <p className="text-[.6rem] tracking-[.3em] uppercase font-medium" style={{ color: "#D4573A" }}>
          Panel de administración
        </p>
      </div>

      <div
        className="relative z-10 w-full max-w-sm p-9"
        style={{ backgroundColor: "#0E3D45", boxShadow: "0 30px 60px -20px rgba(0,0,0,.5)", border: "1px solid rgba(245,239,230,.08)" }}
      >
        <div className="flex items-center gap-3 mb-1">
          <span
            className="flex h-9 w-9 items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "rgba(212,87,58,.15)", color: "#D4573A" }}
          >
            <Lock size={15} />
          </span>
          <h1
            className="font-serif-custom text-2xl italic"
            style={{ color: "#F5EFE6" }}
          >
            Iniciar sesión
          </h1>
        </div>
        <p className="text-[.75rem] leading-relaxed mb-7 ml-12" style={{ color: "rgba(216,230,227,.55)" }}>
          Acceso exclusivo para el equipo editorial.
        </p>

        {error && (
          <div
            className="mb-5 flex items-center gap-2 p-3 text-sm"
            style={{ backgroundColor: "rgba(212,87,58,.12)", color: "#E8795A", border: "1px solid rgba(212,87,58,.25)" }}
          >
            <AlertCircle size={15} className="flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="mb-2 block text-[.62rem] tracking-[.2em] uppercase font-semibold"
              style={{ color: "#7A9E8A" }}
            >
              Correo electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-3 text-sm outline-none transition-colors focus:border-[#D4573A]"
              style={{ backgroundColor: "#062028", color: "#F5EFE6", borderColor: "rgba(216,230,227,.15)" }}
              placeholder="admin@alexandrarossi.com"
            />
          </div>
          <div>
            <label
              className="mb-2 block text-[.62rem] tracking-[.2em] uppercase font-semibold"
              style={{ color: "#7A9E8A" }}
            >
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-4 py-3 text-sm outline-none transition-colors focus:border-[#D4573A]"
              style={{ backgroundColor: "#062028", color: "#F5EFE6", borderColor: "rgba(216,230,227,.15)" }}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-3.5 text-[.68rem] font-semibold tracking-[.2em] uppercase transition-colors hover:bg-[#E8795A] disabled:opacity-50"
            style={{ backgroundColor: "#D4573A", color: "#F5EFE6" }}
          >
            {loading ? "Accediendo…" : "Entrar"}
          </button>
        </form>
      </div>

      <p className="relative z-10 mt-8 text-[.6rem] tracking-[.15em] uppercase" style={{ color: "rgba(216,230,227,.25)" }}>
        alexandrarossi.com
      </p>
    </div>
  );
}
