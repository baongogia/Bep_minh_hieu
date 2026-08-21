import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://hgywhsujhvnlxwgbsvdl.supabase.co";

  const cleanPath = url.startsWith("/") ? url : `/${url}`;

  return `${supabaseUrl}/storage/v1/object/public${cleanPath}`;
}

export function slugifyFilename(fileName: string): string {
  const lastDotIndex = fileName.lastIndexOf(".");
  const nameWithoutExt =
    lastDotIndex !== -1 ? fileName.slice(0, lastDotIndex) : fileName;
  const ext =
    lastDotIndex !== -1 ? fileName.slice(lastDotIndex).toLowerCase() : "";

  const slugifiedName = nameWithoutExt
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return `${slugifiedName || "image"}${ext}`;
}
