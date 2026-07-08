"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Users, Download, Trash2, Mail } from "lucide-react";

type Subscriber = {
  id: string;
  email: string;
  created_at: string;
};

export default function SubscribersPage() {
  const router = useRouter();
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/admin"); return; }
      await fetchSubs();
    }
    init();
  }, [router]);

  async function fetchSubs() {
    const { data } = await supabase
      .from("subscribers")
      .select("*")
      .order("created_at", { ascending: false });
    setSubs(data ?? []);
    setLoading(false);
  }

  async function handleDelete(id: string, email: string) {
    if (!window.confirm(`¿Eliminar "${email}" de la lista?`)) return;
    setDeletingId(id);
    await supabase.from("subscribers").delete().eq("id", id);
    setSubs((prev) => prev.filter((s) => s.id !== id));
    setDeletingId(null);
  }

  function exportCsv() {
    const rows = [["email", "fecha"], ...subs.map((s) => [s.email, formatDate(s.created_at)])];
    const csv = rows.map((r) => r.map((v) => `"${v.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "suscriptores.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("es-MX", { year: "numeric", month: "short", day: "numeric" });
  }

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: "#F5EFE6" }}>
      {/* Header */}
      <div className="relative overflow-hidden" style={{ backgroundColor: "#0E3D45" }}>
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: "radial-gradient(circle at 85% 0%, rgba(26,122,138,.3), transparent 55%)" }}
        />
        <div className="absolute top-0 left-0 right-0 h-[3px] flex">
          <div className="flex-1" style={{ backgroundColor: "#D4573A" }} />
          <div className="flex-1" style={{ backgroundColor: "#F5EFE6" }} />
          <div className="flex-1" style={{ backgroundColor: "#1A7A8A" }} />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-1.5 text-[.68rem] tracking-[.14em] uppercase font-semibold mb-4 transition-colors hover:text-[#E8795A]"
              style={{ color: "#7A9E8A" }}
            >
              <ArrowLeft size={13} /> Panel
            </Link>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(26,122,138,.15)", color: "#1A7A8A" }}>
                <Users size={15} />
              </span>
              <h1 className="font-serif-custom text-2xl italic" style={{ color: "#F5EFE6" }}>
                Suscriptores
              </h1>
            </div>
          </div>
          <button
            onClick={exportCsv}
            disabled={!subs.length}
            className="flex items-center gap-2 px-5 py-2.5 text-[.68rem] font-semibold tracking-[.15em] uppercase transition-colors hover:bg-[#E8795A] disabled:opacity-40 self-start"
            style={{ backgroundColor: "#D4573A", color: "#F5EFE6" }}
          >
            <Download size={14} />
            Exportar CSV
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Stat */}
        <div className="mb-10 max-w-xs p-6 text-center bg-white" style={{ borderTop: "2px solid #1A7A8A" }}>
          <Mail size={16} className="mx-auto mb-3" style={{ color: "#1A7A8A" }} />
          <p className="font-serif-custom text-4xl italic" style={{ color: "#0E3D45" }}>{subs.length}</p>
          <p className="mt-1.5 text-[.62rem] tracking-[.14em] uppercase font-medium" style={{ color: "#7A9E8A" }}>
            Total de suscriptores
          </p>
        </div>

        <h2 className="font-serif-custom text-xl italic mb-5" style={{ color: "#0E3D45" }}>
          Lista de correos
        </h2>

        {loading ? (
          <div className="py-20 text-center bg-white border border-[#D8E6E3]">
            <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2" style={{ borderColor: "#D8E6E3", borderTopColor: "#1A7A8A" }} />
          </div>
        ) : subs.length === 0 ? (
          <div className="py-20 text-center bg-white border border-[#D8E6E3]">
            <p className="text-sm" style={{ color: "#7A9E8A" }}>
              Aún no hay suscriptores al newsletter.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {subs.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between gap-4 bg-white px-5 py-4 border border-[#D8E6E3] hover:border-[#1A7A8A] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Mail size={15} style={{ color: "#7A9E8A" }} className="flex-shrink-0" />
                  <span className="text-sm font-medium truncate" style={{ color: "#0E3D45" }}>{s.email}</span>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="text-[.72rem]" style={{ color: "#7A9E8A" }}>{formatDate(s.created_at)}</span>
                  <button
                    onClick={() => handleDelete(s.id, s.email)}
                    disabled={deletingId === s.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[.65rem] font-semibold tracking-wide uppercase transition-opacity hover:opacity-80 disabled:opacity-40"
                    style={{ border: "1px solid rgba(212,87,58,.25)", color: "#D4573A", backgroundColor: "rgba(212,87,58,.06)" }}
                  >
                    <Trash2 size={12} />
                    {deletingId === s.id ? "…" : "Eliminar"}
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
