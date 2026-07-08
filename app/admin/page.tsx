"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { AlertCircle } from "lucide-react";

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
      className="flex min-h-screen flex-col items-center justify-center px-6 py-12"
      style={{ backgroundColor: "#062028" }}
    >
      {/* Logo */}
      <div className="mb-8 text-center">
        <p
          className="font-serif-custom text-3xl italic"
          style={{ color: "#F5EFE6" }}
        >
          Alexandra Rossi
        </p>
        <p className="mt-1 text-xs tracking-widest uppercase" style={{ color: "#7A9E8A" }}>
          Panel de administración
        </p>
      </div>

      <div
        className="w-full max-w-sm rounded-sm p-8"
        style={{ backgroundColor: "#0E3D45" }}
      >
        <h1
          className="font-serif-custom mb-6 text-xl italic"
          style={{ color: "#F5EFE6" }}
        >
          Iniciar sesión
        </h1>

        {error && (
          <div
            className="mb-5 flex items-center gap-2 rounded-sm p-3 text-sm"
            style={{ backgroundColor: "#D4573A20", color: "#D4573A" }}
          >
            <AlertCircle size={15} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="mb-1 block text-xs tracking-widest uppercase"
              style={{ color: "#D8E6E3" }}
            >
              Correo electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm border-0 px-4 py-3 text-sm outline-none"
              style={{ backgroundColor: "#062028", color: "#F5EFE6" }}
              placeholder="admin@alexandrarossi.com"
            />
          </div>
          <div>
            <label
              className="mb-1 block text-xs tracking-widest uppercase"
              style={{ color: "#D8E6E3" }}
            >
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border-0 px-4 py-3 text-sm outline-none"
              style={{ backgroundColor: "#062028", color: "#F5EFE6" }}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-sm py-3 text-sm font-medium tracking-widest uppercase transition-opacity hover:opacity-80 disabled:opacity-50"
            style={{ backgroundColor: "#D4573A", color: "#F5EFE6" }}
          >
            {loading ? "Accediendo…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
