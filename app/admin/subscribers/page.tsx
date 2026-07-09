"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Users, Download, Trash2, Mail, Globe, Monitor, MapPin, ChevronDown, Repeat } from "lucide-react";

type Subscriber = {
  id: string;
  email: string;
  created_at: string;
  last_seen_at?: string;
  visit_count?: number;
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
  page_path?: string;
};

const PAGE_NAMES: Record<string, string> = {
  "/": "Inicio",
  "/mi-perfil": "Mi Perfil",
  "/la-dolce-vita": "La Dolce Vita",
  "/la-dolce-vita-italia": "La Dolce Vita Italia",
  "/italia": "Italia",
  "/colecciones": "Colecciones",
  "/casa": "Casa",
  "/suplementos": "Suplementos",
  "/tienda": "Tienda (Próximamente)",
  "/contacto": "Contacto",
  "/prensa": "Prensa",
  "/blog": "Blog",
};

function parsePageName(path?: string) {
  if (!path) return "—";
  if (PAGE_NAMES[path]) return PAGE_NAMES[path];
  if (path.startsWith("/blog/")) return `Blog — ${path.replace("/blog/", "")}`;
  return path;
}

function parseDevice(ua?: string) {
  if (!ua) return "—";
  const browser =
    /Edg\//.test(ua) ? "Edge" :
    /Chrome\//.test(ua) ? "Chrome" :
    /Safari\//.test(ua) && !/Chrome/.test(ua) ? "Safari" :
    /Firefox\//.test(ua) ? "Firefox" : "Navegador";
  const os =
    /iPhone|iPad/.test(ua) ? "iOS" :
    /Android/.test(ua) ? "Android" :
    /Mac OS/.test(ua) ? "macOS" :
    /Windows/.test(ua) ? "Windows" :
    /Linux/.test(ua) ? "Linux" : "";
  return [browser, os].filter(Boolean).join(" · ");
}

export default function SubscribersPage() {
  const router = useRouter();
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
    const rows = [
      ["email", "fecha de registro", "última visita", "visitas", "ip", "dispositivo", "última página", "referrer"],
      ...subs.map((s) => [
        s.email,
        formatDate(s.created_at),
        s.last_seen_at ? formatDate(s.last_seen_at) : formatDate(s.created_at),
        String(s.visit_count ?? 1),
        s.ip_address ?? "",
        parseDevice(s.user_agent),
        parsePageName(s.page_path),
        s.referrer ?? "",
      ]),
    ];
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
            {subs.map((s) => {
              const isOpen = expandedId === s.id;
              return (
                <div key={s.id} className="bg-white border border-[#D8E6E3] hover:border-[#1A7A8A] transition-colors">
                  <button
                    onClick={() => setExpandedId(isOpen ? null : s.id)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Mail size={15} style={{ color: "#7A9E8A" }} className="flex-shrink-0" />
                      <span className="text-sm font-medium truncate" style={{ color: "#0E3D45" }}>{s.email}</span>
                      {(s.visit_count ?? 1) > 1 && (
                        <span
                          className="flex items-center gap-1 text-[.58rem] tracking-[.1em] uppercase font-bold px-2 py-0.5 flex-shrink-0"
                          style={{ backgroundColor: "rgba(122,158,138,.15)", color: "#7A9E8A" }}
                        >
                          <Repeat size={10} /> {s.visit_count}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="text-[.72rem]" style={{ color: "#7A9E8A" }}>{formatDate(s.created_at)}</span>
                      <ChevronDown
                        size={15}
                        style={{ color: "#7A9E8A", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-[#D8E6E3]">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-[.6rem] tracking-[.12em] uppercase font-semibold" style={{ color: "#7A9E8A" }}>Registrada el</p>
                          <p className="text-[.8rem]" style={{ color: "#0E3D45" }}>{formatDate(s.created_at)}</p>
                        </div>
                        <div>
                          <p className="text-[.6rem] tracking-[.12em] uppercase font-semibold" style={{ color: "#7A9E8A" }}>Última visita</p>
                          <p className="text-[.8rem]" style={{ color: "#0E3D45" }}>{s.last_seen_at ? formatDate(s.last_seen_at) : formatDate(s.created_at)}</p>
                        </div>
                        <div>
                          <p className="text-[.6rem] tracking-[.12em] uppercase font-semibold" style={{ color: "#7A9E8A" }}>Visitas</p>
                          <p className="text-[.8rem]" style={{ color: "#0E3D45" }}>{s.visit_count ?? 1}</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Globe size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#1A7A8A" }} />
                          <div>
                            <p className="text-[.6rem] tracking-[.12em] uppercase font-semibold" style={{ color: "#7A9E8A" }}>Dirección IP</p>
                            <p className="text-[.8rem]" style={{ color: "#0E3D45" }}>{s.ip_address || "—"}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Monitor size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#1A7A8A" }} />
                          <div>
                            <p className="text-[.6rem] tracking-[.12em] uppercase font-semibold" style={{ color: "#7A9E8A" }}>Dispositivo</p>
                            <p className="text-[.8rem]" style={{ color: "#0E3D45" }}>{parseDevice(s.user_agent)}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#1A7A8A" }} />
                          <div>
                            <p className="text-[.6rem] tracking-[.12em] uppercase font-semibold" style={{ color: "#7A9E8A" }}>Última página</p>
                            <p className="text-[.8rem]" style={{ color: "#0E3D45" }}>{parsePageName(s.page_path)}</p>
                          </div>
                        </div>
                      </div>
                      {s.user_agent && (
                        <p className="text-[.68rem] mb-4 leading-relaxed break-all" style={{ color: "#7A9E8A" }}>
                          {s.user_agent}
                        </p>
                      )}
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
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
