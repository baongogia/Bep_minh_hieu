"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { heroNavItems } from "@/components/features/home/hero-editorial-data";
import { cn } from "@/lib/utils";

export function HeroEditorialHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-zinc-200 bg-white font-sans">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-sans text-xl font-bold uppercase tracking-wider text-zinc-950"
        >
          BẾP MINH HIẾU
          <span className="text-amber-500">.</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {heroNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs font-medium uppercase tracking-wider text-zinc-600 transition-colors hover:text-zinc-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/lien-he"
            className="hidden rounded-sm bg-zinc-950 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-zinc-800 sm:inline-flex"
          >
            Yêu cầu báo giá
          </Link>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
            className="inline-flex size-10 items-center justify-center rounded-sm border border-zinc-200 text-zinc-950 lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-zinc-200 bg-white lg:hidden",
          mobileOpen ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
          {heroNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="border-b border-zinc-100 py-3 text-sm font-medium uppercase tracking-wider text-zinc-700 last:border-b-0"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/lien-he"
            className="mt-4 inline-flex justify-center rounded-sm bg-zinc-950 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white"
            onClick={() => setMobileOpen(false)}
          >
            Yêu cầu báo giá
          </Link>
        </nav>
      </div>
    </header>
  );
}
