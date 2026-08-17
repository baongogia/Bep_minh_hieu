import Link from "next/link";

import type { Tables } from "@/types/database.types";
import { cn } from "@/lib/utils";

type Category = Tables<"categories">;

type CategoryTabsProps = {
  categories: Category[];
  currentSlug: string | null;
};

type TabItem = {
  slug: string | null;
  label: string;
};

function buildTabList(categories: Category[]): TabItem[] {
  const base: TabItem[] = [{ slug: null, label: "Tất cả" }];

  const fromDb = categories.map((c): TabItem => ({
    slug: c.slug,
    label: c.name,
  }));

  return [...base, ...fromDb];
}

export function CategoryTabs({ categories, currentSlug }: CategoryTabsProps) {
  const tabs = buildTabList(categories);

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-zinc-200 pb-px dark:border-zinc-800 sm:gap-2">
      {tabs.map((tab) => {
        const isActive = tab.slug === currentSlug;
        const href =
          tab.slug === null ? "/san-pham" : `/san-pham?category=${tab.slug}`;

        return (
          <Link
            key={tab.slug ?? "__all__"}
            href={href}
            className={cn(
              "-mb-px inline-flex items-center rounded-sm px-3.5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors",
              isActive
                ? "border-b-2 border-zinc-950 bg-zinc-50 text-zinc-950 dark:border-zinc-50 dark:bg-zinc-900 dark:text-zinc-50"
                : "border-b-2 border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-50",
            )}
            prefetch={false}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
