"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const adminNavItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Sản phẩm" },
  { href: "/admin/categories", label: "Danh mục" },
  { href: "/admin/rfqs", label: "Y/c Báo giá" },
  { href: "/admin/projects", label: "Dự án" },
  { href: "/admin/settings", label: "Cài đặt" },
] as const;

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="ml-6 flex items-center gap-5 border-l border-zinc-200 pl-6 dark:border-zinc-800">
      {adminNavItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/admin" && pathname?.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-[11px] font-semibold uppercase tracking-wider transition-colors",
              isActive
                ? "text-zinc-950 font-bold dark:text-zinc-50"
                : "text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
