import { AdminNav } from "@/components/layout/AdminNav";
import Link from "next/link";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-zinc-950">
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/85 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/85">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="font-sans text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50"
            >
              BẾP MINH HIẾU
              <span className="text-amber-500">.</span>
              <span className="ml-1.5 rounded-sm bg-zinc-100 px-1.5 py-0.5 text-[9px] font-medium lowercase tracking-normal text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                admin
              </span>
            </Link>
            <AdminNav />
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs text-zinc-500 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Xem trang chủ &rarr;
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
