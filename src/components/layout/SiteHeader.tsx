"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/san-pham", label: "Thiết bị bếp" },
  { href: "/san-pham", label: "Hệ thống hút mùi" },
  { href: "/du-an", label: "Dự án thi công" },
  { href: "/ve-chung-toi", label: "Về chúng tôi" },
] as const;

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-zinc-200 bg-white font-sans dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-sans text-xl font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50"
        >
          BẾP MINH HIẾU
          <span className="text-amber-500">.</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className="text-xs font-medium uppercase tracking-wider text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/lien-he"
            className="hidden rounded-md bg-stone-900 px-4.5 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-50 shadow-2xs transition-colors hover:bg-stone-800 sm:inline-flex dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
          >
            Yêu cầu báo giá
          </Link>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
            className="inline-flex size-10 items-center justify-center rounded-md border border-stone-200 text-stone-950 lg:hidden dark:border-stone-800 dark:text-stone-50"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-stone-200 bg-white lg:hidden dark:border-stone-800 dark:bg-stone-950",
          mobileOpen ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
          {navItems.map((item) => (
            <Link
              key={`m-${item.href}-${item.label}`}
              href={item.href}
              className="border-b border-stone-100 py-3 text-sm font-medium uppercase tracking-wider text-stone-700 last:border-b-0 dark:border-stone-800 dark:text-stone-300"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/lien-he"
            className="mt-4 inline-flex justify-center rounded-md bg-stone-900 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-stone-50 shadow-2xs transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
            onClick={() => setMobileOpen(false)}
          >
            Yêu cầu báo giá
          </Link>
        </nav>
      </div>
    </header>
  );
}
