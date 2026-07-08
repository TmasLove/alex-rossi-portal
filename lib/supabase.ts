import { createClient } from "@supabase/supabase-js";

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
  geo_region: string;
  author: string;
  author_avatar?: string;
};

export const ACCENT_COLORS: Record<string, string> = {
  coral: "#D4573A",
  teal: "#1A7A8A",
  sage: "#7A9E8A",
};

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

const isConfigured = url.startsWith("http");

export const supabase = isConfigured
  ? createClient(url, anon)
  : createClient("https://placeholder.supabase.co", "placeholder");

export function autoSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function autoExcerpt(content: string, max = 160) {
  const plain = content.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  return plain.length > max ? plain.slice(0, max).replace(/\s\S*$/, "") + "…" : plain;
}

export const CATEGORIES = [
  "Lifestyle",
  "Viajes",
  "Diseño de Interiores",
  "Gastronomía",
  "Italia",
  "Casa & Real Estate",
  "Colecciones",
];
